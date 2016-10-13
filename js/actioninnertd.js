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

			var inputNum = $(tr).find("input.form-control").length;

			var newTr = $('<tr></tr>');
			newTr.append('<td><label></label></td>');

			var actionTd = $('<td></td>');
			for(var i = 0; i < inputNum; i ++){
				actionTd.append('<input type="text" class="form-control">');
			}
			actionTd.append('<span class="actionInnerTd"><a><i class="zmdi zmdi-plus-circle"></i></a><a><i class="zmdi zmdi-minus-circle"></i></a></span>');
			newTr.append(actionTd);

			tr.after(newTr);

			actionInnerTd.initLayout();
		},
		minus: function(e){
			if ($('span.actionInnerTd').length > 1){
				var plusIcon = e.target; 
				var actionInnerTdOjb = $(plusIcon).parent().parent().parent();
				var tr = $(actionInnerTdOjb).parent();

				$(tr).remove();

				actionInnerTd.initLayout();
			}
		}
	}

	$(document).ready(function(){
		actionInnerTd.init();
	});
})(jQuery);