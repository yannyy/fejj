(function($){
	$.fn.wizard = function(options){
		var wizard = this;
		var steps= $(wizard).find('div.wizardStep');
		wizard.$steps = steps;	
		wizard.$current = 0;
		wizard.$prev = $(wizard).find('button.wizardPrev');
		wizard.$next = $(wizard).find('button.wizardNext');
		if(options != null && options.onNext != null)
			wizard.onNextCallback = options.onNext;


		var init = function(){
			$.each(wizard.$steps, function(i, step){
				if(i == wizard.$current)
					$(step).show();
				else
					$(step).hide();
			})

			if(wizard.$current == 0)
				wizard.$prev.attr('disabled', true);
			else
				wizard.$prev.attr('disabled', false);

			if(wizard.$current == (wizard.$steps.length - 1))
				wizard.$next.text('完成');
			else{
				wizard.$next.text('下一步');
				wizard.$next.attr('disabled', false);
			}

			var progress = Math.round((wizard.$current + 1)*100/wizard.$steps.length) + '%';
			$(wizard).find('div.wizardProgress').css('width', progress);
		}

		wizard.finish = function(){
			wizard.trigger('finish', null, this);	
		}

		var onPrev = function(e){
			if(wizard.$current > 0)
				wizard.$current --;

			init();
		}

		var onNext = function(e){
			wizard.onNextCallback();
			if(wizard.$current < (wizard.$steps.length - 1)){
				wizard.$current ++;
				init();
			}else if(wizard.$current == (wizard.$steps.length - 1)){
				wizard.finish();
			}
		}

		wizard.$prev.bind('click', onPrev);
		wizard.$next.bind('click', onNext);

		init();
	}

})(jQuery);