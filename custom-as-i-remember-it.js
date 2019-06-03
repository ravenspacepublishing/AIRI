$(document).ready(function() {

	$('body').on('pageLoadComplete', function() {
		$('#mainMenuInside .home_link > a').eq(0).html('<span class="menuIcon" id="homeIcon"></span>Home: An Invitation to Listen');
	});

	$(".home__hero__scroll").click(function(event) {
		event.preventDefault();
	    $([document.documentElement, document.body]).animate({
	        scrollTop: $(".home__quote").offset().top
	    }, 1000);
	});
	$('body').attr('id', 'body');
	$('article').attr('id', 'article');

	function PopupLogic() {
		popupConfirm = localStorage.getItem("popupConfirm");

		if (popupConfirm) {

		} else {

			$.magnificPopup.open({
				items: {
					src: '/system/application/hooks/wayhut/popup.html', 
					type: 'ajax'
				},
				modal: true,
			});

		}
	}

	window.onload = function () {
		setTimeout(function () {
			PopupLogic();
		}, 1000);
	}

	$('body').on('click', '.popup__btn--agree', function () {
		event.preventDefault();
		localStorage.setItem("popupConfirm", 1);
		$.magnificPopup.close();
	});

	$('body').on('click', '.popup__btn--disagree', function () {
		event.preventDefault();
		localStorage.removeItem("popupConfirm");
		window.location.href = "http://ravenspacepublishing.org/publications/pub1/";
	});

	var shareThis = window.ShareThis;
	const twitterSharer = window.ShareThisViaTwitter;
	const facebookSharer = window.ShareThisViaFacebook;
	const emailSharer = window.ShareThisViaEmail;

	const selectionShare = shareThis({
		selector: ".primary_role_composite",
		sharers: [ twitterSharer, facebookSharer, emailSharer ]
	});

	selectionShare.init();

});

window.customColophon = function() {

	var footer = $('#footer');
	footer.removeClass('caption_font')

	var footerContent = 
	'  <div class="footer__content">'+
		'        <a class="footer__logo" href="https://ravenspacepublishing.org"><img class="teaching__img" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/ravenspace-logo.png" /></a>'+
	'      <div class="footer__links"><ul class="footer__list"><li><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/respecting-traditional-knowledge">Respecting Traditional Knowledge</a></li><li><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/about">About This Book</a><li><a href="http://publications.ravenspacepublishing.org/as-i-remember-it#home-toc">Table of Contents</a><li><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/terms-of-use">Terms of Use</a></li>'+
	'      </ul>'+
	'      <ul class="footer__list"><li>© UBC Press 2019</li><li>ISBN 978-0-7748-6125-0</li>'+
	'      </ul></div>'+
	'  </div>';
	footer.append(footerContent);
	
};