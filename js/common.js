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