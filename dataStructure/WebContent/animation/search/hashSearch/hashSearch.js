/**
 * 
 */
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
//矩形数值
var rectArray=[];
//记录每一轮数组细节
var arrStr="";
//计时器
var timer=[];
//
var currentStep=0;
//前一个矩形
var previousRect=-1;
//
var m=11;


//全局变量，获取g和rect标签
var txt=document.getElementsByClassName("player_text");
var oRect=document.getElementsByClassName("g_rect");
//获取playSpeed
function getPlaySpeed(){
    var oSelect=document.getElementsByClassName("playSpeed_class");
    playSpeed=1200*(1/oSelect[0].value);
    console.log(playSpeed);
}

function getM(){
    var oSelect=document.getElementsByClassName("playSpeed_class");
    m=oSelect[1].value;
    console.log(m);
}

//分步生成散列表
function nextStep(){
    if(previousRect!=-1){
        oRect[previousRect].setAttribute("style","fill:#6dfff5");
    }

    if(currentStep<10){
        oRect[currentStep].setAttribute("style","fill:greenyellow");
        previousRect=currentStep;

        let hash_tr=document.getElementById("hash_table").getElementsByTagName("tr");

        let index=rectArray[currentStep]%m;

        //记录查找细节
        var expressionField=document.getElementById("express_window_id");
        arrStr+="\n"+rectArray[currentStep]+" % "+m+" = "+index;


        console.log(index);

        // console.log("inner:"+hash_tr[1].getElementsByTagName("td")[index].innerText);
        //查找次数
        let count=1;
        if(hash_tr[1].getElementsByTagName("td")[index].innerText==""){
            hash_tr[1].getElementsByTagName("td")[index].innerText=rectArray[currentStep];
            hash_tr[2].getElementsByTagName("td")[index].innerText=count;
        }else{
            let i=index;
            while(hash_tr[1].getElementsByTagName("td")[i].innerText!=""){
                i=(i+1)%16;
                arrStr+="地址冲突，加一："+i+";";
                count++;
            }
            // console.log("i"+i);
            hash_tr[1].getElementsByTagName("td")[i].innerText=rectArray[currentStep];
            hash_tr[2].getElementsByTagName("td")[i].innerText=count;
        }
        expressionField.innerText=arrStr;
        currentStep++;
        return false;
    }else{
        return true;
    }

}

//生成散列表
function createHashTable(){
    timer[0]=setInterval(function () {
        if(nextStep()){
            clearInterval(timer[0]);
        }
    },playSpeed*2);
}

//随机生成有序的rect
function createRect() {
    var svgDoc=document.getElementById("canvas_svg");
    //获取流程描述窗口
    var expressionField=document.getElementById("express_window_id");
    arrStr="数组初始值：";

    //随机生成10个矩形的高（1~100）
    for (var i = 0; i < 10; ++i) {
        rectArray[i] = Math.ceil(Math.random() * 100) + 1;
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

        arrStr+=h/3+" ";
    }
    expressionField.innerText=arrStr;
}


//查找
function search() {
    let search_num=parseInt(document.getElementById("search_num").value);
    let hash_tr=document.getElementById("hash_table").getElementsByTagName("tr");

    let address=search_num%m;

    console.log(parseInt(hash_tr[1].getElementsByTagName("td")[address].innerText));

    if(parseInt(hash_tr[1].getElementsByTagName("td")[address].innerText)==search_num){
        document.getElementById("Search_result").value="查找成功！";
        return true;
    }else{
        let i=(address+1)%16;
        while(i!=address){
            if(parseInt(hash_tr[1].getElementsByTagName("td")[address].innerText)==search_num){
                document.getElementById("Search_result").value="查找成功！";
                return true;
            }else{
                i=(i+1)%16;
            }
        }
    }
    document.getElementById("Search_result").value="查找失败！";
    return false;

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
    load();
}

//删除矩形
function removerRect(){
    var svgDoc=document.getElementById("canvas_svg");
    var og=svgDoc.firstChild;
    svgDoc.removeChild(og);
}