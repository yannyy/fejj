(function($){
	var dropdown = {
		init: function(){
			dropdown.toggleInit();	
		},
		toggleInit: function(){
			$('div.dropdown').children('a').on('click', dropdown.toggleDropdown);
			$('body').on('click', dropdown.collapseDropdown);
		},
		toggleDropdown: function(e){
			e.stopPropagation();
			var a = e.target;

			if(a.tagName != 'A')
				return;

			$(a).parent().children('ul').toggle();
			$('div.dropdown').children('a').toggleClass('dropdown-toggle');
		},
		collapseDropdown: function(e){
			$('div.dropdown').children('ul').hide();
			$('div.dropdown').children('a').removeClass('dropdown-toggle');
		}
	}
	
	$.fn.dropdownBtn = function(){
		var copoment = this;
		var btnClicked = function(e){
			e.stopPropagation();
			var content = $(copoment).find('ul.dropdown-menu');
			content.toggle();
		}
		var closeDropdown = function(e){
			var content = $(copoment).find('ul.dropdown-menu');
			content.hide();
		}
		$('body').bind('click', closeDropdown);
		$(this).children('a').bind('click', btnClicked);
	}

	$(document).ready(function(){
		dropdown.init();
	});
})(jQuery);