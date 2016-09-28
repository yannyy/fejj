(function($){
	var sideDiv = {
		defaultTab:'#sidebarMenu',	
		init: function(){
			sideDiv.initTab();
			sideDiv.showDefaultTab();
			sideDiv.initMenu();
		},
		showDefaultTab:function(){
			$(sideDiv.defaultTab).show();
		},
		initTab: function(){
			var tab = $('#sideDiv').children('div.tabRaw');

			$.each(tab.children(), function(i, item){
				$(item).on('click', sideDiv.tabSwitch); 
				$(item).children('i').on('click', sideDiv.tabSwitchByImg);	
				$(item).children('sup').on('click', sideDiv.tabSwitchBySup);	
			});	
		},
		tabSwitch: function(ele){
			var link = ele.target;
			if(link.tagName != 'A')	
				return false;

			var tabId = $(link).attr('data-target'); 
			if(tabId == sideDiv.defaultTab)
				return false; 

		    var tab = $('#sideDiv').children('div.tabRaw');

			$.each(tab.children(), function(i, item){
				if($(item).hasClass('current')){
					$(item).removeClass('current');
					$(item).addClass('bgGradul');

					var idTmp = $(item).attr('data-target');
					$(idTmp).hide();
				}
			});		

			$(ele.target).removeClass('bgGradul');
			$(ele.target).addClass('current');

			$(tabId).css("left","200px").animate({"left":"0px"},500).show();	

			sideDiv.defaultTab = tabId;
		},
		tabSwitchBySup: function(ele){
		},
		tabSwitchByImg: function(ele){
			var target = ele.target;
			if(target.tagName != 'I')	
				return false;

			var link = $(target).parent()[0];

			var tabId = $(link).attr('data-target');
			if(tabId == sideDiv.defaultTab)
				return false; 

		    var tab = $('#sideDiv').children('div.tabRaw');

			$.each(tab.children(), function(i, item){
				if($(item).hasClass('current')){
					$(item).removeClass('current');
					$(item).addClass('bgGradul');

					var idTmp = $(item).attr('data-target');
					$(idTmp).hide();
				}
			});		

			$(link).removeClass('bgGradul');
			$(link).addClass('current');

			$(tabId).css("left","200px").animate({"left":"0px"},500).show();

			sideDiv.defaultTab = tabId;

		},
		initMenu:function(){
		    var leaves = $('div.menu').children('ul').children('li');	

		    $.each(leaves, function(i, li){
		    	$(li).on('click', sideDiv.onFirstLevelSwitch);
		    	$(li).find('a').on('click', function(e){
		    		e.stopPropagation();
		    	});
		    	$(li).find('i').on('click', sideDiv.onFirstLevelSwitchByChild);
		    	$(li).find('span').on('click', sideDiv.onFirstLevelSwitchByChild);
		    });

		    sideDiv.initSecondLevel();
		},
		onFirstLevelSwitchByChild:function(e){
			var node = $(e.target).parent()[0];
			sideDiv.firstLevelSwitch(node);
		},
		onFirstLevelSwitch:function(e){
			if(e.target.tagName != 'A')
				return false;

			sideDiv.firstLevelSwitch(e.target);
		},
		firstLevelSwitch:function(node){
			var expanded = $(node).parent().hasClass('expand');
			var secondLevels = $(node).parent().find('li');

			var isFirstLevel = false;
			if(secondLevels != null && secondLevels.length > 0)
				isFirstLevel = true;

			if(($(node).parent().hasClass('select') 
				|| $(node).parent().hasClass('open'))
				&& !isFirstLevel)
				return false;

		    var leaves = $('div.menu').children('ul').children('li');	

			$.each(leaves, function(i, li){
		    	$(li).removeClass('open');
		    	$(li).removeClass('expand');
		    	$(li).removeClass('select');

		    	var seconds = $(li).find('li');
		    	if(seconds != null && seconds.length > 0) {
		    		sideDiv.toggleSecondLevel(this, true);
		    	}else{
		    		//$(li).addClass('select');
		    	}	

		    	$(li).find('li.select').removeClass('select');
		    });

		    $(node).parent().addClass('open');
		    
		    if(isFirstLevel){
		    	if(expanded)
		    		$(node).parent().removeClass('expand');
		    	else
		    		$(node).parent().addClass('expand');

		    	sideDiv.toggleSecondLevel($(node).parent(), expanded);
		    }
		    else{
		    	$(node).parent().addClass('select');
		    }
		},
		initSecondLevel: function(){
		    var leaves = $('div.menu').children('ul').children('li').children('ul').children('li');	

		    $.each(leaves, function(i, li){
		    	$(li).on('click', sideDiv.secondLevelSwitch);
		    });
		},
		secondLevelSwitch: function(e){
		    var leaves = $('div.menu').children('ul').children('li').children('ul').children('li');	

			$.each(leaves, function(i, li){
		    	$(li).removeClass('select');
		    });
		    $(e.target).parent().addClass('select');
		},
		toggleSecondLevel: function(e, expanded){
			var nav = $(e).children('ul.sidebarNav');
			
			if(expanded){
				$(e).css('height', 'auto');
				nav.hide();
			}else{
				var lis = $(e).children('ul.sidebarNav').children('li');
				var h = (lis.length + 1) * 32 + 4;
				$(e).css('height', h);
				nav.slideDown();
			}
		}
	};
	$.fn.menuSelected = function(selector){

	}
	
	$(document).ready(function(){
		sideDiv.init();
	});
})(jQuery);
