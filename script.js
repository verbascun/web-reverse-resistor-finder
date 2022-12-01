// import {resistorList, showResults} from './findResistors.js';

console.log("START OF SCRIPT")

let e12Series = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
let e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]

let equationList= ["1/(1/R1 + 1/R2)","R1+R2","1/(1/R1 + 1/R2)","1/(1/R1 + 1/R2)"];

let length = e12Series.length

for (let i = 0; i <= length*6-1; i++) { 
    e12Series[12+i] = e12Series[i]*10      
   }

length = e12Series.length

console.log(e12Series)


// showResults();

console.log("MIDDLE OF SCRIPT")


// let equation1 = "1/(1/R1 + 1/R2)";
// let list1 = new resistorList(equation1,targetResistance,e12Series)

// list1.findResistors()
    
// var selectedSeries = document.querySelector("input[name='series']:checked").value;

// console.log(selectedSeries)







console.log("END OF SCRIPT")  

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
                // console.log(c)
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
            table.id=this.equation

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