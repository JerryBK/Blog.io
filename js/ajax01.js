$(document).ready(function(){
	// 配合htm碎片文件一起使用
	&("body").text("loading...");
	$("body"）.load("test.htm",function(a,b,c){
		if (b=="error") {
			$("body").text("失败")；
		}
	})；
	$.getScript("ajax02.js").complete(function(){
		out();
	});
});
