(function($){
	$.fn.tabInPopup = function(){
		var obj = this;
		var tab = {
			obj:null,
			init: function(obj){
				tab.obj = obj;
				tab.initTabHeader();
				tab.initTabContent();
				tab.initEventListener();
			},
			initEventListener: function(){
				$(tab.obj).find('div.tabHeader').find('a').on('click', tab.toggle);
			},
			initTabHeader: function(){
				var tabHeader = $(tab.obj).find('div.tabHeader');
				$.each($(tabHeader).find('li'), function(i, li){
					if(i == 0){
						if(!$(li).hasClass('select'))
							$(li).addClass('select');
					}
					else{
						if($(li).hasClass('select'))
							$(li).removeClass('select');
					}
				});
			},
			initTabContent: function(){
				var tabContent = $(tab.obj).find('div.tabContent');
				$.each($(tabContent).children(), function(i, tab){
					if(i == 0)
						$(tab).show();
					else
						$(tab).hide();
				});
			},
			toggle: function(e){
				if (e.target.tagName != 'a' && e.target.tagName != 'A')	
					return false;
				$(tab.obj).find('div.tabHeader').find('li').removeClass('select');
				$(e.target).parent().addClass('select');

				var tabContent = $(tab.obj).find('div.tabContent');
				$.each($(tabContent).children(), function(i, tab){
					$(tab).hide();
				});

				var target = $(e.target).attr('data-target');
				$(target).show();
			}
		};

		tab.init(obj);
	}
})(jQuery);