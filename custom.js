if ('undefined'!=typeof($)) {

$(document).ready(function() {
	var approot = $('link#approot').attr('href');
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
	$('body').on('pageLoadComplete', function() {
		$('#ScalarHeaderMenuSearchForm, .search').keyboard({blur_hide_icon:false});  // Header
	});
});

// Wrapper that invokes LanguageKeyboard from buttons within text inputs
$.fn.keyboard = function(options) {
	
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
			$input.parent().find('.keyboard-icon').click(function(evt) {
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

scalarMediaHideSourceFileTab = false;

scalarMediaDetailsSourceFileLink = false;

customAddMetadataTableForNodeToElement = function(node, element, linkify) {
	
	var propOrder = [
		'dcterms:title',
		'dcterms:description',
		'dcterms:creator',
		'dcterms:date',
		'dcterms:temporal',
		'dcterms:source',
		'dcterms:rights',
		'dcterms:provenance',
		'vra:culturalContext',
		'dcterms:language',
		'dcterms:type',
		'dcterms:format',
		'dcterms:coverage',
		'dcterms:spatial',
		'dcterms:identifier'
	];
	var obj = $.extend({}, node.current.auxProperties, {
		'dcterms:title':[node.getDisplayTitle()],
		'dcterms:description':[node.current.description],
		'dcterms:source':[node.current.source],
		'art:sourceLocation':[node.current.sourceLocation],
	});
	if ('undefined'==typeof(linkify)) {
		var linkify = function(str) {
			return str;
		};
	};
	
	var $table = $('<table></table>').appendTo(element);
	
	for (var j = 0; j < propOrder.length; j++) {
		if ('undefined'==typeof(obj[propOrder[j]])) continue;
		var values = obj[propOrder[j]];
		for (var k = 0; k < values.length; k++) {
			var value = (null==values[k]) ? '' : values[k];
			if (!value.length) continue;
			$table.append( '<tr><td>' + propOrder[j] + '</td><td>' + linkify(value) + '</td></tr>');
		};
	};
	$table.append('<tr><td>Scalar URL</td><td><a href="'+node.url+'">'+node.url+'</a> (version '+node.current.number+')</td></tr>');
	
	var can_show_source_url = false;
	if (can_show_source_url) {
		$table.append('<tr><td>Source URL</td><td><a href="'+node.current.sourceFile+'" target="_blank">'+node.current.sourceFile+'</a> ('+node.current.mediaSource.contentType+'/'+node.current.mediaSource.name+')</td></tr>');
	};
	
	if ('undefined'!=typeof(obj['art:sourceLocation']) && null!=obj['art:sourceLocation']) {
		var values = obj['art:sourceLocation'];
		for (var k = 0; k < values.length; k++) {
			var value = (null==values[k]) ? '' : values[k];
			if (!value.length) continue;
			var can_show_sourcelocation = true;
			if (-1!=value.indexOf('206.12.100.68')) can_show_sourcelocation = false;
			if (can_show_sourcelocation) $table.append( '<tr><td>art:sourceLocation</td><td>' + linkify(value) + '</td></tr>');
		};
	};

};

};  //if undefined