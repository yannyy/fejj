(function($){
	var popup = {
		target: null,
		init: function(target){
			popup.hide(target);

			$(target).find('button.close').bind('click', popup.onHide);
		},
		hide:function(target){
			$(target).hide();
			$(target).parent().hide();
			$(target).parent().next('div.popupBackdrop').remove();
		},
		show:function(target){
			$(target).show();
			$(target).parent().show();
			$(target).parent().after('<div class="popupBackdrop"></div>');
		},
		onHide: function(e){
			var $node = $(e.target);
			popup.hide($node.attr('data-dismiss'));
		},
		onShow: function(e){
			var $node = $(e.target);
			popup.show($node.attr('data-target'));
		}
	}
	
	$.fn.popup = function(){
		var popupDiv = $(this).attr('data-target');
		popup.init(popupDiv);

		$(this).bind('click', popup.onShow);
	}

	$.fn.hidePopup = function(){
		$(this).bind('click', popup.onHide);
	}
})(jQuery);