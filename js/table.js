(function($){
	var areaFix = {
		init: function(){
			areaFix.fixedInit();
			areaFix.tableSelectInit();
			areaFix.clearCheckStatus();
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
		},
		fixedInit: function(){
			if($('div.fixedArea')){
				areaFix.actionBarTopFixed();	
			}

			areaFix.initFloatStatus();
		},
		actionBarTopFixed: function(){
			$(window).bind('scroll', areaFix.onWindowScroll);
		},
		initFloatStatus: function(){
			areaFix.onWindowScroll();
			areaFix.actionBarTop = $('div.fixedArea').outerHeight();
		},
		onWindowScroll:function(e){
			/**
			*if it's not working in IE8, try the following code.
			*/
			var theScrollTop = document.documentElement.scrollTop 
				|| window.pageYOffset 
				|| document.body.scrollTop;
			var scrollTop = $(window).scrollTop();



			if((scrollTop + 23) > areaFix.actionBarTop) {
				// top fixed
				if (false == $('div.fixedArea').hasClass('floatArea')) 
					$('div.fixedArea').addClass('floatArea');

				if(false == $('div.fixedArea').children('div').hasClass('fixedContent'))
					$('div.fixedArea').children('div').addClass('fixedContent');
			} else {
				// dismiss top fixed
				if (true == $('div.fixedArea').hasClass('floatArea'))
					$('div.fixedArea').removeClass('floatArea');

				if (true == $('div.fixedArea').children('div').hasClass('fixedContent'))
					$('div.fixedArea').children('div').removeClass('fixedContent');
			}
		},
		tableSelectInit: function(){
			$('table.table').find('td').children('input[type="checkbox"]').on('click', areaFix.rowSelected);
			$('table.table').find('td').children('input[type="checkbox"]').on('change', areaFix.rowSelected);
			$('table').find('th').children('input[type="checkbox"]').on('click', areaFix.rowAllSelected);

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
		}
	}

	$.fn.disableOnRowSelected = function(){
		var target = $(this);
		
		if(true == target.hasClass('disabled'))
			target.removeClass('disabled');

		var checked = false;
		$('table').find('th').children('input[type="checkbox"]').on('click', function(e){
			var checked = e.target.checked;
			if(checked){
				if(false == target.hasClass('disabled'))
					target.addClass('disabled');
			}else{
				if(true == target.hasClass('disabled'))
					target.removeClass('disabled');
			}
		});

		$('table.table').find('td').children('input[type="checkbox"]').on('change', function(e){
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
		areaFix.init();
	});
})(jQuery);
