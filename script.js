
const e12Series = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
const e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]

var equations= ["1/(1/R1 + 1/R2)","R1+R2"];

document.getElementById("findButton").addEventListener("click", checkTargetValue); 

function showResults(){

  let selectedSeries = []
  let targetResistance  = document.getElementById("targetResistance").value;
  let seriesRadioButtonSelected = document.querySelector('input[name="series"]:checked').value;

  if (seriesRadioButtonSelected === "e12")
  {
    selectedSeries = selectedSeries.concat(e12Series)
    selectedSeries = calculateSeries(selectedSeries)

     }
 else {
  selectedSeries = selectedSeries.concat(e24Series)
  selectedSeries = calculateSeries(selectedSeries)  
 }

let tables = document.getElementsByClassName("resultsTable");
let r1_texts= document.getElementsByClassName("r1_text");
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
  let results = [];
  let length = resistorSeries.length
  let c = 0;
    for (let i = 0; i <= length-1; i++)
    {
        let R1= resistorSeries[i];
      for (let j = c; j <= length-1; j++)
        {
          let R2=resistorSeries[j]
          let resistorResult = eval(equation);
          let difference = (resistorResult-targetResistance);
          let error = difference/targetResistance * 100;
          let calculatedResistor = {
              "Error": error.toFixed(2),
              "R1" : R1,
              "R2" : R2,
              "Result" : resistorResult.toFixed(2),
          } 
            results.push(calculatedResistor);
            }
            c++;
            }
  results.sort(function(a, b){return Math.abs(a.Error) - Math.abs(b.Error)}); 
  results = results.slice(0,10);
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
  seriesLength = selectedSerie.length
  for (let i = 0; i <= seriesLength*6-1; i++) { 
    selectedSerie[seriesLength+i] = selectedSerie[i]*10   
  }
  return selectedSerie;
}

function checkTargetValue() {
  let targetResistance  = document.getElementById("targetResistance").value;
  let text;
  if (isNaN(targetResistance) || targetResistance <= 1 || targetResistance > 9999999) {
    text = "Insert a number between 1 and 9999999";
    let tables = document.getElementsByClassName("resultsTable");
    for (let i = 0; i <= 1; i++) { 
      tables[i].innerHTML = ""}
  } else {
    text = ""
    showResults();}
  document.getElementById("warning").innerHTML = text;
}