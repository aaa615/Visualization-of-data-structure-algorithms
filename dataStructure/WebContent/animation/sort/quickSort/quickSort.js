//舞台的高
var maxH=450;
//矩形的宽
var w = 45;
//矩形间隔
var space = 5;
//g标签的初始x坐标
var gX = 25;
//播放速度
var playSpeed=1200;
//二维数组，记录矩形的高和下标
var rectArray=[];
var arr=[];
//计时器
var timer=[];
//控制冒泡排序内层循环
var low=0;
var high=9;
//枢轴
var pivotkey;
//前一个矩形
var previousRect=-1;
//记录每一轮数组细节
var arrStr="";
//
var flag1=false;
var flag2=false;
//
var stack=[];
var turn=0;

//全局变量，获取g和rect标签
var oG=document.getElementsByClassName("svg_g");
var oRect=document.getElementsByClassName("g_rect");

//获取playSpeed
function getPlaySpeed(){
    var oSelect=document.getElementsByClassName("playSpeed_class");
    playSpeed=1200*(1/oSelect[0].value);
    console.log(playSpeed);
}

//随机生成rect
function createRect(svgDoc) {
    
    //获取流程描述窗口
    var expressionField=document.getElementById("express_window_id");
    arrStr="初始数组：";

    for (var i = 0; i < 10; ++i) {
        //随机生成矩形的高（1~100）
        var h = (Math.ceil(Math.random() * 100)+1)*3;

        //生成g标签
        var og=document.createElementNS("http://www.w3.org/2000/svg", "g");
        og.setAttribute("transform", "translate(" + gX + "," + (maxH - h) + ")");
        og.setAttribute("height", h + "px");
        og.setAttribute("class","svg_g");

        svgDoc.appendChild(og);

        //生成矩形
        var orect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        orect.setAttribute("width", w + "px");
        orect.setAttribute("height", h + "px");
        orect.setAttribute("fill", "#6dfff5");
        orect.setAttribute("class", "g_rect");
        og.appendChild(orect);

        //生成text
        var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("width", w + "px");
        txt.setAttribute("x", (w / 2) + "px");
        txt.setAttribute("y", h + "px");
        txt.setAttribute("dy", "-5px");
        txt.setAttribute("fill", "black");
        txt.textContent = h/3 + "";
        og.appendChild(txt);

        //生成矩形数组
        var rowArray=[h/3,i,false];
        rectArray[i]=rowArray;
        arr[i]=h/3;

        //下一个矩形的初始位置
        gX += w + space;
        arrStr+=h/3+" ";
    }
    //在流程控制窗口中输出初始数组
    expressionField.innerText=arrStr;

    //枢轴初始值
    pivotkey=rectArray[0];
}

//加载生成动画舞台
function load(){
	//获取动画窗口
    var svgDoc=document.getElementById("canvas_svg");
    createRect(svgDoc);

    g_qSort(0,9);
    // console.log(stack);
    stack.shift();
}

//获取g标签的x和y
function getG_XY(g){
    var str=getComputedStyle(g).transform;
    var pos={
        x:str.split(",")[4],
        y:str.substr(0,str.length-1).split(",")[5]
    }
    //console.log(pos.x+" "+pos.y);
    return pos;
}

//交换位置
function exchangePosition(from,to) {
    let x=parseInt(getG_XY(oG[rectArray[from][1]]).x)+(to-from)*(w+space);
    let y=getG_XY(oG[rectArray[from][1]]).y;
    oG[rectArray[from][1]].setAttribute("transform","translate("+x+","+y+")");
    oG[rectArray[from][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");

    let temp=rectArray[from];
    rectArray[from]=rectArray[to];
    rectArray[to]=temp;

    // console.log(rectArray);
}

//快速排序算法
function g_partition(l,h){
    let p=arr[l];
    // console.log(p);
    while(l<h){
        while(l<h && arr[h]>=p){
            h--;
        }
        arr[l]=arr[h];
        while(l<h && arr[l]<=p){
            l++;
        }
        arr[h]=arr[l];
    }
    arr[l]=p;
    // console.log(arr);
    return l;
}

function g_qSort(l,h){
    if(l<=h){
        stack.push({from:l,to:h});
        if(l<h){
            let p=g_partition(l,h);
            g_qSort(l,p-1);
            g_qSort(p+1,h);
        }

    }
}

//
function partition(){
    if(previousRect>-1 && rectArray[previousRect][2]==false){
        oRect[rectArray[previousRect][1]].setAttribute("style","fill:#6dfff5");
    }

    if(low<high){
        oG[pivotkey[1]].setAttribute("transform","translate(-50,10)");
        oG[pivotkey[1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
        oRect[pivotkey[1]].setAttribute("style","fill:pink");
        oRect[rectArray[low][1]].setAttribute("style","fill:greenyellow");
        oRect[rectArray[high][1]].setAttribute("style","fill:greenyellow");
        flag2=true;
        if(flag1==false){
            if(rectArray[high][0]<pivotkey[0]){
                exchangePosition(high,low);
                previousRect=low;
                low++;
                flag1=true;
            }else{
                previousRect=high;
                high--;
            }
        }else{
            if(rectArray[low][0]>pivotkey[0]){
                exchangePosition(low,high);
                previousRect=high;
                high--;
                flag1=false;
            }else{
                previousRect=low;
                low++;
            }
        }
        return false;
    }else { //排序完一轮
    
    	arrStr+="\n第"+(turn+1)+"轮排序后：";
        for(var i=0;i<rectArray.length;++i){
            arrStr+=rectArray[i][0]+" ";
        }
        turn++;
        //获取流程描述窗口
        var expressionField=document.getElementById("express_window_id");
        expressionField.innerText=arrStr;
    	
        console.log("par "+low+" "+high);
        if(flag2){
            let x=parseInt(getG_XY(oG[pivotkey[1]]).x)+low*(w+space)+75;
            let y=maxH-parseInt(oG[pivotkey[1]].getAttribute("height"));
            console.log("x:"+x+" X:"+getG_XY(oG[pivotkey[1]]).x);
            oG[pivotkey[1]].setAttribute("transform","translate("+x+","+y+")");
            oG[pivotkey[1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
        }
        oRect[pivotkey[1]].setAttribute("style","fill:orange");
        flag1=false;
        flag2=false;
        rectArray[low][2]=true;
        return true;
        }
}

//下一步
function nextStep(){
    if(partition()){
        console.log(stack.length);
        if(stack.length==0){
            pause();
        }
        let t=stack.shift();
        low=t.from;
        high=t.to;
        pivotkey=rectArray[low];
        console.log(low+ " "+high);
        return true;
    }
}

//自动播放
function autoPlay() {
    timer[0]=setInterval(function () {
        nextStep();
    },playSpeed);
}

//暂停
function pause() {
    clearInterval(timer[0]);
}

//重置
function reset() {
    pause();

    //删除矩形
    for(var i=0;i<rectArray.length;++i){
        removerRect();
    }

    //初始化相关变量
    for(let i=0;i<rectArray.length;i++){
        rectArray.shift();
        if(stack.length!=0){
            stack.shift();
        }
    }
    gX=25;
    low=0;
    high=9;
    flag1=false;
    flag2=false;
    previousRect=-1;

    createRect();
    g_qSort(0,9);
    stack.shift();
}

//删除矩形
function removerRect(){
    var svgDoc=document.getElementById("canvas_svg");
    var og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}

