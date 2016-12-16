function showLoading(msg){
	if (msg != null && msg != 'undifined' && msg != ''){
		$('#loading').find('div.loadingDiv').find('span').text(msg);
	}else{
		$('#globalLoading').find('div.loadingDiv').find('span').text('数据加载，请稍等......');
	}
	$('#loading').show();
}

function hideLoading(){
	$('#loading').hide();
}

function showGlobalLoading(msg){
	if (msg != null && msg != 'undifined' && msg != ''){
		$('#globalLoading').find('div.loadingDiv').find('span').text(msg);
	}else{
		$('#globalLoading').find('div.loadingDiv').find('span').text('数据加载，请稍等......');
	}
	$('#globalLoading').show();
}

function hideGlobalLoading(){
	$('#globalLoading').hide();
}

function showMessage(msg){
	var alertDiv = $('<div class="alertDiv"></div>');
	alertDiv.appendTo($('div.contentDiv'));
}

function hidePopup(target){
	$(target).hide();
	$(target).parent().hide();
	$(target).parent().next('div.popupBackdrop').remove();
}
function alertMsg(options={}){
	var title            = options.title || '警告';
	var msg              = options.msg || '您的输入不合法';
	var callbackFn       = options.callbackFn; 

	var fade             = $('<div class="popup fade" style="display:block ;">')
	var popup            = $('<div class="popupDiv">');
	var content          = $('<div class="popupContent" style="width:410">');	

	var contentHeader    = $('<div class="contentHeader">');
	var dismissBtn       = $(' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');
	dismissBtn.on('click', function(){
		fade.remove();
	});
	contentHeader.append(dismissBtn);

	var headerTitle      = $('<h4></h4>'); 
	headerTitle.text(title);
	contentHeader.append(headerTitle);

	var alertMiddle      = $('<div class="alertDesc alertDesc-info"></div>');
	var contentBody      = $('<div class="contentBody">');
	var contentTable     = $('<table class="table-input">');
	var contentTableBody = $('<tbody><tr><td style="font-size:15px">'+msg+'</td></tr></tbody>');

	contentTable.append(contentTableBody);
	contentBody.append(contentTable);

	var contentFooter    = $('<div class="contentFooter">');
	var cancelButton     = $('<button class="btn btn-light" type="button" data-dismiss="modal" aria-hidden="true">>取消</button>');
	cancelButton.on('click', function(){
		fade.remove();
	});
	contentFooter.append(cancelButton);

	if(callbackFn != null && callbackFn != 'undifined'){
		var subButton        = $('<button class="btn btn-color  m-r-10">确定</button>');
		subButton.on('click', function(){
			callbackFn();
		});
		contentFooter.append(subButton);
	}

	content.append(contentHeader);
	content.append(alertMiddle);
	content.append(contentBody);
	content.append(contentFooter);
	popup.append(content);
	fade.append(popup);
	$('div.contentDiv').append(fade);

	var windowHeight      = $(window).height();
	var popupHight        = $(popup).height();
	var offsetHeight = (parseInt((windowHeight - popupHight)/2) -50)+ 'px';
	$(popup).css('top', offsetHeight);	
}

function empty(obj){
	if (obj == null){
		return true;
	}

	if(obj == 'undifined'){
		return true;
	}

	if(obj == ''){
		return true;
	}

	return false;
}

function showTooltip(target, title, data, dataTarget, position){
    if($('div[data-target]').length > 0)
    	return false;
    return buildTooltip(target, title, data, dataTarget, position);
};
function hideTooltip(dataTarget){
	$('div[data-target]').remove();
}
var buildTooltip = function(targetNode, title, data, dataTarget, position){
	position = position || {};
	var top  = position.top;
    var left = position.left;

    var targetNode = $(targetNode);

    var wrapper = $('<div class="tooltip" data-target="'+dataTarget+'" style="width:195px;z-index:21"></div>');

    $(wrapper).css('position', 'absolute');


    initInfo(wrapper, title, data);
    var arrow = initArrow(wrapper);


    resizeArrow(arrow, wrapper);


    $('body').append(wrapper);
    if(empty(position.top))
        top  = $(targetNode).offset().top - $(wrapper).outerHeight() - 10;
    $(wrapper).css('top',  top+ 'px');

    if(empty(position.left))
        left = $(targetNode).offset().left - $(wrapper).outerWidth()/2 + 10;
    $(wrapper).css('left', left + 'px');

    return wrapper;
};

var initInfo = function(wrapper, title, data){
	var title = title || '信息';
    var data  = data || [];
    var table = $('<table class="table-input tooltipTable" cellpadding="0" cellspacing="0" width="100%">');

    //title
	var thead = $('<thead></thead>');
    var headerTr = $('<tr></tr>');
    var headerTd = $('<td colspan="2" class="title"></td>');
    $(headerTd).text(title);
    headerTr.append(headerTd);
    thead.append(headerTr);
    table.append(thead);

    //info
    $.each(data, function(i, item){
        var tr  = $('<tr></tr>');
        var td1 = $('<td width="48%"></td>');
        var td2 = $('<td></td>');

        $(td1).text(item.name);
        $(td2).text(item.value);

        tr.append(td1);
        tr.append(td2);

        table.append(tr);
    });
    $(wrapper).append(table);
};

var initArrow = function(wrapper){
    var arrowDiv = $('<div style="position:relative" class="gbArrow"></div>');
    $(arrowDiv).append('<div class="arrowDown"></div>');
    $(wrapper).append(arrowDiv);
    arrowDiv = arrowDiv;
    return arrowDiv;
};

var resizeArrow = function(arrowDiv, wrapper){
    $(arrowDiv).css('top', '2px');
    var left = $(wrapper).outerWidth()/2 - 10;
    $(arrowDiv).css('left',  left + 'px');
};

var about = function () {
	var about      = $('body').find('div.aboutUS');
	$(about).show();

	var dismissBtn = $(about).find('button.close');
	$(dismissBtn).unbind();
	$(dismissBtn).on('click', function(e) {
		$(about).hide();
	});
};

/*
 * data = {
 *     band:[
 *          {name:"读", value: 27},
 *          {name:"写", value: 27},
 *          {name:"当前", value: 27}
 *     ],
 *     iops:[
 *          {name:"读", value: 27},
 *          {name:"写", value: 27},
 *          {name:"当前", value: 27}
 *     ],
 *     ddsj:[
 *          {name:"读", value: 27},
 *          {name:"写", value: 27},
 *          {name:"当前", value: 27}
 *     ]
 * };
 *
 */
function updateDashboardTips(data) {
	data     = data || {};
	var band = data.band || [];
	var iops = data.iops || [];
    var ddsj = data.ddsj || [];

    var bandDiv = $('body').find('div.dkCol');
    var bandTrs = $(bandDiv).find('.tooltip').find('tr');
    $.each(band, function (i, d) {
    	var cells = $(bandTrs[i]).find('td');
    	$(cells.get(0)).text(d.name);
        $(cells.get(1)).text(d.value);
	});

    var iopsDiv = $('body').find('div.iopsCol');
    var iopsTrs = $(iopsDiv).find('.tooltip').find('tr');
    $.each(iops, function (i, d) {
        var cells = $(iopsTrs[i]).find('td');
        $(cells.get(0)).text(d.name);
        $(cells.get(1)).text(d.value);
    });

    var ddsjDiv = $('body').find('div.ddsjCol');
    var ddsjTrs = $(ddsjDiv).find('.tooltip').find('tr');
    $.each(ddsj, function (i, d) {
        var cells = $(ddsjTrs[i]).find('td');
        $(cells.get(0)).text(d.name);
        $(cells.get(1)).text(d.value);
    });
}
