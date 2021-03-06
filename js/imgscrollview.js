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
            //initDeviceTooltip();

            //devicelist scroll button event
			$(widget).find('div.jtTop').find('a').on('click', up);
            $(widget).find('div.jtDown').find('a').on('click', down);

            //select device event
            $(widget).find('div.minPic').find('li').on('click', selectDevice);
            $(widget).find('div.minPic').find('li').find('h5, h2, img, span, em, i').on('click', selectDevice);
		};

		var initFrontDevice = function(){
            var target      = widget.currentTaget;
            var frontview   = $(target).find('div.frontDevice');

            var tooltipDiv  = $(frontview).find('div.cover').not('status');

            //机柜hvoer
            $(frontview).find('div.enclosure').find('div.eDiv').on('mouseenter', function(e){
                $(e.target).parent().find('div.eHover').addClass('hover');
            });

            $(frontview).find('div.enclosure').find('div.eDiv').on('mouseout', function(e){
                $(e.target).parent().find('div.eHover').removeClass('hover');
            });


            //磁盘hover，如果没有磁盘，不加hover
            $(tooltipDiv).find('li').on('mouseover', function(e){
            	$(tooltipDiv).find('li').removeClass('hover');
            	var hover = $(e.target).attr('data-hover');
            	if(!$(hover).hasClass('no_pd')) {
                    $(e.target).addClass('hover');
				}
			});
           	//鼠标一走，取消hover
            $(tooltipDiv).find('li').on('mouseout', function(e){
                $(tooltipDiv).find('li').removeClass('hover');
			});
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
                initFrontDevice();
			}else{
                $(target).find('div.frontDevice').hide();
                $(target).find('div.backDevice').css('top', '-500px').animate({'top':'0px'}, 300).show();
                initBackDevice();
            }

            //frontdevice, backdevice switch event
			var switchBtn = $(target).find('div.switchIcon').find('a:first');
			$(switchBtn).unbind('click');
            $(switchBtn).on('click', deviceSwitch);

            $(window).trigger({
                type:'initDevice',
                device:widget.device
            });
		};

		var deviceSwitch = function (e) {
			if(widget.device === 'front'){
				widget.device = 'back';
			}else{
                widget.device = 'front';
			}

			initDevice();
        };

		var initDeviceTooltip = function(){
		    var frontDevice = $(widget).find('div.device').find('div.frontDevice').find('div.cover').not('div.status').find('ul');
		    $.each(frontDevice, function(i, ul){
				$(ul).tableTooltip({title:'front view 背板'});
            });
		    $(frontDevice).tableTooltip({title:'front view 背板'});

            $(widget).find('div.device').find('div.cover').find('li').on('mouseover', function(e){
                return false;
            });
		};

		var initSelectedDevice = function(){
            var target = $(widget).find('div.minPic').find('li.current').attr('data-target');
            widget.currentTaget = target;
            $(widget).find('div.deviceContainer').hide();
            $(target).show();

            widget.device = 'front';
            initDevice();
		};

        var selectDevice = function(e){
        	e.stopPropagation();
            var target = null;
            if (e.target.tagName === 'H5'
				|| e.target.tagName === 'H2'
				|| e.target.tagName === 'IMG') {
            	target = $(e.target).parent();
			} else if(e.target.tagName === 'SPAN'
				|| e.target.tagName === 'EM'
				|| e.target.tagName === 'I' ) {
            	var h5 = $(e.target).parentsUntil('li').filter('h5');
            	target = $(h5).parent();
			} else {
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