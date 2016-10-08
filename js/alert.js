(function($){
	var alert = {
		init: function(){
			$('div.alertDiv').find('button.close').bind('click', alert.dismiss)
		},
		dismiss: function(e){
			$(e.target).parent().parent().hide();
		}
	}

	$(document).ready(function(){
		alert.init();
	});
})(jQuery);