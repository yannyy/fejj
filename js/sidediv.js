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
			sideDiv.initMenuStyle();
			//$('div.menu').find('li').children('a').children('i').bind('click', sideDiv.onLinkChildClicked);	
			//$('div.menu').find('li').children('a').children('span').bind('click', sideDiv.onLinkChildClicked);	
		    $('div.menu').find('li').children('a').bind('click', sideDiv.onLinkClicked);
		},
		initMenuStyle: function(){
			var li = $('div.menu').find('li.select');
			$('div.menu').find('li').removeClass('open');
			$('div.menu').find('li').removeClass('expand');
			$('div.menu').find('li').removeClass('select');
			$('div.menu').find('li').css('height', 'auto');

			if(sideDiv.hasParentLevel(li)){
				var parent = li.parent().parent();
				parent.addClass('open');
				parent.addClass('expand');
				li.addClass('select');

				parent.children('ul.sidebarNav').css('display', 'block');
				var subLis = parent.children('ul.sidebarNav').children('li');
				var h = (subLis.length + 1) * 32 + 4;
				parent.css('height', h);	
			}else{
				li.css('height', 'auto');
				li.addClass('open');
				li.addClass('select');

			}
		},
		onLinkChildClicked: function(e){
			var target = e.target;
			if(/i|I/.test(target.tagName) || /span|SPAN/.test(target.tagName))
			{
				//sideDiv.onLinkClicked($(target).parent());
			}
			e.preventDefault();
		},
		onLinkClicked: function(e){
			var target = e.target;

			var li = null;
			if(/i|I/.test(target.tagName) || /span|SPAN/.test(target.tagName)){
				li = $(target).parent().parent();	
			}else{
				li = $(target).parent();	
			}

			if(sideDiv.hasSecondLevel(li)){
				sideDiv.firstLevelSwitch(li);		
				e.preventDefault();	
			}else{
				window.location.href = link.href;
			}
		},
		selectLink: function(link){
			var li = $(link).parent();	
			if(sideDiv.hasSecondLevel(li)){
				sideDiv.firstLevelSwitch(li);		
				e.preventDefault();	
			}else{
				window.location.href = link.href;
			}
		},
		hasParentLevel: function(li){
			return li.parent().parent().is('li') ? true : false;
		},	
		hasSecondLevel: function(li){
			return li.children('ul').is('ul') ? true : false;
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
		firstLevelSelected: function(node){
			var expanded = node.parent().hasClass('expand');	
			if(expanded){
	     		node.removeClass('expand');
	     		node.css('height', 'auto');	
	     		node.children('ul.sidebarNav').css('display', 'none');
	     		node.find('li').removeClass('select');
	     	}
	     	else{
	     		//node.find('li').removeClass('select');
	     		node.addClass('expand');
	     		node.addClass('open');
	     		node.children('ul.sidebarNav').css('display', 'block');
	     		var lis = node.children('ul.sidebarNav').children('li');
				var h = (lis.length + 1) * 32 + 4;
	     		node.css('height', h);	
	     	}
		},
		firstLevelDiselected: function(node){
			node.removeClass('open');
			node.children('ul.sidebarNav').css('display', 'none');
			node.removeClass('expand');
			node.css('height', 'auto');	
		},

		firstLevelSwitch:function(node){
			if(node.hasClass('open')){
				sideDiv.firstLevelDiselected(node);
			}else{
				sideDiv.firstLevelSelected(node);
			}
			return false;
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

	$(document).ready(function(){
		sideDiv.init();
	});
})(jQuery);
