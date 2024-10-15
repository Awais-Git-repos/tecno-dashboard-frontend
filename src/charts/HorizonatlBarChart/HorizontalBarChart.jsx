import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CircularColor from '../../components/partial/Loader/Loader'; // Assuming you have this component
import { Button, Grid2 } from '@mui/material';
import MultipleSelectChip from '../../components/Chips/Chips';
import DamageChips from '../../components/Chips/DamageChips';
import FilterByDefects from '../../components/AutoComplete/FilterByDefects';
import FilterByModels from '../../components/AutoComplete/FilterByModels';
import FilterByLines from '../../components/AutoComplete/FilterByLines';
import DateRangeFilter from '../../DateRange/DateRangeFilter';

const CustomLegend = (props) => {
  const { payload, scanned,unscanned,reset,setScanned, setUnscanned, setReset } = props; // Access the legend values
  const status = ["Scanned","Unscanned","Reset"]
  const colors = ["#c4c4c4","#e45c5c","#a47cdc"]
  return (
    <div style={{ color: '#ffffff',display:'flex',justifyContent:'center' }}>
      {status.map((entry, index) => (
        <span onClick={()=>{
          if(entry == "Scanned"){
            setScanned(!scanned)
          }
          else if(entry == "Unscanned"){
            setUnscanned(!unscanned)
          }
          else if(entry == "Reset"){
            setReset(!reset)
          }
        }} key={`item-${index}`} style={{ marginRight: 10 }}>
          {/* Access the legend value (entry.value) */}
          <span style={{ color: colors[index] }}>{entry}</span>
        </span>
      ))}
    </div>
  );
};

const CustomYAxisTick = (props) => {
  const { x, y, stroke, value } = props;
  return (
    <text
      x={x}
      y={y}
      dy={16} // Adjust as needed
      textAnchor="middle"
      fill="#ffffff" // Color of the labels
      fontSize={12} // Adjust font size as needed
    >
      {value}
    </text>
  );
};

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


function HorizontalBarChart({groupByErrors,loading, setModel, setRun,models,setModelName,modelName,groupByError,
  lines,setLineName,
  lineName,
  damageName, setdamageName, defect,
  setStartDate,
  setEndDate,
  setStartingDate,
  setEndingDate,
  setValue,
  value

}) {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [scanned, setScanned] = useState(true);
  const [unscanned, setUnscanned]= useState(true);
  const [reset, setReset] = useState(true);
  // const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get("http://localhost:3000/groupByErrors");
      console.log("The data from the server is: ", response.data);
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

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (groupByErrors) {
      const sorted = [...groupByErrors].sort((a, b) => b.error - a.error);
      setSortedData(sorted);
    }
  }, [groupByErrors]);

  return (
    loading ? ( // Conditional rendering based on loading state
      <CircularColor />
    ) : (
     sortedData ?  <ResponsiveContainer width="120%" height={500}>
     <h1 style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'gray' }}>Top Listed Damages | Prior to Control</h1>
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
 <DateRangeFilter
 setStartDate={setStartDate} setEndDate={setEndDate}
 setStartingDate={setStartingDate}
 setEndingDate={setEndingDate}
 setValue={setValue}
 value={value}
  />
 <div>
 <Button onClick={()=>{setRun(true)}} variant='contained' sx={{marginTop:'1rem'}}>RUN Query</Button>
 </div>
 {/* </Grid2> */}
 {/* <Button onClick={()=>{setModel(['A667L'])}}>A667L</Button> */}

  </div>
     <BarChart
       width={1200} // Increase the width to allow more space
       height={400} // Adjust height as needed
       data={sortedData} // Use sortedData instead of data
       layout="vertical" // Use 'vertical' for horizontal bars
       margin={{
         top: 5,
         right: 50, // Adjust margins for better label spacing
         left: 0,
         bottom: 5,
       }}
     >
       <XAxis type="number" />
       <YAxis 
         type="category" 
         dataKey="Name" 
         width={160}
         tick={{ fontSize: 15, textAnchor: 'end', height: '100px' }}
         stroke="#ffffff"
       />
       <Tooltip content={<CustomToolTip />} />
       {/* <Legend wrapperStyle={{ color: '#ffffff' }} /> */}
       <Legend content={(props)=>{return <CustomLegend {...props} scanned={scanned} unscanned={unscanned} reset={reset} setScanned={setScanned} setUnscanned={setUnscanned} setReset={setReset}/>}} wrapperStyle={{ color: '#ffffff' }} />

       {scanned && <Bar
         dataKey="scanned"
         stackId="a"
         fill="#c4c4c4" // Gray
         barSize={20}
         name="Scanned"
       />}
       {unscanned && <Bar
         dataKey="unscanned"
         stackId="a"
         fill="#e45c5c" // Red
         barSize={20}
         name="Unscanned"
       />}
       {reset && <Bar
         dataKey="reset"
         stackId="a"
         fill="#a47cdc" // Purple
         barSize={20}
         name="Reset"
       />}
     </BarChart>
   </ResponsiveContainer> : <h3>No any data to show</h3>
    )
  );
}

export default HorizontalBarChart;
