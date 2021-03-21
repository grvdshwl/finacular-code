import React from "react";
import "./DisplayValues.css";




const Display = ({array}) =>{


var p = Math.random();
var colorValue;


const displayValue = array.map((data)=>{
	
	
	(Number(data["changeinvalue"])>0)? colorValue="colorGreen": 
	(Number(data["changeinvalue"])<0)? colorValue = "colorRed" : colorValue = "none"

		return(
				<div id="headertitle">
					<div id="title1" key = {p}>
						<span className="valueSpan1"> <h3 className="title1" > {data["month"]}</h3> </span>
						<span className="valueSpan2"> <h3 className="title1"> {data["amount"]}</h3></span>
						<span id={colorValue} className="valueSpan3"   > <h3 className="title1"   > {data["changeinamount"]}</h3> </span>
						<span  id={colorValue} className="valueSpan4" >	<h3 className="title1" > {data["changeinpercent"]} </h3>  </span>
					</div>
				</div>	
			)
		

		 
})


return(

		<div>
			{displayValue}

		</div>


	)







}




export default Display;