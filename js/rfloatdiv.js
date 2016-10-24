(function($){
	var rFloatDiv = {
		defaultSlim:'',	
		maxStepDisplay:4,
		currentStep:0,
		displayList: [],
		init: function(){
			rFloatDiv.initRFloatDiv();
			rFloatDiv.initRFloatDivTab();
			rFloatDiv.initArrowEvent();
		},
		initRFloatDiv: function(){
			$('.collapseBtn').on('click', rFloatDiv.toggleCollapseBtn);	
		},
		initRFloatDivTab: function(){
			var tab = $('.rFloatDiv').find('div.tabDiv').children('div');

			$('#slimList').find('li').on('click', rFloatDiv.rFloatDivTabSwitch);
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
		},
		initArrowEvent: function(){
			var slimList = $('#slimList').find('li');
			var anchorList = [];
			$.each(slimList, function(i, item){
				anchorList.push($(item).attr('data-anchor'));
			});
			rFloatDiv.anchorList = anchorList;
			rFloatDiv.currentStep = 0;
			rFloatDiv.initStep();
			$('.rFloatDiv').find('i.scrollArrowLeft').on('click', rFloatDiv.onScrollLeft);
			$('.rFloatDiv').find('i.scrollArrowRight').on('click', rFloatDiv.onScrollRight);
		},
		initStep: function(){
			if (rFloatDiv.currentStep == 0) {
				$('i.scrollArrowLeft').parent().addClass('disabled');	
				$('i.scrollArrowRight').parent().removeClass('disabled');	
			}else if(rFloatDiv.currentStep == (rFloatDiv.anchorList.length - rFloatDiv.maxStepDisplay)){
				$('i.scrollArrowRight').parent().addClass('disabled');	
				$('i.scrollArrowLeft').parent().removeClass('disabled');	
			}else{
				$('i.scrollArrowLeft').parent().removeClass('disabled');	
				$('i.scrollArrowRight').parent().removeClass('disabled');	
			}
			var displayList = [];	
			for(var i = 0; i < rFloatDiv.maxStepDisplay; i ++){
				displayList.push(i + rFloatDiv.currentStep + 1);		
			}

			rFloatDiv.displayList = displayList;
			rFloatDiv.initLayoutOfSteps();	
		},
		initLayoutOfSteps: function(){
			var slimList = $('#slimList').find('li');	
			$.each(slimList, function(j, li){
				var anchor = $(li).attr('data-anchor');

				var exists = false;	
				$.each(rFloatDiv.displayList, function(i, id){
					if(parseInt(id) == parseInt(anchor))
						exists = true;
				});	

				if(exists)
					$(li).show();
				else
					$(li).hide();
			});
		},
		onScrollRight: function(){
			if(rFloatDiv.currentStep < (rFloatDiv.anchorList.length - rFloatDiv.maxStepDisplay)){
				rFloatDiv.currentStep ++;
				rFloatDiv.initStep();
			}

		},	
		onScrollLeft: function(){
			if(rFloatDiv.currentStep > 0){
				rFloatDiv.currentStep --;
				rFloatDiv.initStep();
			}

		},	
	};

	$(document).ready(function(){
		rFloatDiv.init();
	});
})(jQuery);