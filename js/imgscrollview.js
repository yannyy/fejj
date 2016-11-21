(function($){
	$.fn.imgScroll = function(options){
		var widget = this;

		options            = options || {};
		widget.max         = options.max | 3;

		widget.imgs          = [];
		widget.imgNums       = 0;
		widget.current       = 0;
        widget.currentTaget  = 0;
        widget.displaySize   = 3;
        widget.device        = 'front';
        widget.deviceSwither = null;

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
	    		if($.inArray(index, points) !== -1){
                    $(imgLi).show();
				}
	    		else{
                    $(imgLi).hide();
				}
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
			widget.imgs    = $(widget).find('div.minPic').find('li');
			widget.imgNums = widget.imgs.length;
            widget.device  = 'front';

            $.each(widget.imgs, function(i, li){
                if(i === widget.current){
                    widget.currentTaget = $(li).attr('data-target');
                }
            });

			initImg();
            initSelectedDevice();
            initDevice();
            initDeviceTooltip();

            //devicelist scroll button event
			$(widget).find('div.jtTop').find('a').on('click', up);
            $(widget).find('div.jtDown').find('a').on('click', down);

            //select device event
            $(widget).find('div.minPic').find('li').on('click', selectDevice);
            $(widget).find('div.minPic').find('li').find('h5, h2, img').on('click', selectDevice);
		};

		var initBackDevice = function(){
			var target     = widget.currentTaget;
			var backview   = $(target).find('div.backDevice');

            //find tooltip div and hover div
			var hoverDiv   = $(backview).find('div.coverB').not('.status').filter(':first');
            var tooltipDiv = $(backview).find('div.coverB').not('.status').filter(':last');

            //init tooltip events
            $(tooltipDiv).find('li').unbind('mouseover');
            $(tooltipDiv).find('li').unbind('mouseout');

            $(tooltipDiv).find('li').on('mouseover', function(e){
                $(hoverDiv).find('li').removeClass('hoverB');

                var hoverTarget = $(e.target).attr('data-hover');
                $(hoverTarget).addClass('hoverB');

                var targetDiv = $(e.target).parentsUntil('div.device').filter('div.backDevice');
                $(targetDiv).find('div.tooltip').css('display', 'none');
                var tooltipTarget = $(e.target).attr('data-tooltip');
                $(tooltipTarget).show();

            });
            $(tooltipDiv).find('li').on('mouseout', function(e){
                $(hoverDiv).find('li').removeClass('hoverB');
                var tooltipTarget = $(e.target).attr('data-tooltip');
                $(tooltipTarget).hide();
            });
		};

		var initDevice = function(){
			var target = widget.currentTaget;
			if(widget.device === 'front'){
                $(target).find('div.backDevice').hide();
                $(target).find('div.frontDevice').css('top', '-500px').animate({'top':'0px'}, 300).show();
			}else{
                $(target).find('div.frontDevice').hide();
                $(target).find('div.backDevice').css('top', '-500px').animate({'top':'0px'}, 300).show();
                initBackDevice();
            }

            //frontdevice, backdevice switch event
			var switchBtn = $(target).find('div.switchIcon').find('a:first');
			$(switchBtn).unbind('click');
            $(switchBtn).on('click', deviceSwitch);
		};

		var deviceSwitch = function (e) {
			if(widget.device === 'front'){
				widget.device = 'back';
			}else{
                widget.device = 'front';
			}

			initDevice();
        }

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
            widget.currentTaget = target;
            $(widget).find('div.deviceContainer').hide();
            $(target).slideDown();

            widget.device = 'front';
            initDevice();
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