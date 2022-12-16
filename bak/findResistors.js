export class resistorList{
    
    constructor(equation,targetResistance,resistorSeries){
        this.equation = equation;
        this.targetResistance = targetResistance;
        this.resistorSeries = resistorSeries;
    }

    results = [];

    findResistors(){

        console.log(this.equation)
        for (let R1 of this.resistorSeries)
        {
            for (let R2 of this.resistorSeries)
            {
                

                

                let resistorResult = eval(this.equation)
                let difference = (resistorResult-this.targetResistance)
                let error = difference/this.targetResistance * 100

                // if (Math.abs(error) < maxError && !results.some(calculatedResistor => calculatedResistor.Result === resistorResult.toFixed(2)))

                
                // console.log(R1,R2,resistorResult, this.targetResistance, difference,  error)   
                }
  



            }
        }
    }

export function showResults(){

        console.log("showing resultsT")
    
    
    }