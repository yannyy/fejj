(function($){
	$.fn.tableTooltip = function(options) {
        var widget = this;

        options = options || {};
        var data = options.data || [];
        var title = options.title || '信息';

        var init = function(){
            $(widget).on('mouseover', showTooltip);
            $(widget).on('mouseout',  hideTooltip);

            //if($(widget).is('ul')){
            //    $(widget).children('li').on('mounseover', hideTooltip);
            //}else if($(widget).is('li')){
            //    $(widget).siblings().on('mounseover', hideTooltip);
            //}
        };

        var hideTooltip = function(e){
            if($(e.currentTaget).hasClass('tooltip')) {
                console.log('tooltip');
                return;
            }else{
                $('body').find('div.tooltip').hide();
            }
            //if($(e.target).hasClass('tooltip')){
            //    e.preventDefault();
            //    return false;
            //}else{
            //    $('body').find('div.tooltip').hide();
            //}

            //var target = $(e.target).attr('data-tooltip');
            //$(target).remove();
        };
        var showTooltip = function(e){
            e.stopPropagation();
            var target = $(e.target).attr('data-tooltip');
            if($(target).length != 0){
                $(target).show();
            }else{
                if(!empty(target)){
                    buildTooltip(target);
                }
            }
        };

        var buildTooltip = function(target){
            target = target.replace(/#/, '');
            widget.wrapper = $('<div class="tooltip" id="'+target+'" style="width:200px;"></div>').get(0);
            $(widget.wrapper).on('mounseover', function(e){
                debugger;
                e.stopPropagation();
                return false;
            });
            $(widget.wrapper).css('position', 'absolute');

            var top  = $(widget).offset().top;
            var left = $(widget).offset().left;

            //$(widget.wrapper).css('top',  top + 'px');
            $(widget.wrapper).css('top',  '33px');
            $(widget.wrapper).css('left', left + 'px');

            initInfo();
            initArrow();

            var device = $(widget).parentsUntil('div.picCol').filter('.device');
            $(device).parent().find('div.switchIcon').after(widget.wrapper);

            resizeArrow();
        };

        var initInfo = function(){
            var table = $('<table class="table-input tooltipTable" cellpadding="0" cellspacing="0" width="100%">');
            widget.infoTable = table;

            //title
            var headerTr = $('<tr></tr>');
            var headerTd = $('<td colspan="2" class="title"></td>');
            $(headerTd).text(title);
            headerTr.append(headerTd);
            table.append(headerTr);

            //info
            $.each(data, function(i, item){
                var tr  = $('<tr></tr>');
                var td1 = $('<td width="48%"></td>');
                var td2 = $('<td></td>');

                $(td1).text(item.name);
                $(td2).text(item.value);

                tr.append(td1);
                tr.append(td2);

                table.append(tr);
            });
            $(widget.wrapper).append(table);
        };

        var initArrow = function(){
            var arrowDiv = $('<div style="position:relative" class="gbArrow"></div>');
            $(arrowDiv).append('<div class="arrowDown"></div>');
            $(widget.wrapper).append(arrowDiv);
            widget.arrowDiv = arrowDiv;
        };

        var resizeArrow = function(){
            $(widget.arrowDiv).css('top', '2px');
            var left = $(widget.wrapper).outerWidth()/2 - 10;
            $(widget.arrowDiv).css('left',  left + 'px');
        };

        init();
    };

})(jQuery);