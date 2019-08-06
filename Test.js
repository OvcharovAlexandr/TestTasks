
class DynamicTable {
       
    constructor(ColumnCount, RowCount) {

        this.ColumnCount   = ColumnCount;
        this.RowCount  = RowCount;
        //Creating of DOM elements
        this.body = document.querySelector("body");
        this.outerDiv = this.body.appendChild(document.createElement("div"));
        this.outerDiv.className = "DynamicTable";
        //table
        this.CurentTable = this.outerDiv.appendChild(document.createElement("table"));
        this.CurentTable.className = "DynamicTable__Table";

        for(let rowIndex = 0; rowIndex < RowCount; rowIndex++) {
            const newRow = this.CurentTable.appendChild(document.createElement("tr"));
            newRow.className = "DynamicTable__Row";
            for(let colIndex = 0; colIndex < ColumnCount; colIndex++) {
                const newCell = newRow.appendChild(document.createElement("td"));
                newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
            }
        }

        //buttons
        this.DelColumnButton = this.outerDiv.appendChild(document.createElement("button"));
        this.DelColumnButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__DelButton DynamicTable__DelColumn";
        this.DelColumnButton.innerText = "-";

        this.DelRowButton = this.outerDiv.appendChild(document.createElement("button"));
        this.DelRowButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__DelButton DynamicTable__DelRow";
        this.DelRowButton.innerText = "-";

        this.AddColumnButton = this.outerDiv.appendChild(document.createElement("button"));
        this.AddColumnButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__AddButton DynamicTable__AddColumn";
        this.AddColumnButton.innerText = "+";

        this.AddRowButton = this.outerDiv.appendChild(document.createElement("button"));
        this.AddRowButton.className = "DynamicTable__Sqr DynamicTable__Button DynamicTable__AddButton DynamicTable__AddRow";
        this.AddRowButton.innerText = "+";

        //Event listeners
        this.AddColumnButton.addEventListener('click', () => this.addColumn());
        this.AddRowButton.addEventListener('click', () => this.AddRow());
        this.DelColumnButton.addEventListener('click', ()=> this.delColumn());
        this.DelRowButton.addEventListener('click', ()=> this.DelRow());
        this.outerDiv.addEventListener('mouseover', (event)=> this.checkMouseOverEvent(event));
        this.outerDiv.addEventListener('mouseout', (event)=> this.checkMouseOutEvent(event));
    }
    
    addColumn() {
        this.ColumnCount ++;
        for (let rowIndex = 0; rowIndex < this.RowCount; rowIndex++) {
            const newCell = this.CurentTable.childNodes[rowIndex].appendChild(document.createElement("td"));
            newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
        };
    }

    AddRow() {
        this.RowCount ++;
        const newRow = this.CurentTable.appendChild(document.createElement("tr"));
        newRow.className = "DynamicTable__Row";
        for(let colIndex = 0; colIndex < this.ColumnCount; colIndex++) {
            const newCell = newRow.appendChild(document.createElement("td"));
            newCell.className = "DynamicTable__Sqr DynamicTable__Cell";
        }
    }
    
    delColumn() {
        this.DelColumnButton.style.visibility = 'hidden';
        if (this.ColumnCount === 1) return;
        this.ColumnCount --;
        for (let rowIndex = 0; rowIndex < this.RowCount; rowIndex++) {
            const currentRow = this.CurentTable.childNodes[rowIndex];
            currentRow.removeChild(currentRow.childNodes[this.CurrentCellIndex]);
        }
    }

    DelRow() {
        this.DelRowButton.style.visibility = 'hidden';
        if (this.RowCount === 1) return;
        this.RowCount --;
        this.CurentTable.removeChild(this.CurrentRow);
    }
     
    checkMouseOverEvent(event) {
        const itIsCell      = event.target.classList.contains('DynamicTable__Cell');
        const itIsDelButton = event.target.classList.contains('DynamicTable__DelButton');
        if (!itIsCell && !itIsDelButton) return;
        if (itIsDelButton) {
            event.target.style.visibility   = 'visible';
            return;
        }
        this.CurrentRow                         = event.target.parentElement;
        this.CurrentCellIndex                   = event.target.cellIndex;
        this.DelColumnButton.style.left         = event.target.offsetLeft + 'px';
        this.DelRowButton.style.top             = event.target.offsetTop + 'px';
        this.DelColumnButton.style.visibility   = this.ColumnCount === 1 ? 'hidden' : 'visible';
        this.DelRowButton.style.visibility      = this.RowCount === 1 ? 'hidden' : 'visible';
    }
    
    checkMouseOutEvent(event) {
        const itIsCell      = event.target.classList.contains('DynamicTable__Cell');
        const itIsDelButton = event.target.classList.contains('DynamicTable__DelButton');
        if (!itIsCell && !itIsDelButton) return;
        if (itIsDelButton) {
            event.target.style.visibility       = 'hidden';
            return;
        }
        this.DelRowButton.style.visibility      = 'hidden';
        this.DelColumnButton.style.visibility   = 'hidden';
    }
}

let DynTable = new DynamicTable(4, 4);
let DynTable2 = new DynamicTable(2, 2);
// let DynTable3 = new DynamicTable(4, 8);
