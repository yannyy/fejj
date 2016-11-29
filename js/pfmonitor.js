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
            var bandPercent = band;
            while(bandPercent > 10){
                bandPercent = bandPercent / 10;
            }
            bandPercent = Math.round(bandPercent);
            var className = 'm' + bandPercent;
            var unit = 'MBps';
            $(bandDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
            $(bandDiv).find('span.fontBlue').html(band + '<em>' + unit + '</em>');
        };

        var initIOPS = function () {
            var iopsDiv = $(widget).find('div.iopsCol');
            var iopsPercent = parseFloat(iops);
            while(iopsPercent > 10){
                iopsPercent = iopsPercent / 10;
            }
            iopsPercent = Math.round(iopsPercent);
            var className = 'm' + iopsPercent;
            var unit = "IOPS";
            $(iopsDiv).find('ul.monitorPic').find('li').css('display', 'none');
            $(iopsDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
            $(iopsDiv).find('span.fontBlue').html(iops + '<em>' + unit + '</em>');
        };

        var initTTW  = function () {
            var ttwDiv = $(widget).find('div.ddsjCol');
            $(ttwDiv).find('ul.monitorPic').find('li').css('display', 'none');
            var ttwPercent = parseFloat(ttw);
            while(ttwPercent > 10){
                ttwPercent = ttwPercent / 10;
            }
            ttwPercent = Math.round(ttwPercent);
            var unit = "ms";
            var className = 'm' + ttwPercent;
            $(ttwDiv).find('ul.monitorPic').find('li.' + className).css('display', 'block');
            $(ttwDiv).find('span.fontBlue').html(ttw + '<em>' + unit + '</em>');
        };

        init();
    }
});