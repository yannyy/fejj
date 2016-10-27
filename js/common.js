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
	var cancelButton     = $('<button class="btn btn-light">取消</button>');
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