import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CircularColor from '../../components/partial/Loader/Loader'; // Assuming you have this component
import MultipleSelectChip from '../../components/Chips/Chips';
import DamageChips from '../../components/Chips/DamageChips';
import FilterByDefects from '../../components/AutoComplete/FilterByDefects';
import FilterByModels from '../../components/AutoComplete/FilterByModels';
import FilterByLines from '../../components/AutoComplete/FilterByLines';
import { Button, Grid2 } from '@mui/material';

// Custom YAxis Tick Component
const CustomYAxisTick = (props) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="#ffffff"
      fontSize={12}
    >
      {value}
    </text>
  );
};

// Custom Tooltip Component
const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Sort payload for tooltip
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    const modelData = sortedPayload[0]?.payload; // Get model data from payload

    return (
      <div
        style={{
          backgroundColor: 'rgba(10, 13, 32, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '1rem',
          borderRadius: '10px',
        }}
      >
        <h3 style={{ color: 'white', marginLeft: '1rem', marginTop: '1rem' }}>
          {label}
        </h3>
        <ul style={{ listStyle: 'none' }}>
          {sortedPayload.map(
            (dt) =>
              dt.value !== 0 && (
                <li
                  key={dt.name}
                  style={{
                    color: dt.fill,
                    display: 'flex',
                    justifyContent: 'space-between',
                    minWidth: '200px',
                  }}
                >
                  <div>{dt.name}</div>
                  <div>{dt.value}</div>
                </li>
              )
          )}
        </ul>

        {/* Display Top Lines */}
        <h4 style={{ color: '#ffffff', marginTop: '1rem' }}>Top Models:</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0}}>
          {modelData?.topModels?.map((line, index) => (
            <li key={index} style={{ 
              color: '#ffffff',
               display: 'flex',
              justifyContent: 'space-between',
              // border:'1px solid white',
              minWidth: '200px', }}>
                <div>{line.model}</div>
                <div>{line.qty}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};


// const CustomLegend = ({payload,setScanned, setUnscanned, setReset})=>{
//   const legend = ["scanned","unscanned","reset"]
//   return (
//     <>
//     <ul style={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid white'}}>
//       {payload.map((dt)=>{
//         return <li 
//         onClick={()=>{
//           if (dt.dataKey == 'scanned') {
//             setScanned(!false);
//           }
//           else if(dt.data == 'unscanned'){
//             setUnscanned(!false);
//           }
//           else if(dt.data == 'reset'){
//             setReset(!false);
//           }
//         }}
//         key={dt.dataKey} style={{color:`${dt.color}`,paddingRight:'3rem'}}>{dt.value}</li>
//       })}
//       {
//       legend.map((dt,index)=>{
//       const check = payload.find((dt)=>{dt.dataKey == legend[index]});
//       return <li
      
//        ></li>
//       })
//       }
//     </ul>
//       </>
//   )
// }


// Main Component
function HorizontalBarChartByLines({groupByLines,loading,  
  setRun,
  setModel,
  models,
  defect,
  modelName,
  setModelName,
  damageName,
  setdamageName,
  lineName,
  lines,
  setLineName
}) {


  // const [notDisplay, setNotDisplay] = useState({e,unscanned:false,reset:false});
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  // const [loading, setLoading] = useState(true); // Add loading state

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get("http://localhost:3000/groupByLines");

      if (Array.isArray(response.data) && response.data.length > 0) {
        setData(response.data);
      } else {
        console.error("Data is not in the expected format or is empty.");
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Fetch data on component mount
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Sort data whenever `data` changes
  useEffect(() => {
    if (groupByLines) {
      const sorted = [...groupByLines].sort((a, b) => b.error - a.error); // Sorting in descending order
      setSortedData(sorted);
    }
  }, [groupByLines]);

  return (
    loading ? ( // Conditional rendering based on loading state
      <CircularColor />
    ) : (
     sortedData ?  <ResponsiveContainer width="120%" height={500}>
     <h1 style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'gray' }}>Top Affected Lines</h1>
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'0.3rem'}}>
 {/* <SelectionBox /> */}
 {/* <MultipleSelectChip models={models} modelName={modelName} setModelName={setModelName}/> */}
 {/* <Grid2 spacing={2} alignItems={'center'} container> */}
   {/* <Grid2 item xs={12} sm={6}> */}
 <FilterByModels models={models} modelName={modelName} setModelName={setModelName}/>
 {/* </Grid2> */}
 {/* <DamageChips defect={defect} damageName={damageName} setdamageName={setdamageName}/> */}
 {/* <Grid2 item xs={12} sm={6}> */}
 <FilterByDefects defect={defect} damageName={damageName} setdamageName={setdamageName}/>
 {/* </Grid2> */}
 {/* <Grid2 item xs={12} sm={6}> */}
 <FilterByLines lines={lines} lineName={lineName} setLineName={setLineName}/>
 {/* </Grid2> */}
 <div>
 <Button onClick={()=>{setRun(true)}} variant='contained' sx={{marginTop:'1rem'}}>RUN Query</Button>
 </div>
 {/* </Grid2> */}
 {/* <Button onClick={()=>{setModel(['A667L'])}}>A667L</Button> */}

  </div>
     <BarChart
       width={1200}
       height={400}
       data={sortedData} // Use sortedData instead of data
       layout="vertical"
       margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
     >
       <XAxis type="number" />
       <YAxis type="category" dataKey="Name" stroke="#ffffff" />
       <Tooltip content={<CustomToolTip />} />
       <Legend  wrapperStyle={{ color: '#ffffff' }}/>
       <Bar dataKey="scanned" stackId="a" fill="#64bc8c" barSize={20} name="Scanned" />
     <Bar dataKey="unscanned" stackId="a" fill="#e4b434" barSize={20} name="Unscanned" />
      <Bar dataKey="reset" stackId="a" fill="#a47cdc" barSize={20} name="Reset" />
     </BarChart>
   </ResponsiveContainer> : <h3>No any data to show</h3>
    )
  );
}

export default HorizontalBarChartByLines;
