import React,{Component} from "react";  
import './App.css';
import Display from "./DisplayValues";

import img from "./finacular.jpg";
import {Bar} from 'react-chartjs-2';
import html2pdf from "html2pdf.js";


const calenderMonth = {
  1:"Jan",
  2:"Feb",
  3:"Mar",
  4:"Apr",
  5:"May",
  6: "June",
  7:"July",
  8:"Aug",
  9:"Sept",
  10:"Oct",
  11:"Nov",
  12:"Dec"
}


class App extends Component {

  constructor(){
    super();
    this.state={
      finArray : [],
      portfolioValue :"",
      status : false,
      chartStatus: false,
      month : [],
      portAmount:[],
      portPercent:[],
      name:"dummy"
      


    }
  }

  savePdf = () =>{
    const options = {
      filename : `Networth-${this.state.name}.pdf`,
      image: {type: "jpeg",quality: 0.98},
      html2canvas : {},
      jsPDF : {orientation : "landscape"}
    }  

    const element = document.getElementById("pdf");

    html2pdf().from(element).set(options).save();
  }



  calculateValue = ()=>{
    const date = this._inputDate.value.split("-");
    const month = Number(date[1]);
    const year = date[0];
    const clientname = this._inputName.value;

    const monthYear = calenderMonth[month] + "-" + year

    var amount = this._inputAmount.value;
    var localAmount = Number(amount).toLocaleString();
    
    var percentDecimal;
    var change1;
    var changeAmount;
    var changePercent;
    var percent;
    var portPercent;

      

    if(this.state.portfolioValue){
     change1 = amount - this.state.portfolioValue;
      percentDecimal = (change1/this.state.portfolioValue)*100;
      percent = percentDecimal.toFixed(2);
      changeAmount = Number(change1).toLocaleString()
      
      changePercent = percentDecimal.toFixed(2) + "%"
    }else{
      changeAmount = "NA"
      changePercent = "NA"
    }
   var  change2 = amount - this.state.portfolioValue;
     var percentDecimal2 = (change2/this.state.portfolioValue)*100;
     var percent2 = percentDecimal2.toFixed(2);

    (this.state.portfolioValue)? portPercent = percent2 : portPercent = 0

    
    this.setState({status:true})

    this.setState({month:this.state.month.concat([monthYear])});
    this.setState({name:clientname})

    this.setState({portAmount:this.state.portAmount.concat([Number(amount)])})
    this.setState({portPercent:this.state.portPercent.concat([Number(portPercent)])})


    this.setState({finArray:this.state.finArray
      .concat([{month:monthYear,amount:localAmount,changeinvalue:change1,changeinamount:changeAmount,changeinpercent:changePercent}])});
    this.setState({portfolioValue: amount})
    this.setState({changeInAmount : changeAmount});
    this.setState({changeInPercent:changePercent})
   
  }


  showChart = ()=>{
    this.setState({
      chartStatus:true
    })
  }


 render(){
  return (
    <div id="App" className="App">

      <h1 id ="finHeading"> Finacular </h1>
      <div id = "inputform">

        <span className ="input"> Name : <input type="text" ref={(x)=> this._inputName = x}/> </span>
        <span className ="input"> Month : <input type="month" ref={(a)=> this._inputDate = a}/> </span>
        <span className ="input"> Networth(₹) : <input type="number" ref={(b)=> this._inputAmount = b}   /> </span>
        <input className="btn" type="button" Value="Enter" onClick={this.calculateValue}/>
       <input className="btn2" type="button" Value="Graph" onClick={this.showChart}/>  
       <input className="btn3" type="button" Value="Save" onClick={this.savePdf}/>  

      </div>
      
      <div id="pdf">

            <span id="finimg"><img  alt ="finacular image" src={img}/></span>
          {(this.state.status) ? <h2> Client Name : <strong id="clientname">{this.state.name} </strong></h2> : <span></span>}
      <div id = "titleHeader">
        <div id = "titleContainer">
          <h3 className = "title"> <span className="titleSpan1"> Month </span> </h3>
          <h3 className = "title"> <span className="titleSpan2"> Networth(₹)  </span> </h3>
          <h3 className = "title"> <span className="titleSpan3">  Change (₹) </span> </h3>
          <h3 className = "title"> <span className="titleSpan4">  Change(%)  </span> </h3>
        </div>

      </div>
      {(this.state.status)?<Display array = {this.state.finArray} />:<span> </span>}
     
      {(this.state.chartStatus )?<div className="chart">
       <Bar

        data = 
          {{labels: this.state.month,

            datasets:[

              {
                label:"Networth(₹)",
                data: this.state.portAmount,
                backgroundColor: 'rgba(0,0,255,0.5)',
                yAxisID : "A",

                

              },
              {
                type:"line",
                label:"Change(%)",
                data: this.state.portPercent,
                borderColor:"red",
                backgroundColor:"rgba(0,0,0,0)",
                yAxisID : "B",

              }

            ]

          }}
        

        height = {300}

        width = {20}

        options = {{
          maintainAspectRatio : false,
          scales: {
                  yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                beginAtZero:true
              }
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                
              }
            }]
        }
        }}

       />
      </div> : <span> </span>
              }




      </div>

    </div>
  );

 } 
}

export default App;
