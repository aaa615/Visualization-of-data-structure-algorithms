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
//二维数组，记录折半查找间步骤
var stepArray=[];
//矩形数值
var rectArray=[];
//记录每一轮数组细节
var arrStr="";
//计时器
var timer=[];
//折半排序下标
var from,middle,to;
var frontFrom=-1,frontTo,frontMiddle;
//查找次数
var count=1;

//全局变量，获取g和rect标签
var txt=document.getElementsByClassName("player_text");
var oG=document.getElementsByClassName("svg_g");
var oRect=document.getElementsByClassName("g_rect");

//获取playSpeed
function getPlaySpeed(){
    var oSelect=document.getElementsByClassName("playSpeed_class");
    playSpeed=1200*(1/oSelect[0].value);
    console.log(playSpeed);
}


//随机生成有序的rect
function createGraph() {
    var svgDoc=document.getElementById("canvas_svg");

    //获取流程描述窗口
    var expressionField=document.getElementById("express_window_id");
    arrStr="数组初始值：";

    //随机生成10个矩形的高（1~100）
    for (var i = 0; i < 10; ++i) {
        rectArray[i] = Math.ceil(Math.random() * 100) + 1;
    }

    //矩形按高从小到大排序
    rectArray.sort(function (a, b) { return a-b; } );

    for(var i=0;i<10;++i){
        var h=rectArray[i]*3;
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
        var oTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        oTxt.setAttribute("width", w + "px");
        oTxt.setAttribute("x", (w / 2) + "px");
        oTxt.setAttribute("y", h + "px");
        oTxt.setAttribute("dy", "-5px");
        oTxt.setAttribute("fill", "black");
        oTxt.textContent = h/3 + "";
        og.appendChild(oTxt);

        //下一个矩形的初始位置
        gX += w + space;

        //赋初值
        from=0;
        to=rectArray.length-1;
        middle=Math.floor((from+to)/2);

        arrStr+=h/3+" ";
    }
    expressionField.innerText=arrStr;
}

//下一步
function nextStep() {
    //要查找的值
    var searchNum=txt[0].value;
    if(from<=to){
        //把前一步的矩形还原原色
        if(frontFrom!=-1){
            oRect[frontFrom].setAttribute("style","fill:#6dfff5");
            oRect[frontTo].setAttribute("style","fill:#6dfff5");
            oRect[frontMiddle].setAttribute("style","fill:#6dfff5");
        }
        //记录当前
        frontFrom=from;
        frontTo=to;
        frontMiddle=middle;

        //两端变绿
        oRect[from].setAttribute("style","fill:greenyellow");
        oRect[to].setAttribute("style","fill:greenyellow");

        //记录查找细节
        var expressionField=document.getElementById("express_window_id");
        arrStr+="\n第"+count+"次查找：   "+"from:"+from+" to:"+to+" middle:"+middle;
        expressionField.innerText=arrStr;
        count++;

        timer[1]=setTimeout(function () {
            //中间变红
            oRect[middle].setAttribute("style","fill:pink");
            if(searchNum<rectArray[middle]){
                to=middle-1;
                middle=Math.floor((from+to)/2);
            }
            else if(searchNum>rectArray[middle]){
                from=middle+1;
                middle=Math.floor((from+to)/2);
            }
            else{
                //找到变橙
                oRect[middle].setAttribute("style","fill:orange");
                txt[1].value="查找成功！";
                clearInterval(timer[0]);
            }
        },playSpeed);
    }
    else{
        txt[1].value="没找到！";
        clearInterval(timer[0]);
    }

}

//自动播放
function autoPlay() {
    timer[0]=setInterval(function () {
        nextStep();
    },playSpeed*2);
}

//暂停
function pause() {
    clearInterval(timer[0]);
    clearTimeout(timer[1]);
}

//重置
function reset() {
    pause();

    //删除矩形
    for(var i=0;i<rectArray.length;++i){
        removerRect();
    }
    //初始化相关变量
    for(var i=0;i<rectArray.length;++i){
        rectArray[i]=0;
    }
    gX=25;
    frontFrom=-1;
    txt[0].value="";
    txt[1].value="";
    count=1;
    //重新加载
    createGraph();
}

//删除矩形
function removerRect(){
    var svgDoc=document.getElementById("canvas_svg");
    var og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}