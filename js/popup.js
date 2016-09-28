(function($){
	var popup = {
		target: null,
		init: function(target){
			popup.target = target;
			popup.hide();

			$(target).find('button.close').bind('click', popup.hide);
		},
		hide:function(){
			$(popup.target).hide();
			$(popup.target).parent().hide();
			$(popup.target).parent().next('div.popupBackdrop').remove();
		},
		show:function(){
			$(popup.target).show();
			$(popup.target).parent().show();
			$(popup.target).parent().after('<div class="popupBackdrop"></div>');
		}
	}
	
	$.fn.popup = function(){
		var popupDiv = $(this).attr('data-target');
		popup.init(popupDiv);

		$(this).bind('click', popup.show);
	}

	$.fn.hidePopup = function(){
		$(this).bind('click', popup.hide);
	}
})(jQuery);