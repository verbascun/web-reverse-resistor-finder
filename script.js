// import {resistorList, showResults} from './findResistors.js';

console.log("START OF SCRIPT")

const e12Series = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
const e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]

let equations= ["1/(1/R1 + 1/R2)","R1+R2"];



document.getElementById("findButton").addEventListener("click", checkTargetValue); 


function showResults(){

  let targetResistance  = document.getElementById("targetResistance").value;



  var seriesRadioButtonSelected = document.querySelector('input[name="series"]:checked').value;
  console.log("checked series: ", seriesRadioButtonSelected)
  console.log("e12 series:",e12Series)
  console.log("e24 series:",e24Series)
  let selectedSeries = []
  if (seriesRadioButtonSelected === "e12")
  {
    selectedSeries = selectedSeries.concat(e12Series)
    console.log("e12eries seleced",selectedSeries)


    // for (let i = 0; i <= length*6-1; i++) { 
    //     e12Series[12+i] = e12Series[i]*10      
    //    }
    
    
    // console.log(e12Series)
    
    
    // showResults();
    selectedSeries = calculateSeries(selectedSeries)

     }
 else {
  selectedSeries = selectedSeries.concat(e24Series)
  console.log("e24eries seleced",selectedSeries)
  selectedSeries = calculateSeries(selectedSeries)  
 }


let tables = document.getElementsByClassName("resultsTable");
var r1_texts= document.getElementsByClassName("r1_text");
let r2_texts= document.getElementsByClassName("r2_text");


for (let i = 0; i <= 1; i++) { 
  tables[i].innerHTML = ""

let data= findResistors(equations[i],targetResistance,selectedSeries)

var textNode = r1_texts[i].childNodes[0];
textNode.nodeValue = data[0].R1;
var textNode2 = r2_texts[i].childNodes[0];
textNode2.nodeValue = data[0].R2;

generateTableHead(tables[i], Object.keys(data[0]))
generateTable (tables[i], data)
}
}

function findResistors(equation, targetResistance, resistorSeries){
    results = [];

    // console.log(resistorSeries)
    let length = resistorSeries.length

      let c = 0;
         // console.log(this.equation)
         for (let i = 0; i <= length-1; i++)
         {
             let R1= resistorSeries[i];
            for (let j = c; j <= length-1; j++)
             {
                 let R2=resistorSeries[j]
                 let resistorResult = eval(equation);
                 let difference = (resistorResult-targetResistance);
                 let error = difference/targetResistance * 100;
                 // console.log(R1,R2,this.targetResistance, resistorResult.toFixed(2),error.toFixed(2))
                     let calculatedResistor = {
                         "Error": error.toFixed(2),
                         "R1" : R1,
                         "R2" : R2,
                         "Result" : resistorResult.toFixed(2),
                     } 
                 results.push(calculatedResistor);
                 }
                 c++;
                 // console.log(c)b
                 }
             results.sort(function(a, b){return Math.abs(a.Error) - Math.abs(b.Error)}); 
             // console.log(this.results)
             results = results.slice(0,10);
              // console.log(results);
             return results;
                }


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


                  function calculateSeries(selectedSerie){ 
                  // console.log("e12 series list", selectedSeries)
                  seriesLength = selectedSerie.length
                  for (let i = 0; i <= seriesLength*6-1; i++) { 
                    selectedSerie[seriesLength+i] = selectedSerie[i]*10   
                  }
                  console.log("after calculating fun:" ,selectedSerie)
                  return selectedSerie;

                }

                console.log("END OF SCRIPT")  


                // .addEventListener("click", showResults); 



                function checkTargetValue() {
                  // Get the value of the input field with id="numb"
                  let targetResistance  = document.getElementById("targetResistance").value;
                  // If x is Not a Number or less than one or greater than 10
                  let text;
                  if (isNaN(targetResistance) || targetResistance <= 1 || targetResistance > 9999999) {
                    text = "Insert a number between 1 and 9999999";
                    let tables = document.getElementsByClassName("resultsTable");

                    for (let i = 0; i <= 1; i++) { 
                      tables[i].innerHTML = ""}
                  } else {
                    text = ""
                    showResults();
                                    }
                  document.getElementById("warning").innerHTML = text;
                }

// function showResults(){

//   let targetResistance  = document.getElementById("targetResistance").value;;