(function($){
	var tab = {
		init: function(target){
			//初始化事件绑定
			$('div.tabDiv').find('li').bind('click', tab.select);
			$.each($('div.tabDiv').find('li'), function(i, li){
				$(li).find('i').bind('click', function(e){
					$(li).find('a').trigger('click');
					e.stopPropagation();
					return false;
				});
				$(li).find('span').bind('click', function(e){
					$(li).find('a').trigger('click');
					e.stopPropagation();
				});
			});
			$('div.tabDiv').find('li').find('i').bind('click', function(){});
			$('div.tabDiv').find('li').find('span').bind('click', tab.select);
			$('div.tabContainer').each(function(i, tab){
				if(i == 0)
					$(tab).show();
				else
					$(tab).hide();
			});
		},
		select: function(e){
			//find the selected li
			var $clickTaget = e.target;
			if ($clickTaget.tagName != 'a' && $clickTaget.tagName != 'A')
				return false;

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
	}
	
	$(function(){
		tab.init();	
	});
})(jQuery);