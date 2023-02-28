/**
 * Load data from CSV file asynchronously and render bar chart
 */
let barchart;
let barchart5;
let linechart;
let scatterplot;

function PopDat1(graphData,d){
  if (d.sy_snum == 4){
    graphData[0][3].yValue = graphData[0][3].yValue + 1;
  }
  else if (d.sy_snum == 3){
    graphData[0][2].yValue = graphData[0][2].yValue + 1;
  }
  else if (d.sy_snum == 2){
    graphData[0][1].yValue = graphData[0][1].yValue + 1;
  }
  else if (d.sy_snum == 1){
    graphData[0][0].yValue = graphData[0][0].yValue + 1;
  }
}
function PopDat2(graphData,d){
  if (d.sy_pnum == 1){
    graphData[1][0].yValue = graphData[1][0].yValue + 1;
  }
  else if (d.sy_pnum == 2){
    graphData[1][1].yValue = graphData[1][1].yValue + 1;
  }
  else if (d.sy_pnum == 3){
    graphData[1][2].yValue = graphData[1][2].yValue + 1;
  }
  else if (d.sy_pnum == 4){
    graphData[1][3].yValue = graphData[1][3].yValue + 1;
  }
  else if (d.sy_pnum == 5){
    graphData[1][4].yValue = graphData[1][4].yValue + 1;
  }
  else if (d.sy_pnum == 6){
    graphData[1][5].yValue = graphData[1][5].yValue + 1;
  }
  else if (d.sy_pnum == 7){
    graphData[1][6].yValue = graphData[1][6].yValue + 1;
  }
  else if (d.sy_pnum == 8){
    graphData[1][7].yValue = graphData[1][7].yValue + 1;
  }
}
function PopDat3(graphData,d){
  if (d.st_spectype.charAt(0) == 'A'){
    graphData[2][0].yValue = graphData[2][0].yValue + 1;
  }
  else if (d.st_spectype.charAt(0) == 'F'){
    graphData[2][1].yValue = graphData[2][1].yValue + 1;
  }
  else if (d.st_spectype.charAt(0) == 'G'){
    graphData[2][2].yValue = graphData[2][2].yValue + 1;
  }
  else if (d.st_spectype.charAt(0) == 'K'){
    graphData[2][3].yValue = graphData[2][3].yValue + 1;
  }
  else if (d.st_spectype.charAt(0) == 'M'){
    graphData[2][4].yValue = graphData[2][4].yValue + 1;
  }
  //else {
  //  graphData[2][5].yValue = graphData[2][5].yValue + 1;
  //}
}
function PopDat4(graphData,d){
  if (d.discoverymethod == 'Astrometry'){
    graphData[3][0].yValue = graphData[3][0].yValue + 1;
  }
  if (d.discoverymethod == 'Disk Kinematics'){
    graphData[3][1].yValue = graphData[3][1].yValue + 1;
  }
  if (d.discoverymethod == 'Eclipse Timing Variations'){
    graphData[3][2].yValue = graphData[3][2].yValue + 1;
  }
  if (d.discoverymethod == 'Imaging'){
    graphData[3][3].yValue = graphData[3][3].yValue + 1;
  }
  if (d.discoverymethod == 'Microlensing'){
    graphData[3][4].yValue = graphData[3][4].yValue + 1;
  }
  //if (d.discoverymethod == 'Orbital'){
  //  graphData[3][5].yValue = graphData[3][5].yValue + 1;
  //}
  if (d.discoverymethod == 'Orbital Brightness Modulation'){
    graphData[3][5].yValue = graphData[3][5].yValue + 1;
  }
  if (d.discoverymethod == 'Pulsar Timing'){
    graphData[3][6].yValue = graphData[3][6].yValue + 1;
  }
  if (d.discoverymethod == 'Pulsation Timing Variations'){
    graphData[3][7].yValue = graphData[3][7].yValue + 1;
  }
  if (d.discoverymethod == 'Radial Velocity'){
    graphData[3][8].yValue = graphData[3][8].yValue + 1;
  }
  if (d.discoverymethod == 'Transit'){
    graphData[3][9].yValue = graphData[3][9].yValue + 1;
  }
  if (d.discoverymethod == 'Transit Timing Variations'){
    graphData[3][10].yValue = graphData[3][10].yValue + 1;
  }
}
function PopData5(graphData,d){
//Graph5: How many planets are within a habitable zone versus unhabitable Zone
      //  Note: This will require a calculation based on Star type and planet distance.
      if (d.st_spectype.charAt(0) == 'A'){
        if(d.pl_orbsmax >= 8.5 && d.pl_orbsmax <= 12.5){
          graphData[4][0].yValue = graphData[4][0].yValue + 1
        }
        else{
          graphData[4][1].yValue = graphData[4][1].yValue + 1
        };
      }
      else if (d.st_spectype.charAt(0) == 'F'){
        if(d.pl_orbsmax >= 1.5 && d.pl_orbsmax <= 2.2){
          graphData[4][0].yValue = graphData[4][0].yValue + 1
        }
        else{
          graphData[4][1].yValue = graphData[4][1].yValue + 1
        };
      }
      else if (d.st_spectype.charAt(0) == 'G'){
        if(d.pl_orbsmax >= 0.95 && d.pl_orbsmax <= 1.4){
          graphData[4][0].yValue = graphData[4][0].yValue + 1
        }
        else{
          graphData[4][1].yValue = graphData[4][1].yValue + 1
        };
      }
      else if (d.st_spectype.charAt(0) == 'K'){
        if(d.pl_orbsmax >= 0.38 && d.pl_orbsmax <= 0.56){
          graphData[4][0].yValue = graphData[4][0].yValue + 1
        }
        else{
          graphData[4][1].yValue = graphData[4][1].yValue + 1
        };
      }
      else if (d.st_spectype.charAt(0) == 'M'){
        if(d.pl_orbsmax >= 0.08 && d.pl_orbsmax <= 0.12){
          graphData[4][0].yValue = graphData[4][0].yValue + 1
        }
        else{
          graphData[4][1].yValue = graphData[4][1].yValue + 1
        };
      }
      //else {
      //  graphData[4][2].yValue = graphData[4][2].yValue + 1
      //}
    
}
function PopData6(graphData,d){
  //graphData.push({xValue : d.pl_name, yValue : d.sy_dist})
  if(d.sy_dist < 1000){
    graphData[0].yValue = graphData[0].yValue + 1
  }
  else if(d.sy_dist >= 1000 && d.sy_dist < 2000){
    graphData[1].yValue = graphData[1].yValue + 1
  }
  else if(d.sy_dist >= 2000 && d.sy_dist < 3000){
    graphData[2].yValue = graphData[2].yValue + 1
  }
  else if(d.sy_dist >= 3000 && d.sy_dist < 4000){
    graphData[3].yValue = graphData[3].yValue + 1
  }
  else if(d.sy_dist >= 4000 && d.sy_dist < 5000){
    graphData[4].yValue = graphData[4].yValue + 1
  }
  else if(d.sy_dist >= 5000 && d.sy_dist < 6000){
    graphData[5].yValue = graphData[5].yValue + 1
  }
  else if(d.sy_dist >= 6000 && d.sy_dist < 7000){
    graphData[6].yValue = graphData[6].yValue + 1
  }
  else if(d.sy_dist >= 7000 && d.sy_dist < 8000){
    graphData[7].yValue = graphData[7].yValue + 1
  }
  else if(d.sy_dist >= 8000){
    graphData[8].yValue = graphData[8].yValue + 1
  }
  else{

    console.log("POR QUE?")
    console.log(d.sy_dist)
  }
}
function PopData7(graphData,d,yearList){
  if(yearList.includes(d.disc_year)){
    for (let i = 0; i < graphData.length; i++){
      if (d.disc_year == graphData[i].xValue){
        graphData[i].yValue = graphData[i].yValue + 1;
        break;
      }
    }
  }
  else{
    yearList.push(d.disc_year);
    graphData.push({xValue : d.disc_year, yValue : 1})
  }
}
function PopData8(graphData,d){
  if(d.pl_rade != '' && d.pl_bmasse != ''){
    graphData.push({Name: d.pl_name, xValue : +d.pl_bmasse, yValue : +d.pl_rade})
  };
  
}
function Data7Fix(graphData){
  graphData.push({xValue : '1993', yValue : 0})
  graphData.sort(function(a, b){return a.xValue - b.xValue});
}

d3.csv('data/exoplanets.csv')
  .then(data => {
    

    let graphData = [
      
      //Graph1: xValue = #Stars, yValue = Frequency
      [   
        {xValue : 1, yValue : 0 },
        {xValue : 2, yValue : 0 },
        {xValue : 3, yValue : 0 },
        {xValue : 4, yValue : 0 }
      ],

      //Data2: xValue = #Planets, yValue = Frequency 
      [
        {xValue : 1, yValue : 0 },
        {xValue : 2, yValue : 0 },
        {xValue : 3, yValue : 0 },
        {xValue : 4, yValue : 0 },
        {xValue : 5, yValue : 0 },
        {xValue : 6, yValue : 0 },
        {xValue : 7, yValue : 0 },
        {xValue : 8, yValue : 0 }
      ],

      //Data3: Number of planets orbiting each star type. xValue = #Star Type, yValue = #Frequency
      [
        {xValue : 'A', yValue : 0 },
        {xValue : 'F', yValue : 0 },
        {xValue : 'G', yValue : 0 },
        {xValue : 'K', yValue : 0 },
        {xValue : 'M', yValue : 0 },
        //{xValue : 'Not Listed', yValue : 0 }
      ],
      //Data4
      [
        {xValue : 'Astrometry', yValue : 0 },
        {xValue : 'Disk Kinematics', yValue : 0 },
        {xValue : 'Eclipse Timing Variations', yValue : 0 },
        {xValue : 'Imaging', yValue : 0 },
        {xValue : 'Microlensing', yValue : 0 },
        {xValue : 'Orbital Brightness Modulation', yValue : 0 },
        {xValue : 'Pulsar Timing', yValue : 0 },
        {xValue : 'Pulsation Timing Variations', yValue : 0 },
        {xValue : 'Radial Velocity', yValue : 0 },
        {xValue : 'Transit', yValue : 0 },
        {xValue : 'Transit Timing Variations', yValue : 0 }
      ],
      //Data5
      [
        {xValue : 'Yes', yValue: 0},
        {xValue : 'No', yValue: 0}
        //{xValue: 'Data Unavailable', yValue: 0}
      ],
      //Data6 NOTE: This will be filled in by PopData6()
      [
        {xValue : '0 - 999', yValue: 0},
        {xValue : '1000 - 1999', yValue: 0},
        {xValue : '2000 - 2999', yValue: 0},
        {xValue : '3000 - 3999', yValue: 0},
        {xValue : '4000 - 4999', yValue: 0},
        {xValue : '5000 - 5999', yValue: 0},
        {xValue : '6000 - 6999', yValue: 0},
        {xValue : '7000 - 7999', yValue: 0},
        {xValue : '8000+', yValue: 0}
      ],
      //Data7
      [
        
      ],
      //Data8
      [

      ]

      //Graph4: Number of planets discovered in different ways
      //Graph5: How many planets are within a habitable zone versus unhabitable Zone
      //  Note: This will require a calculation based on Star type and planet distance.
      //Graph6: Distribution of exoplanets by there distance to us.
      //Graph7: Show exoplanet discovery over time by year
      //Graph8: Show relationships between radius and mass.
    ]

    //G

    let yearList = [];
    //Populate Graph 1 Data: #Stars & Frequency
    data.forEach(d => {
      
      PopDat1(graphData,d);

      //Populate Graph 2
      PopDat2(graphData,d);

      //Populate Graph 3
      PopDat3(graphData,d);

      //Populate Graph 4
      PopDat4(graphData,d);

      //Populate Graph 5
      PopData5(graphData,d);

      //Populate Graph 6
      PopData6(graphData[5],d);

      //Populate Graph 7
      
      PopData7(graphData[6],d,yearList);

      //Populate Graph 8
      PopData8(graphData[7],d);
    

      });

      Data7Fix(graphData[6])
      console.log("Graph 1 Data:");
      console.log(graphData[0]);
      console.log("Graph 2 Data:");
      console.log(graphData[1]);
      console.log("Graph 3 Data:");
      console.log(graphData[2]);
      console.log("Graph 4 Data:");
      console.log(graphData[3]);
      console.log("Graph 5 Data:");
      console.log(graphData[4]);
      console.log("Graph 6 Data:");
      console.log(graphData[5]);
      console.log("Graph 7 Data:");
      console.log(graphData[6]);
      console.log("Graph 8 Data:");
      console.log(graphData[7]);

      
       
      //console.log(d.pl_name);
      //console.log(d.sy_snum);

      //console.log(graphData[0][0].yValue);
      //console.log(graphData[0][1].yValue);
      //console.log(graphData[0][2].yValue);
      //console.log(graphData[0][3].yValue);


      //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    

    // Create an array of objects to store star# frequencies
    
    


    

    // Initialize chart and then show it

    //Graph1: A Bar Chart Comparing how often planets are in systems of different # of stars
    console.log('Creating Bar Chart 1');
    barchart1 = new Barchart1({ parentElement: '#chart1'}, data, graphData[0]);
    barchart1.updateVis();

    //Graph 2: A Bar Chart comparing how often planets are in systems of different # of planets
    console.log('Creating Bar Chart 2');
    barchart2 = new Barchart2({ parentElement: '#chart2'}, data, graphData[1]);
    barchart2.updateVis();

    //Graph 3: A Bar Chart comparing how many planets orbit different star types
    console.log('Creating Bar Chart 3');
    barchart3 = new Barchart3({ parentElement: '#chart3'}, data, graphData[2]);
    barchart3.updateVis();

    //Graph 4: A Bar chart comparing how many planets were discovered by different methods
    console.log('Creating Bar Chart 4');
    barchart4 = new Barchart4({ parentElement: '#chart4'}, data, graphData[3]);
    barchart4.updateVis();

    //Graph 5: A Bar Chart comparing how many planets are in habitable zones vs unhabitable zones
    console.log('Creating Bar Chart 5');
    barchart5 = new Barchart5({ parentElement: '#chart5'}, data, graphData[4]);
    barchart5.updateVis(); 

    //Graph 6: Some kind of chart showing how far different planets are from earth
    console.log('Creating Bar Chart 6');
    barchart6 = new Barchart6({ parentElement: '#chart6'}, data, graphData[5]);
    barchart6.updateVis();
    //Graph 7: A Line Chart Showing how many planets were discovered in each year.
    console.log('Creating Line Chart');
    lineChart = new LineChart({ parentElement: '#chart7'}, data, graphData[6]);
    lineChart.updateVis();
    //Graph 8: A Scatter Plot comparing planets radius with mass
    console.log('Creating Scatterplot');
    scatterPlot = new Scatterplot({parentElement: '#chart8'}, data, graphData[7])
    scatterPlot.updateVis();

    console.log("Min Test");
    console.log(d3.min(graphData[7], d => d.xValue));

  })
.catch(error => console.error(error));


/**
 * Event listener: change ordering
 */
/*
var changeSortingOrder = d3.select("#change-sorting").on("click", function() {
    reverse = !reverse;
    updateVisualization();
});
*/

