(function($){
	$.fn.selectAll = function(){
		var widget = this;

		widget.toggle = function(e){
			var checked = e.target.checked;	
			console.log("checked: " + checked);
			var checkList = $(widget).find('tbody').find('input[type="checkbox"]');
			$.each(checkList, function(i, checkbox){
				checkbox.checked = checked;
			});
		}
		$(this).find('thead').find('input[type="checkbox"]').on('click', widget.toggle);
	}
})(jQuery);