$(document).ready(function () {

    // $("head").prepend('<link rel="stylesheet" type="text/css" href="https://f61d979d.ngrok.io/custom.css">');
    convertFilterToMenu();
    addBannerForNotLoggedIn();
    addFooter();
    addRedBanner();
    updateLogo();
    updateGridView();
    customizePeopleGrid();
    customizeListView();
    setVisibilityVisible();

    function convertFilterToMenu() {

        $("#home-toolbar-show-filters").click(function () {
            $(".mobile-filters").toggleClass("hidden")
        });

        var filters = $("#desktop-filters #filters").children(),
            filtersRowToRemove = [0, 1, 2, 7];

        $("#homepage-filters .col-3").removeClass("visible-tablet").addClass("visible-desktop");
        $("#filters").prependTo($("#home-toolbar-filters .hidden-tablet").last());
        $("#home-toolbar-filters .hidden-tablet").last().removeClass("hidden-tablet").addClass("hidden-desktop mobile-filters hidden");

        for (var i = filtersRowToRemove.length - 1; i >= 0; i--)
            filters.splice(filtersRowToRemove[i], 1);
        selectedView = $(".home-toolbar-button-group-button.selected").attr("title");
        viewParams = '';
        switch (selectedView) {
            case "Grid":
                viewParams = "?view=grid&";
                break;
            case "List":
                viewParams = "?view=list&";
                break;
            case "Map":
                viewParams = "?view=list&";
                break;
        }


        mainMenu = "<div id='cssmenu' class='visible-desktop'><ul>";

        mainMenu += "<li class='has-sub'><a href='#'>ALL LISTING TYPES</a>";
        mainMenu += '<ul>';
        mainMenu += "<li><a href='https://listings.thebluemarket.com/" + viewParams + "transaction_type=service'>SERVICES</a></li>";
        mainMenu += "<li><a href='https://listings.thebluemarket.com/" + viewParams + "transaction_type=selling'>SELLING</a></li>";
        mainMenu += '</ul>';
        mainMenu += '</li>';

        filters.each(function (index) {
            name = $(this).find(".custom-filter-title").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
            mainMenu += "<li class='has-sub'><a href='#'>" + name + "</a>";
            filterOptions = $(this).find(".custom-filter-checkbox-label");
            mainMenu += '<ul>';
            filterOptions.each(function () {
                label = $(this).find('span').text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                value = $(this).find('input').val();
                mainMenu += "<li><a href='https://listings.thebluemarket.com/" + viewParams + "filter_option_" + value + "=" + value + "'" + ">" + label + "</a></li>"
            });
            mainMenu += "</ul></li>"
        });

        mainMenu += "</ul></div>";
        $(".home-toolbar").append(mainMenu);
    }

    function addBannerForNotLoggedIn() {

        if ($("#homepage-filters").length > 0) {
            console.log("homepage detected");
            if ($(".marketplace-lander-content-title").length > 0) {
            }
            else {
                console.log("user is logged In");
                $(".marketplace-lander").append('<div class="coverimage"><figure class="marketplace-cover fluidratio"> <div class="lander-content marketplace-lander-content"> <h1 class="marketplace-lander-content-title">' + marketplace_slogan + '</h1> <p class="marketplace-lander-content-description">' + marketplace_description + '</p> </div> </figure> </div>');
            }
        } else {
            console.log("Not Homepage");
            $(".title-container").css("background", "#fff").css("border-bottom", "1px solid rgba(0,0,50,0.1)");
        }
    }

    function addFooter() {
        $('body').append('<footer><div>' +
            '<div class="row footer-links">' +
            '<div class="col-xs-12 col-sm-4 text-center">' +
            '<div class=row><h2>OPENING HOURS</h2>' +
            '<div class="col-sm-12 col-xs-6" style="margin-bottom: 10px;"><div class="bigger">Monday - Friday</div><div class="smaller">9:00am - 6:00pm</div></div>' +
            '<div class="col-sm-12 col-xs-6"><div class="bigger">Sunday & Holidays</div><div class="smaller">Closed</div></div>' +
            '</div></div>' +
            '<div class="col-xs-12 col-sm-4 text-center">' +
            '<div class=row><h2>CONTACT</h2>' +
            '<div class="col-sm-12 col-xs-6 row" style="margin-bottom: 5px;"><div class="bigger"><i class="fa fa-map-marker" aria-hidden="true" style="top: 5px;"></i>The Mall at Marathon</div><div class="smaller">Nassau, Bahamas</div></div>' +
            '<div class="col-sm-12 col-xs-6 row"><div class="bigger"><i class="fa fa-phone" aria-hidden="true"></i>1 242 698 4111</div></div>' +
            '<div class="col-sm-12 col-xs-6 row"><div class="bigger"><i class="fa fa-envelope" aria-hidden="true"></i>info@thebluemarket.com</div></div>' +
            '</div></div>' +

            '<div class="col-xs-12 col-sm-4 text-center-mobile">' +
            '<div class=row><h2>INFORMATION</h2>' +
            '<div class="col-sm-12 col-xs-6 no-left-padding" style="margin-bottom: 5px;"><div class="bigger"><a href="https://pricing.thebluemarket.com">Pricing</a></div></div>' +
            '<div class="col-sm-12 col-xs-6 no-left-padding" style="margin-bottom: 5px;"><div class="bigger"><a href="https://listings.thebluemarket.com/en/infos/privacy">Privacy notice</a></div></div>' +
            '<div class="col-sm-12 col-xs-6 no-left-padding" style="margin-bottom: 5px;"><div class="bigger"><a href="https://listings.thebluemarket.com/en/infos/terms">Conditions of use</a></div></div>' +
            '<div class="col-sm-12 col-xs-6 no-left-padding" style="margin-bottom: 5px;"><div class="bigger"><a href="https://listings.thebluemarket.com/user_feedbacks/new">Contact us</a></div></div>' +
            '</div></div>' +

            '<div class="col-xs-12 col-sm-12"><ul class="social-links-list text-center"><li class="facebook"><a href="https://www.facebook.com/TheBlueMarket242" class="fa fa-facebook"></a></li><li class="instagram"><a href="https://www.instagram.com/thebluemarket242" class="fa  fa-instagram"></a></li><li class="twitter"><a href="https://mobile.twitter.com/BlueMarket242" class="fa  fa-twitter"></a></li></ul></div></div></div></div><div class="row footer-link text-center footer-logo"><img src="https://raw.githubusercontent.com/bipashant/thebluemarket/master/darklogo.png"/><div class="row footer-link text-center" style="font-size: 14px;color: #959494;">&copy; THE BLUE MARKET LTD. All right reserved.</div></div></div></footer>');
    };

    function addRedBanner() {
        if (display_red_banner) {

            var bannnerContent = "";
            bannnerContent += "<div class='row red-banner'>";
            bannnerContent += "<div class='col-sm-12'>";
            bannnerContent += "<div class='width-40-desktop italic-underground'> <span><i>SEARCH FOR THE BEST BARGAINS</i></span></div>";

            bannnerContent += "<div class='width-60-desktop bold-strong'><span>Pick up in store. or Choose Delivery.</span><span> <img class='shipping-img-footer' src='https://raw.githubusercontent.com/bipashant/thebluemarket/master/shipping.png'/></span></div>";
            bannnerContent += "</div>";
            bannnerContent += "</div>";
            bannnerContent += '<div class="row text-center"><img style="max-width: 100%" src="https://raw.githubusercontent.com/bipashant/thebluemarket/master/card.png" alt="Cc badge powevered by paypal">';
            bannnerContent += "</div>";

            $("footer").before(bannnerContent);
        }
    };

    function updateLogo() {
        var logo = $(".Logo");
        logo.find("img").attr("src", "https://www.thebluemarket.com/Content/images/logos/tbm.png");
        logo.find("img").attr("srcset", "https://www.thebluemarket.com/Content/images/logos/tbm.png");

        $(".MenuPriority__priorityLinks__XgHdH").width(($(".MenuPriority__priorityLinks__XgHdH").width() + 10) + "px");
        $(".MenuMobile__menuLabelMobileIcon__14XBz svg").width("65");
        $(".MenuMobile__menuLabelMobileIcon__14XBz svg").height("21");
    }

    function updateGridView() {
        setInterval(customizeGrid, 500);
    }

    function customizeGrid() {
        $(".home-fluid-thumbnail-grid-item").each(function (index) {
            if (!$(this).hasClass("customized")) {
                var price = $(this).find(".fluid-thumbnail-grid-image-price-container span").html().replace(/(\r\n\t|\n|\r\t)/gm, "");

                var title = $(this).find(".fluid-thumbnail-grid-image-title").text();

                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");

                var authorLink = $(this).find(".home-fluid-thumbnail-grid-author-name");
                var authorImg = $(this).find(".home-fluid-thumbnail-grid-author-avatar");

                authorContainer.prepend('<div class="listing-title-container">' + title + '</div>');
                authorContainer.append('<div class="author-info-container"></div>');
                authorContainer.append('<div class="price-container"></div>');
                authorContainer.find(".author-info-container").prepend(authorImg);
                authorContainer.find(".author-info-container").prepend(authorLink);
                authorContainer.find(".price-container").prepend(price);

                $(this).addClass("customized");
            }

        });

    }

    function customizePeopleGrid() {

        if ($("#profile-listings-list").length) {
            setInterval(function () {
                $(".people-fluid-thumbnail-grid-item").each(function (index) {
                    if (!$(this).hasClass("customized")) {
                        $(this).append('<div class="home-fluid-thumbnail-grid-author"></div>');
                        var price = $(this).find(".fluid-thumbnail-grid-image-price-container span").html().replace(/(\r\n\t|\n|\r\t)/gm, "");

                        var title = $(this).find(".fluid-thumbnail-grid-image-title").text();

                        var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");

                        authorContainer.prepend('<div class="listing-title-container">' + title + '</div>');
                        authorContainer.append('<div class="author-info-container"></div>');
                        authorContainer.append('<div class="price-container"></div>');
                        authorContainer.find(".price-container").prepend(price);

                        $(this).addClass("customized");
                    }

                });
            }, 500);
        }

    }

    function customizeListView() {
        if ($(".home-list-item").length) {

            setInterval(function () {
                $(".home-list-item").each(function () {
                    if (!$(this).hasClass("customized")) {
                        var temp = $(this).find(".home-list-details-right").html();

                        $(this).find(".home-list-details-right").html($(this).find(".home-list-author").html());
                        $(this).find(".home-list-author").html(temp);

                        $(this).find('a').addClass("black-color");
                        listingTitleLink = $(this).find('.home-list-title a');

                        listingTitle = listingTitleLink.html('<div class= " text-overflow-hidden">' + listingTitleLink.html().replace(/(\r\n\t|\n|\r\t)/gm, "") + '</div>');


                        $(this).addClass("customized");
                    }

                });
            }, 500);
        }

    }

    function setVisibilityVisible() {
        $(".wrapper").css("visibility", "visible");
    }
});