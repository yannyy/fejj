#前端用法

##Loading
显示`showLoading();`，隐藏`hideLoading();`。

##全局Loading
显示`showGlobalLoading();`, 隐藏`hideGlobalLoading();`

##wizard
启动wizard，`$('#wizard').wizard()`。wizard行进到最后一步，需要对进行表单提交，关闭对话框等操作，对此提供了一个自定义事件***finish***, 使用方法`$('#wizard').bind('finish', function(){ ... });`

