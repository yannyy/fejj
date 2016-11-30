(function($){
	$.fn.areaFix = function(options){
		var areaFixParams = {
			selector: '',
			disabled: false
		};
		options = options || {};
		areaFixParams.disabled = options.disabled || false;
		var widget = this;
		//定义滚动模块
		var areaFix = {
			blockAreaOffset: 0,
			disable: function(){
                areaFixParams.disabled = true;
                areaFix.init();
            },
			activate: function(){
                areaFixParams.disabled = false;
                areaFix.init();
			},
			init: function(){
				areaFixParams.selector = widget.selector;
				areaFix.fixedInit();
				areaFix.tableSelectInit();
				areaFix.clearCheckStatus();
			},
			resize: function(e){
				if($('div.fixedArea').length != 0){
					areaFix.actionBarTop = $('div.fixedArea').offset().top;
				}
			},
			initSortable: function(){
                var headers = $(widget).find('div.fixedArea').find('div.tableHeader').find('th.sortable');

                $(headers).on('click', function(e){
                    var index = $(e.target).attr('data-sindex');

                  	$(e.target).toggleClass('sorting_desc');
                    $(e.target).toggleClass('sorting_asc');

                    var asc = false;
                    if($(e.target).hasClass('sorting_asc'))
                    	asc = true;
					areaFix.sortTable(index, asc);
				});
			},
			sortTable: function(index, asc){
				var rows = $('div.blockArea').find('div.tableBody').find('tr');
				var data = [];
				var model = [];
				var special = null;

				//获取model
                var frow = $('div.blockArea').find('div.tableBody').find('tr:first');
                $(frow).find('td').each(function (i, td) {
					var ntd = $(td).clone();
					model.push(ntd.html('').get(0));
				});

				//从每行中取数据
				$.each(rows, function (i, tr) {
				    var row = [];
				    var cells = $(tr).find('td');
				    $.each(cells, function(j, cell) {
				    	row.push($(cell).html());
					});
				    data.push(row);
				});
				data = data.sort(function(row1, row2){
					if(asc) {
                        return row1[index] > row2[index] ? 1 : -1;
					} else {
                        return row2[index] > row1[index] ? 1 : -1;
					}
				});

                $('div.blockArea').find('div.tableBody').find('tr').remove();
                var tbody = $('div.blockArea').find('div.tableBody').find('tbody');

                $.each(data, function (i, row) {
                	var tr = $('<tr></tr>');
                	$.each(row, function(j, cell) {
                		var td = $(model[j]).clone();
                		$(td).html(cell);

                		tr.append(td);
					});

                	$(tbody).append(tr);
				});
			},
			fixedInit: function(){
				if($(widget).find('div.fixedArea').length != 0){
					areaFix.initSortable();
					areaFix.actionBarTopFixed();
					areaFix.blockAreaOffset = $(widget).find('div.blockArea').offset();
					areaFix.initFloatStatus();	
					$(widget).find('div.replaceArea').css('height', $(widget).find('div.fixedArea').height());
				}
			},
			initFloatStatus: function(){
				if($(widget).find('div.fixedArea').length != 0){
					areaFix.actionBarTop = $(widget).find('div.fixedArea').offset().top;
					areaFix.onWindowScroll();
				}
			},
			actionBarTopFixed: function(){
                if(!areaFixParams.disabled) {
                    $(window).bind('scroll', areaFix.onWindowScroll);
                }
			},
			onWindowScroll: function(){
				 if(!areaFixParams.disabled){
                    var theScrollTop = document.documentElement.scrollTop
                        || window.pageYOffset
                        || document.body.scrollTop;
                    var scrollTop = $(window).scrollTop();

                    if ((scrollTop + 23) > areaFix.actionBarTop) {
                        // 固顶
                        $(widget).find('div.replaceArea').show();
                        if (false == $(widget).find('div.fixedArea').hasClass('floatArea'))
                            $(widget).find('div.fixedArea').addClass('floatArea');

                        if (false == $(widget).find('div.fixedArea').children('div').hasClass('fixedContent'))
                            $(widget).find('div.fixedArea').children('div').addClass('fixedContent');
                    } else {
                        // 取消固顶
                        $(widget).find('div.replaceArea').hide();

                        if (true == $(widget).find('div.fixedArea').hasClass('floatArea'))
                            $(widget).find('div.fixedArea').removeClass('floatArea');

                        if (true == $(widget).find('div.fixedArea').children('div').hasClass('fixedContent'))
                            $(widget).find('div.fixedArea').children('div').removeClass('fixedContent');
                    }
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
		return {
			disable: areaFix.disable,
            activate: areaFix.activate,
			params: this,

		};
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
