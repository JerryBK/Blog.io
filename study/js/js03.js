

window.onload = function(){
//零，主函数
	imgLocation("container","box");
	var imgData = {"data":[{"src":"01.jpg","title":"1"},{"src":"02.jpg","title":"2"},{"src":"03.jpg","title":"3"},{"src":"04.jpg","title":"4"},{"src":"05.jpg","title":"5"},{"src":"06.jpg","title":"6"},{"src":"07.jpg","title":"7"},{"src":"08.jpg","title":"8"},{"src":"09.jpg","title":"9"}]}
	
	// var imgData = {"data":[{"src":"01.jpg"}]}
		//加载新图片
	window.onscroll = function(){
		if (checkFlag()){
			var cparent = document.getElementById("container")
			for(var i = 0;i < imgData.data.length;i++){
				var ccontent = document.createElement("div");
				ccontent.className = "box";
				cparent.appendChild(ccontent);
				var boximg = document.createElement("div");
				boximg.className = "box_img";
				ccontent.appendChild(boximg);
				var img = document.createElement("img");
				img.src = "img/" + imgData.data[i].src;
				boximg.appendChild(img);
			}
		}
		imgLocation("container","box");
	}
}

// 四，校验是否需要加载新图片
function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight < scrollTop + pageHeight){
		return true;
	}

}


function imgLocation(parent,content){
//一,取出所有parent下的concent

	var cparent = document.getElementById(parent);
	console.log(cparent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth/imgWidth);
	cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";
    // alert(cparent.width);
	var BoxHeightArr=[];

	//最短列叠加函数
	for (var i = 0; i < ccontent.length;i++) {

		if (i<num) {
			BoxHeightArr[i] = ccontent[i].offsetHeight;

		}else{
			var minheight = Math.min.apply(null,BoxHeightArr);
			var minIndex = getMinHeightLocation(BoxHeightArr,minheight);
		//瀑布摆放函数
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minheight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			BoxHeightArr[minIndex] += ccontent[i].offsetHeight; 
		}
	}
}

function getMinHeightLocation(BoxHeightArr,minHeight){
//三，找最短的一列
	for (var i in BoxHeightArr){
		if(BoxHeightArr[i] == minHeight){
			return i;	
		}
	}
}




function getChildElement(parent,content){
//二，找所有子项并加入新数组

	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	// console.log(allcontent.length);
	for (var i = 0; i < allcontent.length; i++) {
		if (allcontent[i].className == content) {
			contentArr.push(allcontent[i]);
			// console.log(allcontent[i].className);
		}
		
	}
	return contentArr;
}



