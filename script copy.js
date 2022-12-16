let e12Series = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
let e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]
length = e12Series.length



function findResistorValues()
{
   var selectedSeries = document.querySelector("input[name='series']:checked").value;

  console.log(selectedSeries)

let targetResistance  = document.getElementById("targetResistance").value;
let maxError = document.getElementById("maxError").value;

    for (let i = 0; i <= length*6-1; i++) { 
        e12Series[12+i] = e12Series[i]*10      
       }

let results = []
       
for (let resistor1 of e12Series)
   {
    for (let resistor2 of e12Series)
    {
        
        let resistorResult = 1/(1/resistor1 + 1/resistor2)
        let difference = (resistorResult-targetResistance)
        let error = difference/targetResistance * 100
        // console.log(resistor1,resistor2,resistorResult.toFixed(2),targetResistance,error.toFixed(2))


        // console.log(resistorResult)

        if (Math.abs(error) < maxError && !results.some(calculatedResistor => calculatedResistor.Result === resistorResult.toFixed(2)))
        {   
        let calculatedResistor = {
            "Resistor 1" : resistor1,
            "Resistor 2" : resistor2,
            "Result" : resistorResult.toFixed(2),
            "Error": error.toFixed(2)
        } 
        
        results.push(calculatedResistor)     
        }
           
       } 
      
   }
//    console.log(results)
    results.sort(function(a, b){return Math.abs(a.Error) - Math.abs(b.Error)}); 
   console.log(results)

   return results


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
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  
  function showResults()
  {
    let table = document.querySelector("table");
    table.innerHTML = "";
    let resistorValues = findResistorValues()
    let data = Object.keys(resistorValues[0]);
    generateTableHead(table, data);
    generateTable(table, resistorValues);

  }


console.log("END")