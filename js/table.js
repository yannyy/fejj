(function($){
	$.fn.areaFix = function(){

		var widget = this;
		//定义滚动模块
		var areaFix = {
			blockAreaOffset: 0,
			init: function(){
				areaFix.fixedInit();
				areaFix.tableSelectInit();
				areaFix.clearCheckStatus();
			},
			resize: function(e){
				if($('div.fixedArea').length != 0){
					areaFix.actionBarTop = $('div.fixedArea').offset().top;
				}
			},
			fixedInit: function(){
				if($(widget).find('div.fixedArea').length != 0){
					areaFix.actionBarTopFixed();
					areaFix.blockAreaOffset = $(widget).find('div.blockArea').offset();
					areaFix.initFloatStatus();	
				}
			},
			initFloatStatus: function(){
				if($(widget).find('div.fixedArea').length != 0){
					areaFix.actionBarTop = $(widget).find('div.fixedArea').offset().top;
					areaFix.onWindowScroll();
				}
			},
			actionBarTopFixed: function(){
				$(window).bind('scroll', areaFix.onWindowScroll);	
			},
			onWindowScroll: function(){

				var theScrollTop = document.documentElement.scrollTop 
			     	|| window.pageYOffset 
				    || document.body.scrollTop;
				var scrollTop = $(window).scrollTop();


				if((scrollTop) > areaFix.actionBarTop) {
				// 固顶 
				$('div.blockArea').addClass('m-b-fix');
				if (false == $('div.fixedArea').hasClass('floatArea')) 
					$('div.fixedArea').addClass('floatArea');

				if(false == $('div.fixedArea').children('div').hasClass('fixedContent'))
					$('div.fixedArea').children('div').addClass('fixedContent');
			    } else {
			    	// 取消固顶 
			    	$('div.blockArea').removeClass('m-b-fix');

			    	if (true == $('div.fixedArea').hasClass('floatArea'))
			    		$('div.fixedArea').removeClass('floatArea');

			    	if (true == $('div.fixedArea').children('div').hasClass('fixedContent'))
			    		$('div.fixedArea').children('div').removeClass('fixedContent');
			    }
			},
			tableSelectInit: function(){
				$(widget).find('table.table').find('td').children('input[type="checkbox"]').on('click', areaFix.rowSelected);
				$(widget).find('table.table').find('td').children('input[type="checkbox"]').on('change', areaFix.rowSelected);
				$(widget).find('table').find('th').children('input[type="checkbox"]').on('click', areaFix.rowAllSelected);

				var all = $('table').find('th').children('input[type="checkbox"]')[0];
				$.each($('table.table').find('td').children('input[type="checkbox"]'), function(i, checkbox){
					var tr = $(checkbox).parent().parent();
					if(all.checked){
						checkbox.checked = true;
						tr.addClass('selected');
					}else{
						if(checkbox.checked)
							tr.addClass('selected');
						else
							tr.removeClass('selected');
					}

				});
			},
			rowSelected: function(e){
				if(e.target.tagName != 'INPUT' && $(e.target).attr(type) != 'checkbox')
					return false;

				var tr = $(e.target).parent().parent();
				if(e.target.checked)
					tr.addClass('selected');
				else
					tr.removeClass('selected');
			},
			rowAllSelected: function(e){
				if(e.target.tagName != 'INPUT' && $(e.target).attr(type) != 'checkbox')
					return false;

				var checked = e.target.checked;
				$.each($('table.table').find('td').children('input[type="checkbox"]'), function(i, cb){
					cb.checked = checked;	

					var tr = $(cb).parent().parent();
					if(cb.checked)
						tr.addClass('selected');
					else
						tr.removeClass('selected');
				});
			},
			clearCheckStatus: function(){
				$.each($('table').find('input[type="checkbox"]'), function(i, cb){
					cb.checked = false;

					if($(cb).parent()[0].tagName == 'TR'){
						var row = $(cb).parent().parent();
						if(row.hasClass('selected'))
							row.removeClass('selected');
					}
				});

				$('table.table').find('tr.selected').removeClass('selected');
			}

		};
		window.areaFix = $(widget);
		window.areaFix.on('resize', areaFix.resize); 
		areaFix.init();
	}
	$.fn.disableOnRowSelected = function(){
		var target = $(this);
		
		if(true == target.hasClass('disabled'))
			target.removeClass('disabled');

		var checked = false;
		window.areaFix.find('th').children('input[type="checkbox"]').on('click', function(e){
			var checked = e.target.checked;
			if(checked){
				if(false == target.hasClass('disabled'))
					target.addClass('disabled');
			}else{
				if(true == target.hasClass('disabled'))
					target.removeClass('disabled');
			}
		});

		window.areaFix.find('table.table').find('td').children('input[type="checkbox"]').on('change', function(e){
			if(e.target.checked){
				if(false == target.hasClass('disabled'))
					target.addClass('disabled');
			}else{
				if(true == target.hasClass('disabled'))
					target.removeClass('disabled');
			}
		});
	}

	$(document).ready(function(){
		$(window).bind('fixedResize', function(e){
			window.areaFix.trigger('resize');
		});
	});
	
})(jQuery);
