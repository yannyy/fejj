(function ($) {
    $.fn.areaFix = function (options) {
        var areaFixParams = {
            selector: '',
            disabled: false
        };
        options = options || {};
        areaFixParams.disabled = options.disabled || false;
        areaFixParams.sortFunc = options.sortFunc || null;
        var widget = this;
        //定义滚动模块
        var areaFix = {
            blockAreaOffset: 0,
            sortData: [],
            disable: function () {
                areaFixParams.disabled = true;
                areaFix.init();
            },
            activate: function () {
                areaFixParams.disabled = false;
                areaFix.init();
            },
            init: function (widget) {
                areaFix.widget = widget;
                areaFix.fixedInit();
                areaFix.tableSelectInit();
                areaFix.clearCheckStatus();
            },
            resize: function (e) {
                if ($('div.fixedArea').length != 0) {
                    areaFix.actionBarTop = $('div.fixedArea').offset().top;
                }
            },
            initSortable: function () {
                var headers = $(widget).find('div.fixedArea').find('div.tableHeader').find('th.sortable');

                $(headers).unbind('click');
                $(headers).on('click', function (e) {
                    var index = $(e.target).attr('data-sindex');
                    if (!$(e.target).hasClass('sorting_desc') && !$(e.target).hasClass('sorting_asc')) {
                        $(e.target).addClass('sorting_asc');
                    }
                    else if ($(e.target).hasClass('sorting_asc')) {
                        $(e.target).removeClass('sorting_asc');
                        $(e.target).addClass('sorting_desc');
                    } else if ($(e.target).hasClass('sorting_desc')) {
                        $(e.target).removeClass('sorting_desc');
                        $(e.target).addClass('sorting_asc');
                    }

                    var asc = false;
                    if ($(e.target).hasClass('sorting_asc'))
                        asc = true;

                    var fixedArea = $(e.target).parentsUntil('div.topFixDiv').filter('.fixedArea');
                    areaFix.widget = $(fixedArea).parent();
                    if (!empty(index))
                        areaFix.sortTable(index, asc);
                });
            },
            pushSortData: function (dataTTId, dataTTPId, row, data) {
                data = data || [];
                //data.push({dataTTId:dataTTId, dataTTPId:dataTTPId, row:row});
                $.each(data, function (i, obj) {
                    if (obj.dataTTId == dataTTPId)
                        areaFix.pushSortData(dataTTId, dataTTPId, row, obj.children);
                });
                return data;
            },
            BKMGT2B: function (str) {
                str = str.toUpperCase();
                if (str.lastIndexOf("KB") > 0) {
                    str = str.replace("KB", "K");
                } else if (str.lastIndexOf("MB") > 0) {
                    str = str.replace("MB", "M");
                } else if (str.lastIndexOf("GB") > 0) {
                    str = str.replace("GB", "G");
                } else if (str.lastIndexOf("TB") > 0) {
                    str = str.replace("TB", "T");
                }
                if (str.lastIndexOf("B") == str.length - 1) {
                    str = str.substring(0, str.length - 1);
                } else if (str.lastIndexOf("K") == str.length - 1) {
                    str = str.substring(0, str.length - 1) * 1024;
                } else if (str.lastIndexOf("M") == str.length - 1) {
                    str = str.substring(0, str.length - 1) * 1024 * 1024;
                } else if (str.lastIndexOf("G") == str.length - 1) {
                    str = str.substring(0, str.length - 1) * 1024 * 1024 * 1024;
                } else if (str.lastIndexOf("T") == str.length - 1) {
                    str = str.substring(0, str.length - 1) * 1024 * 1024 * 1024 * 1024;
                }
                return str;
            },
            sortFunc: function (row1, row2) {
                var asc = areaFix.asc;
                var index = areaFix.index;
                var reg = /^[0-9.]+[BKMGTbkmgt]{1,2}$/;

                var data1 = row1.row[index];
                var data2 = row2.row[index];

                if (empty(areaFixParams.sortFunc)) {
                    if (asc) {
                        if (reg.test(data1) && reg.test(data2)) {
                            return areaFix.BKMGT2B(data1) - areaFix.BKMGT2B(data2);
                        } else if (!isNaN(data1) && !isNaN(data2)) {
                            return data1 - data2;
                        } else {
                            var data1 = data1.toUpperCase();
                            var data2 = data2.toUpperCase();

                            if (data1 > data2)
                                return 1;
                            else if (data1 < data2)
                                return -1;
                            else
                                return 0;
                        }
                    } else {
                        if(reg.test(data1.toUpperCase()) && reg.test(data2.toUpperCase())) {
                            return areaFix.BKMGT2B(data2) - areaFix.BKMGT2B(data1);
                        } else if (!isNaN(data1) && !isNaN(data2)) {
                            return data2 - data1;
                        } else {
                            var data1 = data1.toUpperCase();
                            var data2 = data2.toUpperCase();

                            if (data2 > data1)
                                return 1;
                            else if (data2 < data1)
                                return -1;
                            else
                                return 0;
                        }
                    }
                } else {
                    return areaFixParams.sortFunc(data1, data2, asc, index);
                }
            },
            sortTable: function (index, asc) {
                index = parseInt(index);

                areaFix.asc = asc;
                areaFix.index = index;

                var rows = $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('tr');
                var model = [];
                var special = null;

                //获取model
                var frow = $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('tr:first');
                $(frow).find('td').each(function (i, td) {
                    var ntd = $(td).clone();
                    model.push(ntd.html('').get(0));
                });

                areaFix.sortData = [];
                //从每行中取数据
                $.each(rows, function (i, tr) {
                    var row = areaFix.fetchRowData(tr);
                    var dataTTId = $(tr).attr('data-tt-id');
                    var dataTTPId = $(tr).attr('data-tt-parent-id');
                    if (empty(dataTTPId))
                        areaFix.sortData.push({dataTTId: dataTTId, dataTTPId: dataTTPId, row: row});
                });
                $.each(areaFix.sortData, function (i, obj) {
                    obj.children = [];
                    var pId = obj.dataTTId;
                    var rows = $(areaFix.widget).find('tr[data-tt-parent-id="' + pId + '"]');
                    $.each(rows, function (j, tr) {
                        var row = areaFix.fetchRowData(tr);
                        var dataTTId = $(tr).attr('data-tt-id');
                        var dataTTPId = $(tr).attr('data-tt-parent-id');
                        obj.children.push({dataTTId: dataTTId, dataTTPId: dataTTPId, row: row});
                    });
                });
                var data = areaFix.sortData;
                data = data.sort(areaFix.sortFunc);

                $.each(data, function (i, obj) {
                    if (!empty(obj.children))
                        obj.children = obj.children.sort(areaFix.sortFunc);
                });

                $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('tr').remove();
                var tbody = $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('tbody');

                $.each(data, function (i, row) {
                    var tr = $('<tr></tr>').get(0);
                    if (!empty(row.dataTTId)) {
                        $(tr).attr('data-tt-id', row.dataTTId);
                    }

                    if (!empty(row.dataTTPId)) {
                        $(tr).attr('data-tt-parent-id', row.dataTTPId);
                    }

                    $.each(row.row, function (j, cell) {
                        var td = $(model[j]).clone().get(0);
                        $(td).html(cell);

                        $(tr).append(td);
                    });
                    $(tbody).append(tr);
                    $.each(row.children, function (j, subRow) {
                        var subTr = $('<tr class="tdSon"></tr>').get(0);
                        if (!empty(subRow.dataTTId)) {
                            $(subTr).attr('data-tt-id', subRow.dataTTId);
                        }

                        if (!empty(subRow.dataTTPId)) {
                            $(subTr).attr('data-tt-parent-id', subRow.dataTTPId);
                        }

                        $.each(subRow.row, function (j, cell) {
                            var subTd = $(model[j]).clone().get(0);
                            $(subTd).html(cell);

                            $(subTr).append(subTd);
                        });
                        $(tbody).append(subTr);
                    });

                });
                $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('tr').find('span.indenter').remove();
                $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('table').treetable("destroy");
                $(areaFix.widget).find('div.blockArea').find('div.tableBody').find('table').treetable({expandable: true}, true);
                //areaFix.widget.trigger("tableSort");
                $(window).trigger('tableSort', [areaFix.widget]);
                areaFix.init();
            },
            fetchRowData: function (tr) {
                var dataTTId = $(tr).attr('data-tt-id');
                var exists = true;

                var row = [];
                var cells = $(tr).find('td');
                $.each(cells, function (j, cell) {
                    row.push($(cell).html());
                });
                return row;
            },
            fixedInit: function () {
                if ($(widget).find('div.fixedArea').length != 0) {
                    $('body').find('div.blockArea').find('div.tableBody').find('table').treetable({expandable: true});
                    areaFix.initSortable();
                    areaFix.actionBarTopFixed();
                    areaFix.blockAreaOffset = $(widget).find('div.blockArea').offset();
                    areaFix.initFloatStatus();
                    $(widget).find('div.replaceArea').css('height', $(widget).find('div.fixedArea').height());
                }
            },
            initFloatStatus: function () {
                if ($(widget).find('div.fixedArea').length != 0) {
                    areaFix.actionBarTop = $(widget).find('div.fixedArea').offset().top;
                    areaFix.onWindowScroll();
                }
            },
            actionBarTopFixed: function () {
                if (!areaFixParams.disabled) {
                    $(window).bind('scroll', areaFix.onWindowScroll);
                }
            },
            onWindowScroll: function () {
                if (!areaFixParams.disabled) {
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
            tableSelectInit: function () {
                $(widget).find('table.table').find('td').children('input[type="checkbox"]').on('click', areaFix.rowSelected);
                $(widget).find('table.table').find('td').children('input[type="checkbox"]').on('change', areaFix.rowSelected);
                $(widget).find('table').find('th').children('input[type="checkbox"]').on('click', areaFix.rowAllSelected);

                var all = $('table').find('th').children('input[type="checkbox"]')[0];
                $.each($('table.table').find('td').children('input[type="checkbox"]'), function (i, checkbox) {
                    var tr = $(checkbox).parent().parent();
                    if (all.checked) {
                        checkbox.checked = true;
                        tr.addClass('selected');
                    } else {
                        if (checkbox.checked)
                            tr.addClass('selected');
                        else
                            tr.removeClass('selected');
                    }

                });
            },
            rowSelected: function (e) {
                if (e.target.tagName != 'INPUT' && $(e.target).attr(type) != 'checkbox')
                    return false;

                var tr = $(e.target).parent().parent();
                if (e.target.checked)
                    tr.addClass('selected');
                else
                    tr.removeClass('selected');
            },
            rowAllSelected: function (e) {
                if (e.target.tagName != 'INPUT' && $(e.target).attr(type) != 'checkbox')
                    return false;

                var checked = e.target.checked;
                var rows = $('table.table').find('tr');
                $.each(rows, function (i, tr) {
                    if(empty($(tr).attr('data-tt-parent-id'))) {
                        $(tr).find('input[type="checkbox"]').each(function (i, cb) {
                            cb.checked = checked;
                        });
                        if (checked)
                            $(tr).addClass('selected');
                        else
                            $(tr).removeClass('selected');
                    }
                });
            },
            clearCheckStatus: function () {
                $.each($('table').find('input[type="checkbox"]'), function (i, cb) {
                    cb.checked = false;

                    if ($(cb).parent()[0].tagName == 'TR') {
                        var row = $(cb).parent().parent();
                        if (row.hasClass('selected'))
                            row.removeClass('selected');
                    }
                });

                $('table.table').find('tr.selected').removeClass('selected');
            }
        };
        window.areaFix = $(widget);
        window.areaFix.on('resize', areaFix.resize);
        areaFix.init(widget);
        return {
            disable: areaFix.disable,
            activate: areaFix.activate,
            params: this,

        };
    };

    $.fn.disableOnRowSelected = function () {
        var target = $(this);

        if (true == target.hasClass('disabled'))
            target.removeClass('disabled');

        function initEvent() {
            var checked = false;
            window.areaFix.find('th').children('input[type="checkbox"]').on('click', function (e) {
                var checked = e.target.checked;
                if (checked) {
                    if (false == target.hasClass('disabled'))
                        target.addClass('disabled');
                } else {
                    if (true == target.hasClass('disabled'))
                        target.removeClass('disabled');
                }
            });

            window.areaFix.find('table.table').find('td').children('input[type="checkbox"]').on('change', function (e) {
                if (e.target.checked) {
                    if (false == target.hasClass('disabled'))
                        target.addClass('disabled');
                } else {
                    if (true == target.hasClass('disabled'))
                        target.removeClass('disabled');
                }
            });
        }

        $(window).on('tableSort', function (e, widget) {
            initEvent();
        });
        initEvent();
    };

    $(document).ready(function () {
        $(window).bind('fixedResize', function (e) {
            window.areaFix.trigger('resize');
        });
    });

})(jQuery);
