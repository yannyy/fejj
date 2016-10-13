(function($){
	var actionInnerTd = {
		label: '',
		init: function(){
			actionInnerTd.initLayout();
			
			var trfirst = $('tr.actionInnerTr')[0];
			actionInnerTd.label = $(trfirst).find('label').text();
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

			actionInnerTd.makeLabel();

			actionInnerTd.initLayout();
		},
		makeLabel: function(){
			var trfirst = $('tr.actionInnerTr')[0];
			$(trfirst).find('label').text(actionInnerTd.label);
		},
		minus: function(e){
			var plusIcon = e.target; 
			var actionInnerTdOjb = $(plusIcon).parent().parent().parent();
			var tr = $(actionInnerTdOjb).parent();

			if ($('span.actionInnerTd').length > 1){
				$(tr).remove();

				actionInnerTd.initLayout();
			}

			actionInnerTd.makeLabel();
		}
	}

	$(document).ready(function(){
		actionInnerTd.init();
	});
})(jQuery);