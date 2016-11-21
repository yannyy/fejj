(function($){
    $.fn.scrollList = function(options){
    	var widget = this;
        options = options || {};
        var scroll = {
            size: 0,
            currentStep: 0,
            displayList: [],
            previous:null,
            next:null,
            anchorList: []
        };

    	var init = function(){
            var ul  = $(widget).find('ul.mainTab');
            var ulWidth = parseInt($(ul).css('width'));
            var displaySize = parseInt(ulWidth/120);
            if(displaySize <= 5)
                displaySize --;
            scroll.displaySize = displaySize;

            var lst = $(widget).find('li'); 
            scroll.size = lst.length;

            var anchorList = [];
            $.each(lst, function(i, item){
                anchorList.push($(item).attr('data-anchor'));
            });
            scroll.anchorList = anchorList;

            var previous = $(widget).find('a.previous');
            scroll.previous = previous;
            var next = $(widget).find('a.next');
            scroll.next = next;
            $(previous).on('click', onPrevious);
            $(next).on('click', onNext);

            initContent();
    	};

        var onPrevious = function(){
            if(scroll.currentStep > 0){
                scroll.currentStep --;
                initContent();
            }
        }
        var onNext = function(){
            if((scroll.currentStep + scroll.displaySize)< scroll.anchorList.length){
                scroll.currentStep ++;
                initContent();
            }
        }
    	var initContent = function(target){
            if(scroll.anchorList.length < scroll.displaySize){
                $(scroll.previous).addClass('disabled');
                $(scroll.next).addClass('disabled');   
            }
            else if (scroll.currentStep == 0) {
                $(scroll.previous).addClass('disabled');
                $(scroll.next).removeClass('disabled');   
            }else if(scroll.currentStep == (scroll.anchorList.length - scroll.displaySize)){
                $(scroll.previous).removeClass('disabled');
                $(scroll.next).addClass('disabled');   
            }else{
                $(scroll.previous).removeClass('disabled');
                $(scroll.next).removeClass('disabled');   
            }
            var displayList = [];   
            for(var i = 0; i < scroll.displaySize; i ++){
                displayList.push(i + scroll.currentStep + 1);        
            }
            scroll.displayList = displayList;
            initSteps();
    	};

        var initSteps = function(){
            var list = $(widget).find('li');
            $.each(list, function(j, li){
                var anchor = $(li).attr('data-anchor');

                var exists = false; 
                $.each(scroll.displayList, function(i, id){
                    if(parseInt(id) == parseInt(anchor))
                        exists = true;
                }); 

                if(exists)
                    $(li).show();
                else
                    $(li).hide();
            });
        }

    	init();

        widget.resize = init;
        return widget;
    };
})(jQuery);
