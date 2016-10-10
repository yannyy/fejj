(function($){
	
	$.fn.wizard = function(){
		var wizard = this;
		var steps= $(wizard).find('div.wizardStep');
		wizard.$steps = steps;	
		wizard.$current = 0;
		wizard.$prev = $(wizard).find('button.wizardPrev');
		wizard.$next = $(wizard).find('button.wizardNext');


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
				wizard.$next.attr('disabled', true);
			else
				wizard.$next.attr('disabled', false);
		}

		var onPrev = function(e){
			if(wizard.$current > 0)
				wizard.$current --;

			init();
		}

		var onNext = function(e){
			if(wizard.$current < (wizard.$steps.length - 1))
				wizard.$current ++;

			init();
		}

		wizard.$prev.bind('click', onPrev);
		wizard.$next.bind('click', onNext);

		init();
	}

})(jQuery);