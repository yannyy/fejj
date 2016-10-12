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

		    var tabs = $('.rFloatDiv').find('div.tabDiv').find('a');
		    
			$.each(tabs, function(i, item){
				if($(item).parent().hasClass('select'))
					$(item).parent().removeClass('select');

				var idTmp = $(item).attr('data-target');
				$(idTmp).hide();
			});		

			$(ele.target).parent().addClass('select');

			$(tabId).css("left","200px").animate({"left":"0px"},500).show();	

			rFloatDiv.defaultSlim = tabId;
		},
		toggleCollapseBtn: function(){
			$(this).parent().toggleClass('active');	
			$btns = $('a.collapseBtn');
			$.each($btns, function(i, btn){
				if($(btn).css('display') == 'block')
					$(btn).css('display', 'none');
				else
					$(btn).css('display', 'block');
			});
		}
	};

	$(document).ready(function(){
		rFloatDiv.init();
	});
})(jQuery);