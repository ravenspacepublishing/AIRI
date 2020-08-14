if ('undefined'!=typeof($)) {

$(document).ready(function() {
	var approot = $('link#approot').attr('href');
	var temp = $('link#parent').attr('href').split('/');
	var slug = temp[temp.length - 2];
	if (slug == 'as-i-remember-it') {
		// Add stylesheet to bottom of stack so that it takes precedence
		$('head').append('<link type="text/css" rel="stylesheet" href="'+approot+'hooks/wayhut/custom.css" />');		
		// Custom CKEditor settings
		if (window.CKEDITOR) { 
			CKEDITOR.config.customConfig = approot+'hooks/wayhut/ckeditor_custom.js';
		};
		// Keyboard
		$('head').append('<link type="text/css" rel="stylesheet" href="'+approot+'hooks/wayhut/keyboard/css/keyboard.css" />');
		$.getScript(approot+'hooks/wayhut/keyboard/js/keyboard.js', function() {
			$('#edit_form .form-horizontal:first, #metadata-pane').keyboard();  // Edit page
		});
		// TK Labels
		tklabels_more_about_page = $('link#parent').attr('href')+'respecting-traditional-knowledge';  // Global
		var tk_label_swap_link = function() {
			$('.tk-help').each(function() {
				$(this).find('a:last').attr('href', tklabels_more_about_page).removeAttr('target');
			});
		};
		$('body').on('pageLoadComplete', function() {
			$('#ScalarHeaderMenuSearchForm, .search').keyboard({blur_hide_icon:false});
			// Rename some system texts
			setReplacementTexts();
			// Page TK Labels popover
			$('article [typeof="tk:TKLabel"]').find('img').on('shown.bs.popover', tk_label_swap_link);
		}).on('scalarMediaReady', function(ev, el) {
			// Media element TK Labels popover
			$('article').find('.tk-labels-media').find('img').off('shown.bs.popover', tk_label_swap_link).on('shown.bs.popover', tk_label_swap_link);
		});		
	}
});

$.fn.keyboard = function(options) {  // Wrapper that invokes LanguageKeyboard from buttons within text inputs
	
	var defaults = {
		version:'0.1',
		elements:'input[type="text"]',
		blur_hide_icon:true
	};
	var opts = $.extend({}, defaults, options);
	
	$(this).on('focus', opts.elements, function(evt) {
		
		var $input = $(evt.target);
		if (!$input.parent().hasClass('right-inner-addon')) {
			$input.wrap('<div class="right-inner-addon"></div>');
			$input.parent().append('<a class="keyboard-icon" href="javascript:void(null);"></a>');
			$input.parent().find('.keyboard-icon').on('click', function(evt) {
				evt.stopPropagation();
				var $input = $(evt.target).parent().find(opts.elements);
				var $keyboard = $('#language-keyboard');
				$input.focus();
				$keyboard.show().css({
					top: (parseInt($input.offset().top) + parseInt($input.outerHeight()) + 10) + 'px',
					left: (parseInt($input.offset().left) + (parseInt($input.outerWidth()) / 2) - (parseInt($keyboard.width())/2)) + 'px'
				});
			});
			setTimeout(function() {
				$input.focus();
			}, 10);
		};
		$input.off('blur').blur(function(evt) {
			if (opts.blur_hide_icon) {
				setTimeout(function() {
					if (!$(evt.target).parent().find(opts.elements).is(':focus')) {
						$(evt.target).parent().find('.keyboard-icon').removeClass('active');
					};
				}, 100);
			};
		});
		$input.parent().find('.keyboard-icon').addClass('active');

	});
	
};

setReplacementTexts = function() {
	
	if (!$('link#book_id').length) return;
	var book_id = parseInt($('link#book_id').attr('href'));
	$('#mainMenuInside .header > h2').eq(0).html('Contents');
	$('.has_tags').prev().text('Explore:');
	$('.tag_of').prev().text('Related pages:');
	$('.path_of').prev().text('Choose a page:');
	$('.nav_btn:contains("Visit a random tagged page")').hide();
	if ($('.continue_btn').length && $('.relationships').length > 1) {
		if (!$('.continue_btn').closest('.relationships').is('.relationships:first')) {
			$('.continue_btn').closest('.relationships').insertBefore('.relationships:first');
		};
	};
	if ($('.path_of').length && $('.relationships').length > 1) {
		if (!$('.path_of').closest('.relationships').is('.relationships:first')) {
			$('.path_of').closest('.relationships').insertBefore('.relationships:first');
		};
	};
	var $end_of_path_btn = $('.relationships .nav_btn:contains("End of path"):contains(";")');
	if ($end_of_path_btn.length) {
		$end_of_path_btn.html($end_of_path_btn.html().replace('End of path', 'End of'));
	}
	var $is_note_in = $('h1:contains("This page is a note in:")');
	if ($is_note_in.length) {
		var is_plural = ($is_note_in.next().children('li').length > 1) ? true : false;
		$is_note_in.text('This page is a note. View the source page'+((is_plural)?'s':'')+':');
	};
	$('#indexLink a').on('click', function() {
		$('.modal').each(function() {
			var $this = $(this);
			var $title = $this.find('.modal-title');
			if (!$title.length) return;
			if ('Index' == $title.text()) $title.text('Explore by content type');
		});
	}).contents().last()[0].textContent='Explore by content type';
	
}

scalarMediaHideSourceFileTab = true;

scalarMediaDetailsHideSourceFileLink = true;

scalarMediaDetailsAddDescription = false;

scalarMediaDetailsHideCitationsSectionIfNoCitations = true;

customAddMetadataTableForNodeToElement = function(node, element, linkify) {
	
	var propOrder = [
		['dcterms:title','Title'],
		['dcterms:description','Description'],
		['dcterms:creator','Creator'],
		['dcterms:date','Creation date'],
		['dcterms:temporal','Timeline date'],
		['dcterms:source','Source'],
		['tk:hasLabel','TK Labels'],
		['dcterms:rights','Rights'],
		['dcterms:provenance','Provenance'],
		['vra:culturalContext','Culture/community'],
		['dcterms:language','Language'],
		['dcterms:type','Type'],
		['dcterms:format','Material'],
		['dcterms:coverage','Location'],
		['dcterms:spatial','Coordinates'],
		['dcterms:identifier','RavenSpace identifier']
	];	
	
	var obj = $.extend({}, node.current.auxProperties, {
		'dcterms:title':[node.getDisplayTitle()],
		'dcterms:description':[node.current.description],
		'dcterms:source':[node.current.source],
		'art:sourceLocation':[node.current.sourceLocation]
	});
	
	if ('undefined' == typeof(linkify)) {
		var linkify = function(str) {
			return str;
		};
	};
	
	var $table = $('<table></table>').appendTo(element);
	for (var j = 0; j < propOrder.length; j++) {
		if ('tk:hasLabel' == propOrder[j][0]) $table.append('<tr class="tk-label-row" style="display:none;"><td>'+propOrder[j][1]+'</td><td></td></tr>');
		if ('undefined' == typeof(obj[propOrder[j][0]])) continue;
		var values = obj[propOrder[j][0]];
		for (var k = 0; k < values.length; k++) {
			var value = (null == values[k]) ? '' : values[k];
			if (!value.length) continue;
			$table.append( '<tr><td><span title="'+propOrder[j][0]+'">' + propOrder[j][1] + '</span></td><td>' + linkify(value) + '</td></tr>');
		};
	};
	if (null != obj['art:sourceLocation']) {
		var values = obj['art:sourceLocation'];
		for (var k = 0; k < values.length; k++) {
			var value = (null == values[k]) ? '' : values[k];
			if (!value.length) continue;
			if (-1 != value.indexOf('/jspui/') || -1 != value.indexOf('206.12.89.21')) continue;  // DSpace install
			if (-1 != value.indexOf('206.12.89.14') || -1 != value.indexOf('206.12.100.68') || -1 != value.indexOf('206.12.103.164')) continue;  // Omeka-S install
			var $sl_row = $( '<tr><td><span title="art:sourceLocation">Source location</span></td><td>' + linkify(value) + '</td></tr>').appendTo($table);
			if ($table.find('[title="dcterms:identifier"]').length) $sl_row.insertBefore($table.find('[title="dcterms:identifier"]').closest('tr'));
		};
	}
	$table.append('<tr><td>RavenSpace URL</td><td><a href="'+node.url+'">'+node.url+'</a> (version '+node.current.number+')</td></tr>');
	//$table.append('<tr><td>Source URL</td><td><a href="'+node.current.sourceFile+'" target="_blank">'+node.current.sourceFile+'</a> ('+node.current.mediaSource.contentType+'/'+node.current.mediaSource.name+')</td></tr>');
	
	if ('undefined' != typeof(node.current.properties['http://localcontexts.org/tk/hasLabel']) && node.current.properties['http://localcontexts.org/tk/hasLabel'].length) {
		var $labelRow = $table.find('.tk-label-row').show();
		var popoverTemplate = '<div class="popover tk-help caption_font" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>';
		var labels = node.current.properties['http://localcontexts.org/tk/hasLabel'];
		for (var j = 0; j < labels.length; j++) {
			var labelNode = scalarapi.model.nodesByURL[labels[j].value];
  		url = labelNode.properties['http://simile.mit.edu/2003/10/ontologies/artstor#url'][0].value;
  		labelDescription = labelNode.properties['http://purl.org/dc/terms/description'][0].value;
  		var placement = "bottom";
  		$label = $('<span resource="'+labels[j].value+'" typeof="tk:TKLabel" style="display:inline-block;"><img tabindex="0" rel="art:url" src="'+url+'" data-toggle="popover" data-placement="'+placement+'" /></span>').appendTo($labelRow.find('td:last'));
      $label.children('img').popover({ 
          trigger: "manual focus", 
          html: true, 
          template: popoverTemplate,
          content: '<img src="'+url+'" /><p class="supertitle">Traditional Knowledge</p><h3 class="heading_weight">'+labelNode.title+'</h3><p>'+labelDescription+'</p><p><a href="'+tklabels_more_about_page+'">More about Traditional Knowledge labels</a></p>'
      });
		}
		$labelRow.find('td:last').find('img').click(function(e) {
			$(this).popover('toggle');
			e.stopPropagation();
		})
	};

};

};  //if !undefined
