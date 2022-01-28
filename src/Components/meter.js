import React from 'react';
import GaugeChart from 'react-gauge-chart'

function meter({data}) {

    const chartStyle = {
        height: 250,
       
      }

     // console.log(data)

  return <div>
      <GaugeChart 
        id="gauge-chart1" 
        nrOfLevels={30} 
        //arcPadding={0.1} 
        cornerRadius={3} 
        percent={data}
        style={chartStyle}
        textColor="#f0f8ff"
         
        />
  </div>;
}


export default meter;