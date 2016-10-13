(function($){
	var actionInnerTd = {
		init: function(){
			actionInnerTd.initLayout();
		},
		initLayout: function(){
			if ($('span.actionInnerTd').length <= 1)
				$('span.actionInnerTd').find('i.zmdi-minus-circle').attr('disabled', true);
			else
				$('span.actionInnerTd').find('i.zmdi-minus-circle').attr('disabled', false);

			$('span.actionInnerTd').find('i.zmdi-plus-circle').unbind('click');
			$('span.actionInnerTd').find('i.zmdi-plus-circle').bind('click', actionInnerTd.plus);
			$('span.actionInnerTd').find('i.zmdi-minus-circle').unbind('click');
			$('span.actionInnerTd').find('i.zmdi-minus-circle').bind('click', actionInnerTd.minus);
		},
		plus: function(e){
			var plusIcon = e.target;
			var actionInnerTdOjb = $(plusIcon).parent().parent().parent();
			var tr = $(actionInnerTdOjb).parent();

			var newTr = $(tr).clone(true);
			newTr.find('label').text('');
			$(newTr).find('input').val('');	
			tr.after(newTr);

			actionInnerTd.initLayout();
		},
		minus: function(e){
			var plusIcon = e.target; 
			var actionInnerTdOjb = $(plusIcon).parent().parent().parent();
			var tr = $(actionInnerTdOjb).parent();

			if(tr.find('label').text() != '')
				return false;
			
			if ($('span.actionInnerTd').length > 1){
				$(tr).remove();

				actionInnerTd.initLayout();
			}
		}
	}

	$(document).ready(function(){
		actionInnerTd.init();
	});
})(jQuery);