$(function ($) {
    $.fn.about = function(){
        var widget = this;

        var hideAbout = function () {
            $(widget).hide();
        };

        var init = function () {
            $(widget).find('div.contentHeader').find('button.close').on('click', hideAbout);
        };


        init();
    };
});