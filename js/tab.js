(function($){
    $.fn.tab = function(){
    	var widget = this;
    	var init = function(){
            //初始化事件绑定
            $('div.tabDiv').find('a').bind('click', select);
            $.each($('div.tabDiv').find('a'), function(i, link){
                $(link).find('i').bind('click', function(e){
                    $(e.target).parent().trigger('click');
                    e.stopPropagation();
                    return false;
                });
                $(link).find('span').bind('click', function(e){
                    $(e.target).parent().trigger('click');
                    e.stopPropagation();
                });
            });
            $('div.tabContainer').each(function(i, tab){
                if(i == 0)
                    $(tab).show();
                else
                    $(tab).hide();
            });
		};
        var select = function(e){
            //find the selected li
            var $clickTaget = e.target;
            if ($clickTaget.tagName != 'a' && $clickTaget.tagName != 'A')
                return false;

            if($clickTaget.href != 'javascript:;' && $clickTaget.href != '' && $clickTaget.href != 'undifined' && $clickTaget.href != null){
                location.href = $clickTaget.href;
                return;
            }

            var tabObj = $($clickTaget).parent();

            $('div.tabDiv').find('li').removeClass('select');

            $(tabObj).addClass('select');

            var $toggle = $($clickTaget).attr('data-toggle');

            $('div.tabContainer').each(function(i, tab){
                $(tab).hide();
            });

            $($toggle).show();

            $('div.tabDiv').trigger({
                type:'tabChanged',
                toggle: $toggle
            });
        }

        init();
	};
})(jQuery);