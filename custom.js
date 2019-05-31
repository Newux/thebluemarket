!function(a,b,c,d){"use strict";var e="prettyCheckable",f="plugin_"+e,g={label:"",labelPosition:"right",customClass:"",color:"blue"},h=function(c){b.ko&&a(c).on("change",function(b){if(b.preventDefault(),b.originalEvent===d){var c=a(this).closest(".clearfix"),e=a(c).find("a:first"),f=e.hasClass("checked");f===!0?e.addClass("checked"):e.removeClass("checked")}}),c.find("a:first, label").on("touchstart click",function(c){c.preventDefault();var d=a(this).closest(".clearfix"),e=d.find("input"),f=d.find("a:first");f.hasClass("disabled")!==!0&&("radio"===e.prop("type")&&a('input[name="'+e.attr("name")+'"]').each(function(b,c){a(c).prop("checked",!1).parent().find("a:first").removeClass("checked")}),b.ko?ko.utils.triggerEvent(e[0],"click"):e.prop("checked")?e.prop("checked",!1).change():e.prop("checked",!0).change(),f.toggleClass("checked"))}),c.find("a:first").on("keyup",function(b){32===b.keyCode&&a(this).click()})},i=function(b){this.element=b,this.options=a.extend({},g)};i.prototype={init:function(b){a.extend(this.options,b);var c=a(this.element);c.parent().addClass("has-pretty-child"),c.css("display","none");var e=c.data("type")!==d?c.data("type"):c.attr("type"),f=null,g=c.attr("id");if(g!==d){var i=a("label[for="+g+"]");i.length>0&&(f=i.text(),i.remove())}""===this.options.label&&(this.options.label=f),f=c.data("label")!==d?c.data("label"):this.options.label;var j=c.data("labelposition")!==d?"label"+c.data("labelposition"):"label"+this.options.labelPosition,k=c.data("customclass")!==d?c.data("customclass"):this.options.customClass,l=c.data("color")!==d?c.data("color"):this.options.color,m=c.prop("disabled")===!0?"disabled":"",n=["pretty"+e,j,k,l].join(" ");c.wrap('<div class="clearfix '+n+'"></div>').parent().html();var o=[],p=c.prop("checked")?"checked":"";"labelright"===j?(o.push('<a href="#" class="'+p+" "+m+'"></a>'),o.push('<label for="'+c.attr("id")+'">'+f+"</label>")):(o.push('<label for="'+c.attr("id")+'">'+f+"</label>"),o.push('<a href="#" class="'+p+" "+m+'"></a>')),c.parent().append(o.join("\n")),h(c.parent())},check:function(){"radio"===a(this.element).prop("type")&&a('input[name="'+a(this.element).attr("name")+'"]').each(function(b,c){a(c).prop("checked",!1).attr("checked",!1).parent().find("a:first").removeClass("checked")}),a(this.element).prop("checked",!0).attr("checked",!0).parent().find("a:first").addClass("checked")},uncheck:function(){a(this.element).prop("checked",!1).attr("checked",!1).parent().find("a:first").removeClass("checked")},enable:function(){a(this.element).removeAttr("disabled").parent().find("a:first").removeClass("disabled")},disable:function(){a(this.element).attr("disabled","disabled").parent().find("a:first").addClass("disabled")},destroy:function(){var b=a(this.element),c=b.clone(),e=b.attr("id");if(e!==d){var f=a("label[for="+e+"]");f.length>0&&f.insertBefore(b.parent())}c.removeAttr("style").insertAfter(f),b.parent().remove()}},a.fn[e]=function(b){var c,d;if(this.data(f)instanceof i||this.data(f,new i(this)),d=this.data(f),d.element=this,"undefined"==typeof b||"object"==typeof b)"function"==typeof d.init&&d.init(b);else{if("string"==typeof b&&"function"==typeof d[b])return c=Array.prototype.slice.call(arguments,1),d[b].apply(d,c);a.error("Method "+b+" does not exist on jQuery."+e)}}}(jQuery,window,document);

$(document).ready(function () {

    // $("head").prepend('<link rel="stylesheet" type="text/css" href="https://f61d979d.ngrok.io/custom.css">');
    convertFilterToMenu();
    addBannerForNotLoggedIn();
    removeFooter();
    addRedBanner();
    //updateLogo();
    updateGridView();
    customizePeopleGrid();
    customizeListView();
    setVisibilityVisible();


    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };



    function convertFilterToMenu() {

        $("#home-toolbar-show-filters").click(function () {
            $(".mobile-filters").toggleClass("hidden")
        });

        var filters = $("#desktop-filters #filters").children();
//         var filtersRowToRemove = [0, 1, 2, 7]; 
        var filtersRowToRemove = [];

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
            mainMenu += "<li class='has-sub'><a class='main-menu' href= '#'>" + name + "</a>";
            filterOptions = $(this).find(".custom-filter-checkbox-label");
            mainMenu += '<ul>';
            filterOptions.each(function () {
                label = $(this).find('span').text().replace(/(\r\n\t|\n|\r\t)/gm, "");
                value = $(this).find('input').val();
                name_or_id = "filter_option_"+ value;
                selected = getUrlParameter(name_or_id) == value;
                mainMenu += '<li><a><div class="custom-filter-checkbox-container"><label class="custom-filter-checkbox-label "><input type="checkbox" class="pretty-checkbox" name="' + name_or_id + '" id="'+ name_or_id + '" value="' + value + '"' +  (selected  ?  'checked' : '')  + '><span class="custom-filter-checkbox-label-text">' + label+ '</span></label></div></a></li>'
            });
            mainMenu += '<li class="MultiControls"><button tabindex="0" class="btnOk" type="submit">Filter</button><button tabindex="0" class="btnCancel" type="cancel">Clear</button></li>';
            mainMenu += "</ul></li>"
        });

        mainMenu += "</ul></div>";
        $(".home-toolbar").append(mainMenu);

        if($(".has-sub").last().children("ul").children().length == 1){
            $(".has-sub").last().hide();
        }

        $("#homepage-filters").attr("action", "https://listings.thebluemarket.com");

        $(".btnCancel").click(function (e) {
            e.preventDefault();
            $(this).parents("ul").first().find('input[type="checkbox"]').each(function() {
                $('input[value="'+$(this).val() + '"]').prop('checked', false);
             });
        });

        $(".main-menu").click(function (e) {
            e.preventDefault();
        });


        $(".custom-filter-checkbox-label input").change(function(){
            if(!$(this).is(":checked")){
                $('input[value="'+$(this).val() + '"]').prop('checked', false);
            }
           
        });
        // $('.pretty-checkbox').each(function(key, elem) { $(elem).prettyCheckable(); });
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

    function removeFooter() {
        $('body').append('<footer><div>' +
            '<div class="row footer-links">' +
            '<div class="col-xs-12 col-sm-4 text-center">' +
            '<div class=row><h2>OPENING HOURS</h2>' +
            '<div class="col-sm-12 col-xs-6" style="margin-bottom: 10px;"><div class="bigger">Monday - Saturday</div><div class="smaller">9:30am - 6:00pm</div></div>' +
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

            '<div class="col-xs-12 col-sm-12"><ul class="social-links-list text-center"><li class="facebook"><a href="https://www.facebook.com/TheBlueMarket242" class="fa fa-facebook"></a></li><li class="instagram"><a href="https://www.instagram.com/thebluemarket242" class="fa  fa-instagram"></a></li><li class="twitter"><a href="https://mobile.twitter.com/BlueMarket242" class="fa  fa-twitter"></a></li></ul></div></div></div></div><div class="row footer-link text-center footer-logo"><img src="https://raw.githubusercontent.com/bipashant/thebluemarket/master/darklogo.png"/><div class="row footer-link text-center" style="font-size: 14px;color: #959494;">&copy; THE BLUE MARKET LTD. All rights reserved.</div></div></div></footer>');
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
