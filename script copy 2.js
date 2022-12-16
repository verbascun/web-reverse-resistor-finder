class resistorList{
    results = [];
    
    constructor(equation,targetResistance,resistorSeries){
        this.equation = equation;
        this.targetResistance = targetResistance;
        this.resistorSeries = resistorSeries;
    }
   
    

    findResistors(){
     let c = 0;
        // console.log(this.equation)
        for (let i = 0; i <= length-1; i++)
        {
            let R1= e12Series[i];
           for (let j = c; j <= length-1; j++)
            {
                let R2=e12Series[j]
                let resistorResult = eval(this.equation);
                let difference = (resistorResult-this.targetResistance);
                let error = difference/this.targetResistance * 100;
                // console.log(R1,R2,this.targetResistance, resistorResult.toFixed(2),error.toFixed(2))
                    let calculatedResistor = {
                        "Error": error.toFixed(2),
                        "Resistor 1" : R1,
                        "Resistor 2" : R2,
                        "Result" : resistorResult.toFixed(2),
                    } 
                this.results.push(calculatedResistor);
                }
                c++;
                // console.log(c)b
                }
            this.results.sort(function(a, b){return Math.abs(a.Error) - Math.abs(b.Error)}); 
            // console.log(this.results)
            this.results = this.results.slice(0,10);
            // console.log(this.results);
            return this.results;
        }
        addtable()
        {   
            let divTable = document.getElementById("tables");

            console.log (divTable)
            let table = document.createElement('table');
            table.id= "resistorsTable";
            // table.id=this.equation;

            divTable.append(table)
            console.log(this.results)

            generateTableHead(table, Object.keys(this.results[0]))
            generateTable (table, this.results)



            function generateTableHead(table, data) {
                let thead = table.createTHead();
                let row = thead.insertRow();
                for (let key of data) {
                  let th = document.createElement("th");
                  let text = document.createTextNode(key);
                  th.appendChild(text);
                  row.appendChild(th);
                }
              }

              function generateTable(table, data) {
                for (let element of data) {
                  let row = table.insertRow();
                  for (let key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                  }
                }
              }
        }
        }
    

 function showResults(){

            let divTable = document.getElementById("tables");

            divTable.innerHTML = "";


        let targetResistance  = document.getElementById("targetResistance").value;

        console.log("showing results");

        for (let eq of equationList){
            let list1 = new resistorList(eq,targetResistance,e12Series)
            console.log(eq)
            list1.findResistors()
            list1.addtable(eq)
        }
    
    
    }
