(function($){
	$.fn.assignment = function(){
		var widget = this;

		var assignment = {
			data:[],
			init:function(){
				$(widget).find('div.ms-button').find('a').on('click', assignment.add);
			},
			add:function(){
				var src  = $(widget).find('select.src').val();;
				var dest = $(widget).find('select.dest').val();;

				var exists = false;
				$.each(assignment.data, function(i, obj){
					if(obj.src == src && obj.dest == dest)
						exists = true;
				});

				if(exists)
					return false;

				var $list = $(widget).find('div.ms-list').find('ul');

				var li = $('<li></li>')
				var srcLabel  = $('<label style="width:auto" class="src"></label>')	
				srcLabel.text(src);

				var destLabel = $('<label style="width:auto" class="dest"></label>')	
				destLabel.text(dest);

				var icon = $('<i class="fa fa-long-arrow-right"></i>');

				var span = $('<span class="actionInnerTd"></span>');
				var link = $('<a></a>');
				var iconMinus = $('<i class="zmdi zmdi-minus-circle" ></i>');
				link.append(iconMinus);
				iconMinus.on('click', assignment.remove);
				span.append(link);

				li.append(srcLabel);
				li.append(icon);
				li.append(destLabel);
				li.append(span);
				$list.append(li);	
				assignment.data.push({src:src, dest:dest});
			},
			remove: function(e){
				if(e.target.tagName != 'I')
					return false;

				var target = e.target;
				var li = $(target).parent().parent().parent();

				var src  = $(li).find('label.src').text();
				var dest = $(li).find('label.dest').text();

				$.each(assignment.data, function(i, obj){
					if(obj.src == src && obj.dest == dest){
						var data = assignment.data;
						data = data.slice(0,i).concat(data.slice(i+1,data.length));
						assignment.data = data;
					}
				});
				li.remove();
			}

		}

		assignment.init();
		return assignment;
	}

})(jQuery);