(function($){
	var rFloatDiv = {
		defaultSlim:'',	
		init: function(){
			rFloatDiv.initRFloatDiv();
			rFloatDiv.initRFloatDivTab();
		},
		initRFloatDiv: function(){
			$('.collapseBtn').on('click', rFloatDiv.toggleCollapseBtn);	
		},
		initRFloatDivTab: function(){
			var tab = $('.rFloatDiv').find('div.tabDiv').children('div');

			$.each(tab.children(), function(i, item){
				$(item).on('click', rFloatDiv.rFloatDivTabSwitch); 
			});	
		},
		rFloatDivTabSwitch: function(ele){
			var link = ele.target;

			var tabId = $(link).attr('data-target');
			if(tabId == rFloatDiv.defaultSlim)
				return false; 

		    var tab = $('.rFloatDiv').find('div.tabDiv').children('div');
		    
			$.each(tab.children(), function(i, item){
				if($(item).hasClass('select'))
					$(item).removeClass('select');

				var idTmp = $(item).attr('data-target');
				$(idTmp).hide();
			});		

			$(ele.target).addClass('select');

			$(tabId).css("left","200px").animate({"left":"0px"},500).show();	
			//if(link.dataset.target < screen.defaultSlim)
			//	$(link.dataset.target).css("left","200px").animate({"left":"0px"},500).show();	
			//else
			//	$(link.dataset.target).css("left","-200px").animate({"left":"0px"},500).show();

			rFloatDiv.defaultSlim = tabId;
		},
		toggleCollapseBtn: function(){
			$(this).parent().toggleClass('active');	
		}
	};

	$(document).ready(function(){
		rFloatDiv.init();
	});
})(jQuery);