(function($){
	var dropdown = {
		init: function(){
			dropdown.toggleInit();	
		},
		toggleInit: function(){
			$('div.dropdown').children('a').on('click', dropdown.toggleDropdown);
			$.each($('div.dropdown').find('li'), function(i, li){
				if($(li).hasClass('dropdownSub'))
					$(li).on('mouseover', dropdown.openDropdownSub);
				else
					$(li).on('mouseover', dropdown.closeDropdownSub);
			});
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
		toggleDropdownSub: function(e){
			e.stopPropagation();
			if(e.target.tagName != 'A')
				return false;

			var li = $(e.target).parent();
			$(li).toggleClass('open');
			$(li).find('ul').toggle();
		},
		openDropdownSub: function(e){
			e.stopPropagation();
			if(e.target.tagName != 'A')
				return false;

			var li = $(e.target).parent();
			$(li).addClass('open');
			$(li).find('ul').show();
		},
		closeDropdownSub: function(e){
			e.stopPropagation();
			if(e.target.tagName != 'A')
				return false;

			var li = $(e.target).parent();
			var ul = $(li).parent();
			$(ul).find('li.dropdownSub').removeClass('open');
			$(ul).find('li.dropdownSub').find('ul').hide();
		},
		collapseDropdown: function(e){
			$('div.dropdown').children('ul').hide();
			$('div.dropdown').children('a').removeClass('dropdown-toggle');

			var subs = $('div.dropdown').find('li.dropdownSub');
			$(subs).removeClass('open');
			$(subs).find('ul').hide();
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