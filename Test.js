
class DynamicTable {
       
    constructor(ColCount, LineCount) {

        this.ColCount   = ColCount;
        this.LineCount  = LineCount;
        //Creating of DOM elements
        this.body = document.querySelector("body");
        this.outerDiv = this.body.appendChild(document.createElement("div"));
        this.outerDiv.className = "DynamicTable";
        //table
        this.CurTable = this.outerDiv.appendChild(document.createElement("table"));
        this.CurTable.className = "DynamicTable__Table";

        for(let rowIndex = 0; rowIndex < LineCount; rowIndex++) {
            const newRow = this.CurTable.appendChild(document.createElement("tr"));
            newRow.className = "DynamicTable__Row";
            for(let colIndex = 0; colIndex < ColCount; colIndex++) {
                const newCell = newRow.appendChild(document.createElement("td"));
                newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
            }
        }

        //buttons
        this.DelColButton = this.outerDiv.appendChild(document.createElement("button"));
        this.DelColButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__DelButton DynamicTable__DelColumn";
        this.DelColButton.innerText = "-";

        this.DellineButton = this.outerDiv.appendChild(document.createElement("button"));
        this.DellineButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__DelButton DynamicTable__DelLine";
        this.DellineButton.innerText = "-";

        this.AddColumnButton = this.outerDiv.appendChild(document.createElement("button"));
        this.AddColumnButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__AddButton DynamicTable__AddColumn";
        this.AddColumnButton.innerText = "+";

        this.AddLineButton = this.outerDiv.appendChild(document.createElement("button"));
        this.AddLineButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__AddButton DynamicTable__AddLine";
        this.AddLineButton.innerText = "+";

        //Event listeners
        this.AddColumnButton.addEventListener('click', () => this.addColumn());
        this.AddLineButton.addEventListener('click', () => this.addLine());
        this.DelColButton.addEventListener('click', ()=> this.delColumn());
        this.DellineButton.addEventListener('click', ()=> this.delLine());
        this.outerDiv.addEventListener('mouseover', (event)=> this.checkMouseOverEvent(event));
        this.outerDiv.addEventListener('mouseout', (event)=> this.checkMouseOutEvent(event));

    }
    
    addColumn() {
        this.ColCount ++;
        for (let rowIndex = 0; rowIndex < this.LineCount; rowIndex++) {
            const newCell = this.CurTable.childNodes[rowIndex].appendChild(document.createElement("td"));
            newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
        };
    }
    
    addLine() {
        this.LineCount ++;
        const newRow = this.CurTable.appendChild(document.createElement("tr"));
        newRow.className = "DynamicTable__Row";
        for(let colIndex = 0; colIndex < this.ColCount; colIndex++) {
            const newCell = newRow.appendChild(document.createElement("td"));
            newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
        }
    }
    
    delColumn() {
        this.DelColButton.style.visibility = 'hidden';
        if (this.ColCount === 1) return;
        this.ColCount --;
        for (let rowIndex = 0; rowIndex < this.LineCount; rowIndex++) {
            const currentRow = this.CurTable.childNodes[rowIndex];
            currentRow.removeChild(currentRow.childNodes[this.CurrentCellIndex]);
        }
    }
    
    delLine() {
        this.DellineButton.style.visibility = 'hidden';
        if (this.LineCount === 1) return;
        this.LineCount --;
        this.CurTable.removeChild(this.CurrentRow);
    }
     
    checkMouseOverEvent(event) {
        
        if (event.target.classList.contains('DynamicTable__Cell')) {

            this.CurrentRow         = event.target.parentElement;
            this.CurrentCellIndex   = event.target.cellIndex;

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
        
        }else if (event.target.classList.contains('DynamicTable__DelButton')) {
            
            event.target.style.visibility = 'visible';
            
        }
    }
    
    checkMouseOutEvent(event) {
        
        if(event.target.classList.contains('DynamicTable__Cell')) {
            
            this.DellineButton.style.visibility = 'hidden';
            this.DelColButton.style.visibility = 'hidden';       
            
        }else if(event.target.classList.contains('DynamicTable__DelButton')) {
        
           event.target.style.visibility = 'hidden'; 
            
        }
    }
               
}

let DynTable = new DynamicTable(4, 4);
// let DynTable2 = new DynamicTable(2, 2);
// let DynTable3 = new DynamicTable(4, 8);
