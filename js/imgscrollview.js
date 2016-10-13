(function($){
	$.fn.imgscrollimg = function(options = {}){
		var wizard = this;

		wizard.max     = options.max | 3;

		wizard.imgs    = [];
		wizard.imgNums = 0;
		wizard.current = 0;

	    var initSelectPoints = function(){
	    	var pointUl = $(wizard).find('div.dDiv').find('ul');
	    	$(pointUl).find('li').unbind();
	    	$(pointUl).find('li').remove();

	    	for(var i = 0; i < wizard.imgNums; i ++){
	    		var point = null;
	    		if(i == wizard.current)
	    			point = $('<li data-target="' + i + '" class="current"><a href="javascript:;">●</a></li>');
	    		else
	    			point = $('<li data-target="' + i + '"><a href="javascript:;">●</a></li>');

	    		$(pointUl).append(point);
	    	}

	    	$(pointUl).find('a').on('click', selectPoint);
	    };	
	    var selectPoint = function(e){
	    	var index = $(e.target).parent().attr('data-target');
	    	index = parseInt(index);

	    	wizard.current = index;

	    	var selectedArr = [];
			if (index == 1){
				selectedArr = [index, index + 1, index + 2];
			}else if(index == wizard.imgNums){
				selectedArr = [index - 2, index - 1, index];
			}else{
				selectedArr = [index - 1, index, index + 1];
			}	    			

			showImg(selectedArr);
	    };

	    var showImg = function(points = []){
	    	$.each(wizard.imgs, function(index, imgLi){
	    		var identifier = $(imgLi).attr('id');
	    		if($.inArray(index, points))
	    			$('#' + ).show();
	    		else
	    			$(imgLi).hide();

	    		if(index == wizard.current){
	    			if(!$(imgLi).hasClass('current'))
	    				$(imgLi).addClass('current')
	    		}else{
	    			if($(imgLi).hasClass('current'))
	    				$(imgLi).removeClass('current')
	    		}
	    	});

	    };
	    var initImg = function(){
			showImg([0,1,2]);
	    };

		var init = function(){
			wizard.imgs = $(wizard).find('div.minPic').find('li');
			wizard.imgNums = wizard.imgs.length;

			initSelectPoints();
			initImg();
		};

		init();
	}

})(jQuery);