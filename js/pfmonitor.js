$(function ($) {
    /*
     * band, 带宽
     * iops, IOPS
     * ttw,  等待时间
     */
    $.fn.pfMonitor = function (band, iops, ttw) {
        band = band || 0;
        iops = iops || 0;
        ttw  = ttw  || 0;

        var widget = this;

        var init = function () {
            initBand();
            initIOPS();
            initTTW();
        };

        var initBand = function () {
            var bandDiv = $(widget).find('div.dkCol');
            $(bandDiv).find('ul.monitorPic').find('li').css('display', 'none');
            var className = 'm' + band;
            $(bandDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
        };

        var initIOPS = function () {
            var iopsDiv = $(widget).find('div.iopsCol');
            $(iopsDiv).find('ul.monitorPic').find('li').css('display', 'none');
            var className = 'm' + iops;
            $(iopsDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
        };

        var initTTW  = function () {
            var ttwDiv = $(widget).find('div.ddsjCol');
            $(ttwDiv).find('ul.monitorPic').find('li').css('display', 'none');
            var className = 'm' + ttw;
            $(ttwDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
        };

        init();
    }
});