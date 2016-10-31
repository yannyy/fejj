(function($){
	$.fn.btnToggle = function(options){
		var widget = this;

		var toggle = function(selector){
			$(selector).toggle();
		}
		var collapse = function(){
			$($(widget).attr('data-target')).hide();
		}
		var init = function(widget){
			$(widget).on('click', function(e){
				e.stopPropagation();
				if(e.target.tagName == 'I')
					var selector = $(e.target).parent().attr('data-target');	
				else
					var selector = $(e.target).attr('data-target');	
				toggle(selector);
			});
			$('body').on('click', collapse);
		}

		init(widget);
	}

})(jQuery);