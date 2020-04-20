var colours = ["red","blue","green","white","orange"];
var results = [
    {
        "name": "Lukas",
        "time": 12.9
    },
    {
        "name": "Eva",
        "time": 2.5
    },
    {
        "name": "David",
        "time": 1.5
    }
];
var tabRowNum = 3;
var tabColNum = 3;
var startTime;
var intervalId;
var elapsedTime;
//
function startTimer() {
    startTime = Date.now();
    intervalId = setInterval(function() {
                                elapsedTime = Date.now() - startTime;
                                document.getElementById('timer').innerHTML = (elapsedTime / 1000).toFixed(1);
                                }, 100);
}
//
function stopTimer() {
    clearInterval(intervalId);
    startTime = undefined;
}
//
function initFieldsDyn(rows, cols){
    var vDiv;
    var vTable;
    var vTr;
    var vTd;

    if (!rows){
        rows = tabRowNum;
    }else{
        tabRowNum = rows;
    }
    
    if (!cols){
        cols = tabColNum;
    }else{
        tabColNum = cols;
    }

    vDiv = document.getElementById("divGame");
    if(vDiv){
        vDiv.remove();
    }

    vDiv = document.createElement("div");
    vDiv.setAttribute("id", "divGame");
    vDiv.setAttribute("align", "center");
    //document.body.appendChild(vDiv);
    document.getElementById("game").appendChild(vDiv);
    vTable = document.createElement("table");
    vTable.setAttribute("id", "tabGame");
    vTable.setAttribute("onmousedown", "changeColour(event)");
    document.getElementById("divGame").appendChild(vTable);
    for(i = 1; i <= rows; i++){  
        vTr = document.createElement("tr");
        vTr.setAttribute("id", "row"+i);
        document.getElementById("tabGame").appendChild(vTr);
        for(j = 1; j <= cols; j++){
            vTd = document.createElement("td");
            vTd.setAttribute("id", "row"+i+"col"+j);
            vTd.setAttribute("style", "cursor: pointer;");
            vTd.style.background = colours[(i+j+Math.round(Math.random()*10,2))%colours.length];
            document.getElementById("row"+i).appendChild(vTd);
        }
    }
    stopTimer();
}
//
function changeColour(e) {
    //get and set next colour - START
    if(!startTime){
        startTimer();
    }
    //alert(document.getElementById(e.target.id).style.background);
    for(i=0; i<=colours.length ;i++){
        if(colours[i] == document.getElementById(e.target.id).style.background){
            if(i<colours.length-1){
                document.getElementById(e.target.id).style.background = colours[i+1];
                break;
            } else{
                document.getElementById(e.target.id).style.background = colours[0];
                break;
            }
        }
    }
    //get and set next colour - END
    // Validate result - START
    validateResult();
    // Validate result - END
}
//
function validateResult(){
    var fisrstColor;
    var allCoulorsSame = true;
    for(i=1;i<=tabRowNum;i++){ 
        for(j=1;j<=tabColNum;j++){
            if(!fisrstColor){
                fisrstColor = document.getElementById("row"+i+"col"+j).style.background;
            }
            if(document.getElementById("row"+i+"col"+j).style.background != fisrstColor){
                allCoulorsSame = false;
                break;
            }
        } 
    }
    if(allCoulorsSame == true){
        stopTimer();
        //document.getElementById("divGame").style.visibility = "hidden";
        document.getElementById("result").style.visibility = "visible";
        addResult(document.getElementById("firstname").value, (elapsedTime / 1000).toFixed(1));
        displayResults();
        
    } else {
        document.getElementById("result").style.visibility = "hidden";
    }
    fisrstColor = "";
}
//
function increaseRow(){
    if(tabRowNum < 6){ 
        tabRowNum++;
        initFieldsDyn(tabRowNum,tabColNum);
        //alert(tabColNum + " - " + tabRowNum)
        document.getElementById('numRows').innerHTML = "rows:"+ tabRowNum;
        //alert(tabColNum + " - " + tabRowNum)
    }
}
function decreaseRow(){
    if(tabRowNum > 2){ 
        tabRowNum--;
        initFieldsDyn(tabRowNum,tabColNum);
        //alert(tabColNum + " - " + tabRowNum)
        document.getElementById('numRows').innerHTML = "rows:"+ tabRowNum;
    }
}
function increaseCol(){
    if(tabColNum < 6){ 
        tabColNum++;
        initFieldsDyn(tabRowNum,tabColNum);
        //alert(tabColNum + " - " + tabRowNum)
        document.getElementById('numCols').innerHTML =  "cols:"+ tabColNum;
    }
}
function decreaseCol(){
    if(tabColNum > 2){ 
        tabColNum--;
        initFieldsDyn(tabRowNum,tabColNum);
        //alert(tabColNum + " - " + tabRowNum)
        document.getElementById('numCols').innerHTML = "cols:"+ tabColNum;
    }
}
 function displayResults(){
    var resultObj;
    var vH1;
    var vDiv = document.getElementById("divResults");

    if(vDiv){
        vDiv.remove();
    }

    vDiv = document.createElement("div");
    vDiv.setAttribute("id", "divResults");
    for (i = 0; i < results.length; i++) {
        resultObj = results[i];
        vH1 = document.createElement("h1");
        vH1.innerHTML = resultObj.name+": "+resultObj.time;
        vH1.setAttribute("style", "display: flex; align-items: left; justify-content: left;");
        vDiv.appendChild(vH1);
        //alert(resultObj.name+" "+resultObj.time);
    }
    document.getElementById("results").appendChild(vDiv);
 }
 //
 function addResult(name, time){
    if(!name){
        name = "???";
    }
    if(!time){
        time = 99.9;
    }
    results.push({"name": name, "time": time});
    //alert(name+" "+time);
 }