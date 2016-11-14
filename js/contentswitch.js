(function($){
    $.fn.contentSwitch = function(){
    	var switcher = this;

    	var init = function(){
    		var switchBtnDivs = $(switcher).find('div.lBtn, div.rBtn')
    		var targetList = [];
    		$.each(switchBtnDivs, function(i, div){
    			var btnLink = $(div).find('a');	
    			$(div).find('a').on('click', switchEvent)
    			var target = $(btnLink).attr('data-target')
    			targetList.push(target);
    			if(i == 0)
    				initContent(target);
    		});
    	};

    	var initContent = function(target){
    		var switchBtnDivs = $(switcher).find('div.swithBtnDiv').find('div.lBtn, div.rBtn');	
    		$.each(switchBtnDivs, function(i, div){
    			if($(div).find('a').attr('data-target') == target)
    				$(div).addClass('selected');
    			else
    				$(div).removeClass('selected');
    		});

    		$(switcher).find('div.switchContent').hide();
    		$('body').css('overflow', 'hidden');	
            $(target).css("position","relative").css('left','-800px').animate({"position":"relative", "left":"0px"},300).show();	
    	};

    	var switchEvent = function(e){
    		if(e.target.tagName != 'I' && e.target.tagName != 'SPAN') 
    			return false;

    		var link = $(e.target).parent();
    		var target = $(link).attr('data-target');
    		initContent(target);
    	}

    	init();
    }
})(jQuery);
