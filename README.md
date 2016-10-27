#前端用法

##Loading
显示`showLoading();`，隐藏`hideLoading();`。

##全局Loading
显示`showGlobalLoading();`, 隐藏`hideGlobalLoading();`

##wizard
启动wizard，`$('#wizard').wizard()`。wizard行进到最后一步，需要对进行表单提交，关闭对话框等操作，对此提供了一个自定义事件***finish***, 使用方法`$('#wizard').bind('finish', function(){ ... });`。


##警告框  
调用`alertMsg()`用来弹出警告框，`alertMsg()`函数可以接收一个json对象作为参数，该参数对象有三个属性:  

+ title, 警告框的title。默认为“警告”。
+ msg， 警告框内部展示的信息。默认为“您输入的参数不合法”。
+ callbackFn， 点击警告框确定按钮相应的函数。默认为一个空参数
