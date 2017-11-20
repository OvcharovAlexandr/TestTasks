
class DynamicTable {
       
    constructor(index) {
        
        this.ColCount   = 4;
        this.LineCount  = 4;
        
        this.outerDiv = document.querySelector(".DynTableInd_" + index);
        this.CurTable = this.outerDiv.querySelector(".DynTable__Table");
        
        this.DelColButton = this.outerDiv.querySelector(".DynTable__DelColumn");
        this.DellineButton = this.outerDiv.querySelector(".DynTable__DelLine");
        
        this.AddColumnButton = this.outerDiv.querySelector(".DynTable__AddColumn");
        this.AddLineButton = this.outerDiv.querySelector(".DynTable__AddLine");
        
        //Add buttons   
        this.AddColumnButton.addEventListener('click', () => this.addColumn());
        this.AddLineButton.addEventListener('click', () => this.addLine());
        
        //Del buttons
        this.DelColButton.addEventListener('click', ()=> {
                                                        this.DelColButton.style.visibility = 'hidden';
                                                        this.delColumn();
                                                    });
        
        this.DellineButton.addEventListener('click', ()=> {
                                                            this.DellineButton.style.visibility = 'hidden';
                                                            this.delLine();
                                                    });
        
        //outer Div
        this.outerDiv.addEventListener('mouseover', (event)=> this.checkMouseOverEvent(event));
        this.outerDiv.addEventListener('mouseout', (event)=> this.checkMouseOutEvent(event));
        
    }
    
    addColumn() {

        this.ColCount ++;
        
        let rows = this.CurTable.getElementsByClassName("DynTable__Row");
        
        for(let row of rows) {
            
            let FirstElement    = row.firstElementChild;
            let NewElement      = FirstElement.cloneNode();
            
            row.appendChild(NewElement);    
        }
                
    }
    
    addLine() {
        
        this.LineCount ++; 
        
        let CurTBody = this.CurTable.firstElementChild;
        
        let FirstElement    = CurTBody.firstElementChild;
        let NewElement      = FirstElement.cloneNode(true);
        
        CurTBody.appendChild(NewElement);    
        
    }
    
    delColumn() {
       
        this.DelColButton.style.visibility = 'hidden';
        
        if (this.ColCount == 1) {
            return;
        }
        
        this.ColCount --;
        
        let rows = this.CurTable.getElementsByClassName("DynTable__Row");
        
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
        
        let CurTBody = this.CurTable.firstElementChild;
        
        let LastElement = CurTBody.lastElementChild;
        
        CurTBody.removeChild(LastElement);    
    }
     
    checkMouseOverEvent(event) {
        
        if (event.target.classList.contains('DynTable__Cell')) { 
            
            if (this.ColCount === 1){
                this.DelColButton.style.visibility = 'hidden';
            }else {
                this.DelColButton.style.visibility = 'visible';
                this.DelColButton.style.left = event.target.offsetLeft + 'px';    
            }
            
            if (this.LineCount === 1){
                this.DellineButton.style.visibility = 'hidden';
            }else {                
                this.DellineButton.style.visibility = 'visible';
                this.DellineButton.style.top = event.target.offsetTop + 'px';
            }
        
        }else if (event.target.classList.contains('DynTable__DelButton')) {
            
            event.target.style.visibility = 'visible';
            
        }
    }
    
    checkMouseOutEvent(event) {
        
        if(event.target.classList.contains('DynTable__Cell')) {
            
            this.DellineButton.style.visibility = 'hidden';
            this.DelColButton.style.visibility = 'hidden';       
            
        }else if(event.target.classList.contains('DynTable__DelButton')) {
        
           event.target.style.visibility = 'hidden'; 
            
        }
    }
               
}

let DynTable = new DynamicTable(1);
