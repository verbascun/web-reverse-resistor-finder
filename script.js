
const e12Series = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
const e24Series = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1]

const equations = ['1/(1/R1 + 1/R2)', 'R1+R2']

document.getElementById('findButton').addEventListener('click', checkTargetValue)

function showResults (targetResistance) {
  let selectedSeries = []
  const seriesRadioButtonSelected = document.querySelector('input[name="series"]:checked').value

  if (seriesRadioButtonSelected === 'e12') {
    selectedSeries = selectedSeries.concat(e12Series)
    selectedSeries = calculateSeries(selectedSeries)
  } else {
    selectedSeries = selectedSeries.concat(e24Series)
    selectedSeries = calculateSeries(selectedSeries)
  }

  const tables = document.getElementsByClassName('resultsTable')
  const r1Texts = document.getElementsByClassName('r1_text')
  const r2Texts = document.getElementsByClassName('r2_text')

  for (let i = 0; i <= 1; i++) {
    tables[i].innerHTML = ''

    const data = findResistors(equations[i], targetResistance, selectedSeries)

    const textNode = r1Texts[i].childNodes[0]
    textNode.nodeValue = data[0].R1
    const textNode2 = r2Texts[i].childNodes[0]
    textNode2.nodeValue = data[0].R2

    generateTableHead(tables[i], Object.keys(data[0]))
    generateTable(tables[i], data)
  }
}

function findResistors (equation, targetResistance, resistorSeries) {
  let results = []
  const length = resistorSeries.length
  let c = 0
  for (let i = 0; i <= length - 1; i++) {
    const R1 = resistorSeries[i]
    for (let j = c; j <= length - 1; j++) {
      const R2 = resistorSeries[j]
      const resistorResult = eval(equation)
      const difference = (resistorResult - targetResistance)
      const error = difference / targetResistance * 100
      const calculatedResistor = {
        Error: error.toFixed(2),
        R1,
        R2,
        Result: resistorResult.toFixed(2)
      }
      results.push(calculatedResistor)
    }
    c++
  }
  results.sort(function (a, b) { return Math.abs(a.Error) - Math.abs(b.Error) })
  results = results.slice(0, 10)
  return results
}

function generateTableHead (table, data) {
  const thead = table.createTHead()
  const row = thead.insertRow()
  for (const key of data) {
    const th = document.createElement('th')
    const text = document.createTextNode(key)
    th.appendChild(text)
    row.appendChild(th)
  }
}
function generateTable (table, data) {
  for (const element of data) {
    const row = table.insertRow()
    for (const key in element) {
      const cell = row.insertCell()
      const text = document.createTextNode(element[key])
      cell.appendChild(text)
    }
  }
}

function calculateSeries (selectedSerie) {
  const seriesLength = selectedSerie.length
  for (let i = 0; i <= seriesLength * 6 - 1; i++) {
    selectedSerie[seriesLength + i] = selectedSerie[i] * 10
  }
  return selectedSerie
}

function checkTargetValue () {
  const targetResistance = document.getElementsByClassName('targetResistance')[0].value

  let text
  if (isNaN(targetResistance) || targetResistance <= 1 || targetResistance > 9999999) {
    text = 'Insert a number between 1 and 9999999'
    const tables = document.getElementsByClassName('resultsTable')
    for (let i = 0; i <= 1; i++) {
      tables[i].innerHTML = ''
    }
  } else {
    text = ''
    showResults(targetResistance)
  }
  document.getElementById('warning').innerHTML = text
}
