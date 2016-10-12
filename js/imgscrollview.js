(function($){
	$.fn.imgscrollimg = function(options){
		var wizard = this;

		wizard.max     = options.max | 3;

		wizard.imgs    = [];
		wizard.imgNums = 0;
		wizard.current = 0;

	    var initSelectPoints = function(){
	    	var pointUl = $(wizard).find('div.dDiv').find('ul');
	    	$(pointUl).find('li').remove();

	    	for(var i = 0; i < wizard.imgNums; i ++){
	    		if(i == wizard.current)
	    			$(pointUl).append('<li class="current"><a href="javascript:;">●</a></li>');
	    		else
	    			$(pointUl).append('<li><a href="javascript:;">●</a></li>');
	    	}
	    }	

		var init = function(){
			wizard.imgs = $(wizard).find('div').find('li');
			wizard.imgNums = wizard.imgNums.length;
		}

		init();
	}

})(jQuery);