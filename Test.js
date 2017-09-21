var colCount, lineCount;
var docArea, outerSqr, addL, addC, delL, delC;

docArea = document.getElementsByTagName("body")[0];
outerSqr = document.getElementById("OuterSqr");

addL = document.getElementById("AddLine");
addC = document.getElementById("AddColumn");

delL = document.getElementById("DelLine");
delC = document.getElementById("DelColumn");

// click
addL.onclick = function (){
    addLine();
}

addC.onclick = function (){
    addColumn();
}

delL.onclick = function (){
    delLine();
    hideButton(delL);   
}

delC.onclick = function (){
    delColumn();
    hideButton(delC);
}

// target

docArea.onmouseenter = function() {
   
    hideButton(delL);
    hideButton(delC);  
}

outerSqr.onmouseenter = function() {
   
    hideButton(delL);
    hideButton(delC); 
}

addL.onmouseenter = function (){
    targetOnAddButton(this);
    
    hideButton(delL);
    hideButton(delC);
    
} 

addC.onmouseenter = function (){
    targetOnAddButton(this);
    
    hideButton(delL);
    hideButton(delC);
} 

delL.onmouseenter = function (){
    targetOnDelButton(this);
    hideButton(delC);
} 

delC.onmouseenter = function (){
    targetOnDelButton(this);
    hideButton(delL);
} 

addL.onmouseleave = function (){
    untargetOnAddButton(this);
} 

addC.onmouseleave = function (){
    untargetOnAddButton(this);
} 

delL.onmouseleave = function (){
    untargetOnDelButton(this);
    hideButton(delL);
} 

delC.onmouseleave = function (){
    untargetOnDelButton(this);
    hideButton(delC);
} 

//Инициализация

initiate();

function initiate() {
    
    colCount    = 4;
    lineCount   = 4;
    
    setSizes();
    formMainSqr();

}

// управление ячейками

function addColumn() {
     
    colCount ++;

    setSizes();
    formMainSqr();

}

function addLine() {
    
    lineCount ++;

    setSizes();
    formMainSqr();

}

function delColumn() {
    
    if (colCount == 1) {
        
        return;
    }
    
    colCount --;

    setSizes();
    formMainSqr();

}

function delLine() {
    
    if (lineCount == 1) {
        
        return;
    }
    
    lineCount --;

    setSizes();
    formMainSqr();

}

// упраление отображением

function formMainSqr() {
    
    var cellAmount, textHTML, mainSqr;
    
    mainSqr     = document.getElementById("MainSqr");
    cellAmount  = colCount * lineCount + 1;
    textHTML    = '';
    
    for (var i=1; i<cellAmount; i++){
		textHTML += "<div class='cell' count =" + i +"> </div>"; 
        //console.log("Добавлен элемент:" + i);
	}
    
    mainSqr.innerHTML = textHTML; 
    
    // добавим ячейкам обрботчик события 
    setEventToCells();
}

function setEventToCells() {
    
    var cells;
    cells = document.getElementsByClassName("cell");
    
    for (var key in cells) {
        
        cells[key].onmouseenter = function () {
          
            var count = this.getAttribute("count");
            targetOnCell(count);  
            
            if (lineCount == 1) {
                hideButton(delL); 
            }else {
                showButton(delL);
            }
            
            if (colCount == 1) {
                hideButton(delC); 
            }else {
                showButton(delC);
            }
            
        }
        
    }
    
}

function setSizes() {
    
    var mainSqr, outerSqr;
    
    mainSqr  = document.getElementById("MainSqr");

    mainSqr.style.width = "" + colCount * 50 + "px";
    mainSqr.style.height = "" + lineCount * 50 + "px";
    
    outerSqr = document.getElementById("OuterSqr");
    
    outerSqr.style.width = "" + (102 + colCount * 50) + "px";
    outerSqr.style.height = "" + (102 + lineCount * 50) + "px"; 
    
}

function targetOnAddButton(button) {
    
    button.style.background = "yellow";
    button.style.transition = "background 2.5s";
    
}

function untargetOnAddButton(button) {
    
    button.style.background = "orange";
    button.style.transition = "background 2.5s";
    
}

function targetOnDelButton(button) {
    
    button.style.background = "lightcoral";
    button.style.transition = "background 2.5s";
    
}

function untargetOnDelButton(button) {
    
    button.style.background = "red";
    button.style.transition = "background 2.5s";
    
}

// положение кнопок удаления
function targetOnCell(count) {
  
    var curX, curY, posX, posY;
    
    if ((count % colCount) == 0) {
      
        curX = colCount;
        curY = Math.floor(count / colCount);    
    }
    else {
        curX = count % colCount;  
        curY = Math.floor(count / colCount) + 1;        
    }
    
    posX = 1 + curX * 50;
    posY = 1 + (curY - 1) * 50;
       
    delC.style.marginLeft   = "" + posX + "px";
    //delC.style.transition = "margin 1s";
    
    delL.style.marginTop    = "" + posY + "px";
    //delL.style.transition = "margin 1s";
    
}

// управляем видимостью кнопок удаления
function hideButton(button) {

    button.style.visibility = "hidden";   
}

function showButton(button) {
    
    button.style.visibility = "visible";    
}


