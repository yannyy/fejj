(function($){
	$.fn.rFloat = function(){
		var widget = this;
		var rFloatDiv = {
			defaultSlim:'',	
			maxStepDisplay:4,
			currentStep:0
		};

		var init = function(){
			initRFloatDiv();
			initRFloatDivTab();
		};

		var initRFloatDiv = function(){
			$(widget).find('.collapseBtn').on('click', toggleCollapseBtn);	
		};

		var initRFloatDivTab = function(){
			$(widget).find('ul.slimList').find('li').on('click', rFloatDivTabSwitch);
		};

		var rFloatDivTabSwitch = function(ele){
			var link = ele.target;

			var tabId = $(link).attr('data-target');
			if(tabId === rFloatDiv.defaultSlim){
				return false; 
			}

            var tabs = $(widget).find('ul.slimList').find('a');
			$.each(tabs, function(i, item){
				if($(item).hasClass('select')){
					$(item).removeClass('select');
				}
				
				if($(item).parent().hasClass('select')){
					$(item).parent().removeClass('select');
				}

				var idTmp = $(item).attr('data-target');
				$(idTmp).hide();
			});		

			$(link).parent().addClass('select');

			$(tabId).css('left','200px').animate({'left':'0px'},500).show();	

			rFloatDiv.defaultSlim = tabId;
		};

		var toggleCollapseBtn = function(){
			var btnDiv = $(this).parent();
			var btns = $(widget).find('a.collapseBtn');
			$.each(btns, function(i, btn){
				if($(btn).css('display') ==='block'){
					$(btn).css('display', 'none');
					$(btnDiv).removeClass('active');
				}
				else{
					$(btn).css('display', 'block');
					$(btnDiv).addClass('active');
				}
			});
		};

		init();	
	};
})(jQuery);