(function($){
	$.fn.info = function(){
		var obj = this;
		var info = {
			obj:null,
			init: function(obj){
				info.obj = obj;
				info.initEventListener();

				$(info.obj).find('div.detailSummary').hide();
			},
			initEventListener: function(){
				$(info.obj).find('div.actionBar').find('a.textlink').on('click', info.toggleInfo)
				$(info.obj).find('div.actionBar').find('i, span').on('click', function(e){
					e.stopPropagation();
					$(e.target).parent().trigger('click');
				})
			},
			toggleInfo: function(e){
				if (e.target.tagName != 'a' && e.target.tagName != 'A')	
					return false;

				if($(e.target).hasClass('open')){
					/**详情打开**/
					$(e.target).removeClass('open');
					$(info.obj).find('div.detailSummary').show();
				}
				else{
					/**详情关闭**/
					$(e.target).addClass('open');
					$(info.obj).find('div.detailSummary').hide();
				}
			}
		};

		info.init(obj);
	}
})(jQuery);