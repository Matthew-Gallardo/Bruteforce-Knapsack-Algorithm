let num_rows
let knapsackCapacity
var m = 5, n=6;
// console.log(array);

function createTable() {
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    let theader = '<table class="table text-center" style="padding:5px; width:800px; margin-left:265px; border-radius:8px;margin-top:15px;border: none;" id="table" > <tr style="padding:20px;text-align:center;" style="color: black;" ><th scope="col" style="color: black;">Items</th> <th scope="col" style="color: black;">Profit</th> <th scope="col" style="color: black;">Weight</th></tr>';
    let tbody = '';

    for (let i = 0; i < num_rows; i++) {

        tbody += '<tbody><tr style="color: black; padding: 10px; margin: 10px;">';
        tbody += '<td>';
        let j=i+1
        tbody += 'Item ' +j 
        tbody += '</td>'
        for (let j = 0; j < 2; j++) {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" style="width: 320px; height: 45px;" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    let tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}

let kpResultantProfitId = document.getElementById("kpResultantProfit")
let kpProfitId = document.getElementById("kpProfit")
let kpWeightId = document.getElementById("kpWeight")
let kpProfitWeightId = document.getElementById("kpProfitWeight")
let kpResultantSolutionId = document.getElementById("kpResultantSolution")

let weightValue, profitValue
let profit = [];
let weight = [];
let profit_weight = []
let tempList = []
let resultantSolution = []
let i, j, knapsackResultantProfit = 0;

function generateResult() {
    let resultClass = document.getElementsByClassName("result");
    document.getElementById("resultContainer1").style.height="auto";
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    
    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    tempList = []

    console.log(resultClass.length);
    
    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    let tableId = document.getElementById("table")
    for (let i = 1; i <= num_rows; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }


    knapsackAlgorithm()
}


function knapsackAlgorithm() {
        let dp = Array(profit?.length+1).fill().map((i) =>{
            i = Array(Number(knapsackCapacity)+1).fill(0)
            return i;
          });
          
  for (let i = 1; i <= profit.length; i++) {
    
    for (let j = 0; j <= knapsackCapacity; j++) {
      if (weight[i-1] > j) {
        dp[i][j] = dp[i-1][j];
      } else {
        dp[i][j] = Math.max(dp[i-1][j], Number(dp[i-1][j-weight[i-1]]) + Number(profit[i-1]));
      }
    }
  }
  console.log(dp);
  knapsackResultantProfit=dp[profit.length][knapsackCapacity];
    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3)
    kpProfitId.innerHTML = profit
    kpWeightId.innerHTML = weight
    kpProfitWeightId.innerHTML = profit_weight
    kpResultantSolutionId.innerHTML = tempList
}

