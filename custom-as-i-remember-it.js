$(document).ready(function () {
  $("body").on("pageLoadComplete", function () {
    $("#mainMenuInside .home_link > a")
      .eq(0)
      .html(
        '<span class="menuIcon" id="homeIcon"></span>Home: An Invitation to Listen'
      );
  });

  $("body").on("click", ".home__hero__scroll", function (event) {
    event.preventDefault();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(".home__quote").offset().top,
      },
      1000
    );
  });
  $("body").attr("id", "body");
  $("article").attr("id", "article");

  function PopupLogic() {
    popupConfirm = sessionStorage.getItem("popupConfirm");

    if (popupConfirm) {
    } else {
      $.magnificPopup.open({
        items: {
          src:
            "http://publications.ravenspacepublishing.org/system/application/hooks/wayhut/popup.html",
          type: "ajax",
        },
        modal: true,
      });
    }
  }

  window.onload = function () {
    setTimeout(function () {
      PopupLogic();
    }, 1000);
  };

  $("body").on("click", ".popup__btn--agree", function (event) {
    event.preventDefault();
    sessionStorage.setItem("popupConfirm", 1);
    $.magnificPopup.close();
  });

  $("body").on("click", ".popup__btn--disagree", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("popupConfirm");
    window.location.href =
      "http://ravenspacepublishing.org/publications/as-i-remember-it/";
  });

  var shareThis = window.ShareThis;
  const twitterSharer = window.ShareThisViaTwitter;
  const facebookSharer = window.ShareThisViaFacebook;
  const emailSharer = window.ShareThisViaEmail;

  const selectionShare = shareThis({
    selector: ".primary_role_composite",
    sharers: [twitterSharer, facebookSharer, emailSharer],
  });

  selectionShare.init();
});

window.customColophon = function () {
  var footer = $("#footer#footer");
  footer.removeClass("caption_font");

  var footerContent =
    ```
      <div class="footer__upper">

        <div class="footer__content footer__content--upper-1">
          <ul class="footer__blocks">

            <li class="footer__block footer__block--territory">
              <a class="footer__block-link footer__block-link--territory" href="http://publications.ravenspacepublishing.org/as-i-remember-it/territory">
                <span>Territory</span>
                <img class="" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/footer-territory.png">
              </a>
            </li>

            <li class="footer__block footer__block--colonialism">
              <a class="footer__block-link footer__block-link--colonialism" href="http://publications.ravenspacepublishing.org/as-i-remember-it/colonialism">
                <img class="" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/footer-colonialism.png">
                <span>Colonialism</span>
              </a>
            </li>

            <li class="footer__block footer__block--community">
              <a class="footer__block-link footer__block-link--community" href="http://publications.ravenspacepublishing.org/as-i-remember-it/community">
                <span>Community</span>
                <img class="" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/footer-community.png">
              </a>
            </li>

            <li class="footer__block footer__block--wellness">
              <a class="footer__block-link footer__block-link--wellness" href="http://publications.ravenspacepublishing.org/as-i-remember-it/wellness">
                <img class="" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/footer-wellness.png">
                <span>Wellness</span>
              </a>
            </li>
          
          </ul>
        </div>

        <div class="footer__content footer__content--upper-2">
          <ul class="footer__list">
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/language">The Sliammon Language</a></li>
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/our-process">Our Process</a></li>
          </ul>  
          <ul class="footer__list">
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/resources">Features and Resources</a></li>
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/about">About This Book</a></li>
          </ul>  
          <ul class="footer__list">
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/respecting-traditional-knowledge">Respecting Traditional Knowledge</a></li>
            <li class="footer__list-item"><a href="http://publications.ravenspacepublishing.org/as-i-remember-it/terms-of-use">Terms of Use</a></li>
          </ul>
        </div>

      </div>

      <div class="footer__lower">

        <div class="footer__content footer__content--lower">
          <a class="footer__logo" href="https://ravenspacepublishing.org/">
            <img class="teaching__img" src="http://publications.ravenspacepublishing.org/as-i-remember-it/media/ravenspace-logo.png">
          </a>
          <ul class="footer__info-list">
            <li class="footer__info-list-item footer__info-list-item--1">© UBC Press 2019</li>
            <li class="footer__info-list-item">ISBN 978-0-7748-6125-0</li>
          </ul>
        </div>

      </div>
    ```

  footer.append(footerContent);
};
