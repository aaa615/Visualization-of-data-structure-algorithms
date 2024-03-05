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
//计时器
var timer=[];
//增量
var dk=5;
//控制无序矩形
var turn=dk;
//控制有序列表的矩形
var currentStep=turn-dk;
//是否要换位置
var flag=false;
//前一个矩形
var previousRect=-1;
//移动位置的矩形
var mfront,mafter;
//记录每一轮数组细节
var arrStr="";


//全局变量，获取g和rect标签
var oG=document.getElementsByClassName("svg_g");
var oRect=document.getElementsByClassName("g_rect");

//获取playSpeed
function getPlaySpeed(){
    var oSelect=document.getElementsByClassName("playSpeed_class");
    playSpeed=1200*(1/oSelect[0].value);
    // console.log(playSpeed);
}

//随机生成rect
function createRect() {
    //获取动画窗口
    var svgDoc=document.getElementById("canvas_svg");
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
        var rowArray=[h/3,i];
        rectArray[i]=rowArray;

        //下一个矩形的初始位置
        gX += w + space;
        arrStr+=h/3+" ";
    }
    //在流程控制窗口中输出初始数组
    expressionField.innerText=arrStr;
}

//加载生成动画舞台
function load(){
    //获取svg
    var svgDoc=document.getElementById("canvas_svg");
    createRect(svgDoc);
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

function exchangePosition(front,after) {
    let pos1=getG_XY(oG[rectArray[front][1]]);
    let pos2=getG_XY(oG[rectArray[after][1]]);
    oG[rectArray[after][1]].setAttribute("transform","translate("+pos1.x+",10)");
    oG[rectArray[after][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
    oG[rectArray[front][1]].setAttribute("transform","translate("+pos2.x+","+pos1.y+")");
    oG[rectArray[front][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");

    //改变rectArray里的值
    let temp=rectArray[front];
    rectArray[front]=rectArray[after];
    rectArray[after]=temp;
    // console.log(rectArray);
}

function nextStep(){
    if(flag){
        if(mfront>=0 && rectArray[mfront][0]>rectArray[mafter][0]) {
            exchangePosition(mfront,mafter);
            mfront-=dk;
            mafter-=dk;
        }else{
            let h=parseInt(oG[rectArray[mafter][1]].getAttribute("height"));
            oG[rectArray[mafter][1]].setAttribute("transform","translate("+getG_XY(oG[rectArray[mafter][1]]).x+","+(maxH-h)+")");
            oG[rectArray[mafter][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
            oRect[rectArray[turn][1]].setAttribute("style","fill:#6dfff5");
            oRect[rectArray[mafter][1]].setAttribute("style","fill:#6dfff5");

            turn++;
            currentStep=turn-dk;
            flag=false;
        }
    }
    else if(turn<rectArray.length){
        //先将前一个矩形还原原色
        if(previousRect>-1){
            oRect[rectArray[previousRect][1]].setAttribute("style","fill:#6dfff5");
            oRect[rectArray[previousRect+dk][1]].setAttribute("style","fill:#6dfff5");
        }
        //被比较的矩形变色
        oRect[rectArray[turn][1]].setAttribute("style","fill:greenyellow");
        //正在比较的矩形变色
        oRect[rectArray[currentStep][1]].setAttribute("style","fill:greenyellow");

        //如果被比较的矩形小于正在比较的矩形，插入
        if(rectArray[turn][0]<rectArray[currentStep][0]){
            flag=true;
            mfront=turn-dk;
            mafter=turn;
            oG[rectArray[turn][1]].setAttribute("transform","translate("+getG_XY(oG[rectArray[turn][1]]).x+",10)");
            oG[rectArray[turn][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
        }else{
            previousRect=currentStep;
            turn++;
            currentStep=turn-dk;
        }

    }else{
    	if(previousRect!=-1){
    		oRect[rectArray[previousRect][1]].setAttribute("style","fill:#6dfff5");
            oRect[rectArray[previousRect+dk][1]].setAttribute("style","fill:#6dfff5");
    	}
        
        arrStr+="\n增量为"+(dk)+"时的排序结果：";
        for(let i=0;i<rectArray.length;++i){
            arrStr+=rectArray[i][0]+" ";
        }
        //获取流程描述窗口
        var expressionField=document.getElementById("express_window_id");
        expressionField.innerText=arrStr;


        dk=Math.floor(dk/2);
        if(dk<=0){
            return true;
        }
        turn=dk;
        currentStep=turn-dk;
        flag=false;
    }
    return false;
}

//自动播放
function autoPlay() {
    timer[0]=setInterval(function () {
        let isOver=nextStep();
        if(isOver){
            clearInterval(timer[0]);
        }
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
    for(let i=0;i<rectArray.length;++i){
        removerRect();
    }

    //初始化相关变量
    for(let i=0;i<rectArray.length;i++){
        rectArray.shift();
    }
    gX=25;
    dk=5;
    turn=dk;
    currentStep=turn-dk;
    
    previousRect=-1;

    createRect();
}

//删除矩形
function removerRect(){
    let svgDoc=document.getElementById("canvas_svg");
    let og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}