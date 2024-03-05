var liList=document.getElementsByClassName("main-menu-li");
for(var i=0;i<liList.length;++i){
    liList[i].onmouseover=function () {
        var ulElement=this.children[1];
        var h=this.getElementsByTagName("li").length;
        ulElement.style.display="block";
        this.style.height=30*(h+1)+10+"px";
    }
    liList[i].onmouseout=function () {
        var ulElement=this.children[1];
        ulElement.style.display="none";
        this.style.height="60px";
    }
}

function t_hidden(){
	var trip_div=document.getElementById("search-drops");
	trip_div.style.display="none";
	console.log("t_hidden");
}

function t_show(){
	var trip_div=document.getElementById("search-drops");
	trip_div.style.display="none";
	console.log("t_show");
}



