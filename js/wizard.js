(function($){
	$.fn.wizard = function(options){
		var wizard = this;

		options = options || {};
        wizard.$current = options.current || 0;
        wizard.hiddenSteps = options.hiddenSteps || [];

		wizard.onNextCallback = options.onNext || function(){return true;};
        wizard.onPrevCallback = options.onPrev || function(){return true;};

		var steps= $(wizard).find('div.wizardStep');
		wizard.$steps = steps;	
		wizard.$prev = $(wizard).find('button.wizardPrev');
		wizard.$next = $(wizard).find('button.wizardNext');


		var init = function(){
			wizard.$current	= 0;

            wizard.$prev.unbind('click');
            wizard.$next.unbind('click');
            wizard.$prev.bind('click', onPrev);
            wizard.$next.bind('click', onNext);

			initWizard();
		};

		var initWizard = function() {
            $.each(wizard.$steps, function(i, step){
                if(i == wizard.$current) {
                    if ($.inArray(i, wizard.hiddenSteps) >= 0) {
                        $(step).hide();
                        if(i == wizard.$current) {
                            wizard.$current ++;
                        }
                    } else {
                        $(step).show();
                    }
                }
                else
                    $(step).hide();
            });

            if(!hasPrev(wizard.$current))
                wizard.$prev.attr('disabled', true);
            else
                wizard.$prev.attr('disabled', false);

            if(!hasNext(wizard.$current))
                wizard.$next.text('完成');
            else{
                wizard.$next.text('下一步');
                wizard.$next.attr('disabled', false);
            }

            var progress = Math.round((wizard.$current + 1)*100/wizard.$steps.length) + '%';
            $(wizard).find('div.wizardProgress').css('width', progress);
		};

		wizard.finish = function(){
			wizard.trigger('finish', null, this);	
		};

		var hasPrev = function(index){
            var exists = false;
            for(var i = 0; i < index; i ++) {
                if ($.inArray(i, wizard.hiddenSteps) < 0) {
                    exists = true;
                    break;
                }
            }
            return exists;
		};

        var hasNext = function(index){
            var exists = false;
            for(var i = index; i < wizard.$steps.length; i ++) {
                if ($.inArray(i, wizard.hiddenSteps) < 0) {
                    exists = true;
                    break;
                }
            }
            return exists;
        };

		var onPrev = function(e){
            if(false == wizard.onPrevCallback())
                return false;

			if(wizard.$current > 0)
				wizard.$current --;

			initWizard();
		};

		var onNext = function(e){
			if(false == wizard.onNextCallback())
				return false;
			
			if(wizard.$current < (wizard.$steps.length - 1)){
				wizard.$current ++;
				initWizard();
			}else if(wizard.$current == (wizard.$steps.length - 1)){
				wizard.finish();
			}
		};



		init();
	}

})(jQuery);