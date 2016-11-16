(function($){
	$.fn.imgScroll = function(options){
		var widget = this;

		options            = options || {};
		widget.max         = options.max | 3;

		widget.imgs        = [];
		widget.imgNums     = 0;
		widget.current     = 0;
        widget.displaySize = 3;

	    var initSelectPoints = function(){
	    	var pointUl = $(widget).find('div.dDiv').find('ul');
	    	$(pointUl).find('li').unbind();
	    	$(pointUl).find('li').remove();

	    	for(var i = 0; i < widget.imgNums; i ++){
	    		var point = null;
	    		if(i == widget.current)
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

	    	widget.current = index;

	    	var selectedArr = [];
			if (index == 1){
				selectedArr = [index, index + 1, index + 2];
			}else if(index == widget.imgNums){
				selectedArr = [index - 2, index - 1, index];
			}else{
				selectedArr = [index - 1, index, index + 1];
			}	    			

			showImg(selectedArr);
	    };

	    var showImg = function(points){
	    	$.each(widget.imgs, function(index, imgLi){
	    		//var identifier = $(imgLi).attr('id');
	    		if($.inArray(index, points) !== -1){
                    $(imgLi).show();
				}
	    		else{
                    $(imgLi).hide();
				}

	    		//if(index == widget.current){
	    		//	if(!$(imgLi).hasClass('current'))
	    		//		$(imgLi).addClass('current')
	    		//}else{
	    		//	if($(imgLi).hasClass('current'))
	    		//		$(imgLi).removeClass('current')
	    		//}
	    	});

	    };
	    var initImg = function(){
	        if(widget.current == 0){
                $(widget).find('div.jtTop').addClass('disabled');
                $(widget).find('div.jtDown').removeClass('disabled');
			}else if(widget.current == (widget.imgNums - widget.displaySize)){
                $(widget).find('div.jtDown').addClass('disabled');
                $(widget).find('div.jtTop').removeClass('disabled');
			}else{
                $(widget).find('div.jtDown').removeClass('disabled');
                $(widget).find('div.jtTop').removeClass('disabled');
			}

	        var displayArr = calcDisplay();
			showImg(displayArr);
	    };

	    var calcDisplay = function(){
	        var index = widget.current;
            return [index, index + 1, index + 2];
        };

		var init = function(){
			widget.imgs = $(widget).find('div.minPic').find('li');
			widget.imgNums = widget.imgs.length;

			//initSelectPoints();
			initImg();
            initSelectedDevice();
            initDeviceTooltip();
			$(widget).find('div.jtTop').find('a').on('click', up);
            $(widget).find('div.jtDown').find('a').on('click', down);
            $(widget).find('div.minPic').find('li').on('click', selectDevice);
            $(widget).find('div.minPic').find('li').find('h5, h2, img').on('click', selectDevice);
		};

		var initDeviceTooltip = function(){
			$(widget).find('div.device').find('div.cover').find('ul').on('mouseover', function(e){
                var ul = e.target;
                var parents = $(ul).parentsUntil('div.picCol');
                var device = $.grep(parents, function(p, i){
                    return $(p).hasClass('device');
                });
                var siblings = $(device).siblings();
                var tooltip = $.grep(siblings, function(p, i){
                    return $(p).hasClass('tooltip');
                });
                $(tooltip).show();
            });

            $(widget).find('div.device').find('div.cover').find('ul').on('mouseout', function(e){
                var ul = e.target;
                var parents = $(ul).parentsUntil('div.picCol');
                var device = $.grep(parents, function(p, i){
                    return $(p).hasClass('device');
                });
                var siblings = $(device).siblings();
                var tooltip = $.grep(siblings, function(p, i){
                    return $(p).hasClass('tooltip');
                });
                $(tooltip).hide();
            });

            $(widget).find('div.device').find('div.cover').find('li').on('mouseover', function(e){
                return false;
            });
		};

		var initSelectedDevice = function(){
            var target = $(widget).find('div.minPic').find('li.current').attr('data-target');
            $(widget).find('div.deviceContainer').hide();
            $(target).slideDown();
		};

        var selectDevice = function(e){
            var target = null;
            if(e.target.tagName === 'H5'
				|| e.target.tagName === 'H2'
				|| e.target.tagName === 'IMG'){
            	target = $(e.target).parent();
			}else{
            	target = e.target;
			}
            $(widget).find('div.minPic').find('li').removeClass('current');
            $(target).addClass('current');
            initSelectedDevice();
		};

        var up = function(){
			if(widget.current > 0){
				widget.current --;
				initImg();
			}
		};

		var down = function(){
            if(widget.current < (widget.imgNums - widget.displaySize)){
                widget.current ++;
                initImg();
            }
		};

		init();
	}

})(jQuery);