
class DynamicTable {
    
    constructor(InColCount = 1, InLineCount = 1) {
        this.ColCount   = InColCount;
        this.LineCount  = InLineCount;
    }
    
    addColumn() {

        this.ColCount ++;
        
        let rows = document.getElementsByClassName("DynTable__tr");
        
        for(let row of rows) {
            
            let FirstElement    = row.firstElementChild;
            let NewElement      = FirstElement.cloneNode();
            
            row.appendChild(NewElement);    
        }
                
    }
    
    addLine() {
        
        this.LineCount ++; 
        
        let CurTable = document.querySelector(".DynTable");
        let CurTBody = CurTable.firstElementChild;
        
        let FirstElement    = CurTBody.firstElementChild;
        let NewElement      = FirstElement.cloneNode(true);
        
        CurTBody.appendChild(NewElement);    
        
    }
    
    delColumn() {
       
        if (this.ColCount == 1) {
            return;
        }
        
        this.ColCount --;
        
        let rows = document.getElementsByClassName("DynTable__tr");
        
        for(let row of rows) {
        
            let LastElement    = row.lastElementChild;
            row.removeChild(LastElement);    
        }
        
    }
    
    delLine() {
       
        if (this.LineCount == 1) {
            return;
        }
        
        this.LineCount --;
        
        let CurTable = document.querySelector(".DynTable");
        let CurTBody = CurTable.firstElementChild;
        
        let LastElement = CurTBody.lastElementChild;
        
        CurTBody.removeChild(LastElement);    
    }
        
}

let DynTable = new DynamicTable(4, 4);

let outerDiv = document.querySelector(".Ramka");
outerDiv.addEventListener('click', checkEvent);
outerDiv.addEventListener('mouseover', checkEvent);
outerDiv.addEventListener('mouseout', checkEvent);

DynTable.addColumn();
DynTable.addLine();

function checkEvent(e) {

    if (e.type === 'click') {
        
        if (e.target.classList.contains('js-AddColumn')) {
            
            DynTable.addColumn(); 
            
        }else if (e.target.classList.contains('js-AddLine')) {
            
            DynTable.addLine();
            
        }else if (e.target.classList.contains('js-DelColumn')) {
            
            let DelColButton = document.querySelector(".js-DelColumn");
            DelColButton.style.visibility = 'hidden';       
            
            DynTable.delColumn();
            
        }else if (e.target.classList.contains('js-DelLine')) {
            
            let DellineButton = document.querySelector(".js-DelLine");
            DellineButton.style.visibility = 'hidden';
            
            DynTable.delLine();
            
        }        
        
    }else if(e.type === 'mouseover'){
       
        if (e.target.classList.contains('DynTable__Cell')) {
            
            //Обработка события наведения на ячейки (спозиционируем кнопки удаления)
            let DelColButton = document.querySelector(".js-DelColumn");
            
            if (DynTable.ColCount === 1){
                
                DelColButton.style.visibility = 'hidden';
            }else {
                
                DelColButton.style.visibility = 'visible';
                
                let CurLeft = e.target.offsetLeft + 1;
                DelColButton.style.left = CurLeft + 'px';    
            }
            
            let DellineButton = document.querySelector(".js-DelLine");
            
            if (DynTable.LineCount === 1){
                
                DellineButton.style.visibility = 'hidden';
            
            }else {
                
                DellineButton.style.visibility = 'visible';
                
                let CurTop = e.target.offsetTop + 1;
                DellineButton.style.top = CurTop + 'px';
            }
            
            
        }else if (e.target.classList.contains('DelButton')) {
            
            e.target.style.visibility = 'visible';
            
        }
        
    }else if(e.type === 'mouseout'){
       
        if (e.target.classList.contains('DelButton')) {
            
            e.target.style.visibility = 'hidden';
            
        }else if(e.target.classList.contains('DynTable__Cell')) {
        
            console.log(e.type);
            
            let DellineButton = document.querySelector(".js-DelLine");
            DellineButton.style.visibility = 'hidden';
            
            let DelColButton = document.querySelector(".js-DelColumn");
            DelColButton.style.visibility = 'hidden';       
            
        }
        

    }    
}

