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
//定时器
var timer=[];
//控制冒泡排序内层循环
var currentStep=0;
//控制冒泡排序外层循环
var turn=0;
//前一个矩形
var previousRect=-1;
//记录每一轮数组细节
var arrStr="";

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
function createGraph() {
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
    expressionField.innerText=arrStr;
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
function exchangePosition(currentStep,front,after) {
    var pos1=getG_XY(oG[front]);
    var pos2=getG_XY(oG[after]);
    //console.log(pos1);
    //对调两个g标签的位置
    oG[front].setAttribute("transform","translate("+pos2.x+","+pos1.y+")");
    oG[after].setAttribute("transform","translate("+pos1.x+","+pos2.y+")");
    oG[front].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
    oG[after].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");

    //改变rectArray里的值
    var temp=rectArray[currentStep];
    rectArray[currentStep]=rectArray[currentStep+1];
    rectArray[currentStep+1]=temp;
}

//播放下一步
function nextStep() {
        if(turn<rectArray.length){
            if(currentStep<rectArray.length-turn-1){
                if(previousRect>-1){
                    oRect[previousRect].setAttribute("style","fill:#6dfff5");
                }
                //改变正在排序的矩形的颜色
                oRect[rectArray[currentStep][1]].setAttribute("style","fill:greenyellow");
                oRect[rectArray[currentStep+1][1]].setAttribute("style","fill:greenyellow");
                //比较相邻两个数大小
                //如果需要交换位置
                if(rectArray[currentStep][0]>rectArray[currentStep+1][0]){
                    exchangePosition(currentStep,rectArray[currentStep][1],rectArray[currentStep+1][1]);
                }
                previousRect=rectArray[currentStep][1];

                currentStep++;
            }
            else{
                arrStr+="\n第"+(turn+1)+"轮排序后：";
                for(var i=0;i<rectArray.length;++i){
                    arrStr+=rectArray[i][0]+" ";
                }
                //获取流程描述窗口
                var expressionField=document.getElementById("express_window_id");
                expressionField.innerText=arrStr;

                //排完序的矩形变色
                oRect[rectArray[currentStep][1]].setAttribute("style","fill:orange");
                currentStep=0;
                turn++;
            }
        }
        else{
            return true;
        }
        return false;
}

//自动播放
function autoPlay() {
    timer[0]=setInterval(function () {
        var isOver=nextStep();
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
    for(var i=0;i<rectArray.length;++i){
        removerRect();
    }

    //初始化相关变量
    for(var i=0;i<rectArray.length;i++){
        rectArray.shift();
    }
    gX=25;
    currentStep=0;
    turn=0;
    previousRect=-1;

    createGraph();
}

//删除矩形
function removerRect(){
    var svgDoc=document.getElementById("canvas_svg");
    var og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}













