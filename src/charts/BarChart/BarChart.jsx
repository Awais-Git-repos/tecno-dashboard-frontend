import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularColor from '../../components/partial/Loader/Loader';
import axios from 'axios';
import { Button,Grid2 } from '@mui/material';
import FilterByModels from '../../components/AutoComplete/FilterByModels.jsx';
import FilterByDefects from '../../components/AutoComplete/FilterByDefects.jsx';
import FilterByLines from '../../components/AutoComplete/FilterByLines.jsx';
import DateRangeFilter from '../../DateRange/DateRangeFilter.jsx';
import BasicTable from '../../TableComponent.jsx';

const CustomLegend = (props) => {
  const { payload, scanned,unscanned,reset,setScanned, setUnscanned, setReset } = props; // Access the legend values
  const status = ["Scanned","Unscanned","Reset"]
  const colors = ["#64bc8c","#e4b434","#a47cdc"]
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

// Custom Tooltip Component
// const CustomToolTip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     // Sort payload for tooltip
//     const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
//     const modelData = sortedPayload[0]?.payload; // Get model data from payload

//     return (
//       <div
//         style={{
//           backgroundColor: 'rgba(10, 13, 32, 0.6)',
//           backdropFilter: 'blur(10px)',
//           padding: '1rem',
//           borderRadius: '10px',
//         }}
//       >
//         <h3 style={{ color: 'white', marginLeft: '1rem', marginTop: '1rem' }}>
//           {label}
//         </h3>
//         <ul style={{ listStyle: 'none' }}>
//           {sortedPayload.map(
//             (dt) =>
//               dt.value !== 0 && (
//                 <li
//                   key={dt.name}
//                   style={{
//                     color: dt.fill,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     minWidth: '200px',
//                   }}
//                 >
//                   <div>{dt.name}</div>
//                   <div>{dt.value}</div>
//                 </li>
//               )
//           )}
//         </ul>

//         {/* Display Top Lines */}
//         <h4 style={{ color: '#ffffff', marginTop: '1rem' }}>Top Lines:</h4>
//         <ul style={{ listStyle: 'none', paddingLeft: 0,}}>
//           {modelData?.topLines?.map((line, index) => (
//             <li key={index} style={{ 
//               color: '#ffffff',
//                display: 'flex',
//               justifyContent: 'space-between',
//               // border:'1px solid white',
//               minWidth: '200px', }}>
//                 <div>{line.line}</div>
//                 <div>{line.qty}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
//   return null;
// };
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
        <h4 style={{ color: '#ffffff', marginTop: '1rem' }}>Top Lines:</h4>
  
        <BasicTable topLines={modelData?.topLines} />
      </div>
    );
  }
  return null;
};









// Main Component
function HorizontalBarChartByModels({
  groupByModels,
  loading, setModel, setRun,models,setModelName,modelName,groupByError,
  damageName, setdamageName, defect,lineName,groupByLines,lines,setLineName,
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
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupByModels) {
      const sorted = [...groupByModels].sort((a, b) => b.error - a.error);
      setSortedData(sorted);
    }
  }, [groupByModels]);

  useEffect(()=>{
    console.log("The lines is: ",lines);
  },[lines])

  return loading ? (
    <CircularColor />
  ) : (
     sortedData ? <ResponsiveContainer width="120%" height={600}>
     <h1 style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'gray' }}>
       Top Affected Models
     </h1>
     
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
       width={1200}
       height={400}
       data={sortedData}
       layout="vertical"
       margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
     >
       <XAxis type="number" />
       <YAxis type="category" dataKey="Name" stroke="#ffffff" />
       <Tooltip content={<CustomToolTip />} />
       <Legend content={(props)=>{return <CustomLegend {...props} scanned={scanned} unscanned={unscanned} reset={reset} setScanned={setScanned} setUnscanned={setUnscanned} setReset={setReset}/>}} wrapperStyle={{ color: '#ffffff' }} />
      {scanned &&  <Bar
         dataKey="scanned"
         stackId="a"
         fill="#64bc8c"
         barSize={20}
         name="Scanned"
       />
       }
      {unscanned && 
       <Bar
       dataKey="unscanned"
       stackId="a"
       fill="#e4b434"
       barSize={20}
       name="Unscanned"
     />
      }
       {reset &&
       <Bar dataKey="reset" stackId="a" fill="#a47cdc" barSize={20} name="Reset" />

       }
     </BarChart>
   </ResponsiveContainer>: <h3>No any data to show</h3>
  );
}

export default HorizontalBarChartByModels;

