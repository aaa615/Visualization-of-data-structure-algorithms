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
//控制选择排序外层循环
var turn=0;
//控制选择排序内层循环
var currentStep=turn+1;
//当前最小的矩形
var minRect=turn;
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
    var svgDoc=document.getElementById("canvas_svg");

    //获取流程描述窗口
    var expressionField=document.getElementById("express_window_id");
    arrStr="数组初始值：";
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
function exchangePosition(front,after) {
    var pos1=getG_XY(oG[rectArray[front][1]]);
    var pos2=getG_XY(oG[rectArray[after][1]]);
    //console.log(pos1);
    //对调两个g标签的位置
    oG[rectArray[front][1]].setAttribute("transform","translate("+pos2.x+","+pos1.y+")");
    oG[rectArray[after][1]].setAttribute("transform","translate("+pos1.x+","+pos2.y+")");
    oG[rectArray[front][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");
    oG[rectArray[after][1]].setAttribute("style","transition:all "+(playSpeed/10)+"ms linear");

    //改变rectArray里的值
    var temp=rectArray[front];
    rectArray[front]=rectArray[after];
    rectArray[after]=temp;
}

//下一步
function nextStep() {
    //如果前一个矩形不为空，把上一步比较完的矩形还原
    if(previousRect!=-1&&previousRect!=turn){
        oRect[rectArray[previousRect][1]].setAttribute("style","fill:#5dfff6");
        oRect[rectArray[minRect][1]].setAttribute("style","fill:pink");
    }

    //外层循环
    if(turn<rectArray.length){
        oRect[rectArray[turn][1]].setAttribute("style","fill:pink");
        //内层循环
        if(currentStep<rectArray.length){
            oRect[rectArray[currentStep][1]].setAttribute("style","fill:yellowgreen");
            if(rectArray[currentStep][0]<rectArray[minRect][0]){
                if(minRect!=turn){
                    oRect[rectArray[minRect][1]].setAttribute("style","fill:#5dfff6");
                }
                minRect=currentStep;
            }
            previousRect=currentStep;
            currentStep++;
        }
        else{
            if(minRect!=turn){
                exchangePosition(turn,minRect);
                oRect[rectArray[turn][1]].setAttribute("style","fill:orange");
                oRect[rectArray[minRect][1]].setAttribute("style","fill:#5dfff6");
            }else{
                oRect[rectArray[minRect][1]].setAttribute("style","fill:orange");
            }

            arrStr+="\n第"+(turn+1)+"轮排序后：";
            for(var i=0;i<rectArray.length;++i){
                arrStr+=rectArray[i][0]+" ";
            }
            //获取流程描述窗口
            var expressionField=document.getElementById("express_window_id");
            expressionField.innerText=arrStr;

            previousRect=-1;
            turn++;
            currentStep=turn+1;
            minRect=turn;
        }
    }else{
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
    turn=0;
    currentStep=turn+1;
    minRect=turn;
    previousRect=-1;

    createGraph();
}

//删除矩形
function removerRect(){
    var svgDoc=document.getElementById("canvas_svg");
    var og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}

















