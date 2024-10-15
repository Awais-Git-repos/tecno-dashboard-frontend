// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
// import CircularColor from '../../components/partial/Loader/Loader'; // Assuming you have this component
// import MultipleSelectChip from '../../components/Chips/Chips';
// import DamageChips from '../../components/Chips/DamageChips';
// import FilterByDefects from '../../components/AutoComplete/FilterByDefects';
// import FilterByModels from '../../components/AutoComplete/FilterByModels';
// import FilterByLines from '../../components/AutoComplete/FilterByLines';
// import { Button, Grid2 } from '@mui/material';

// const CustomToolTip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       // Sort payload for tooltip
//       const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
//       const modelData = sortedPayload[0]?.payload; // Get model data from payload
  
//       return (
//         <div
//           style={{
//             backgroundColor: 'rgba(10, 13, 32, 0.6)',
//             backdropFilter: 'blur(10px)',
//             padding: '1rem',
//             borderRadius: '10px',
//           }}
//         >
//           <h3 style={{ color: 'white', marginLeft: '1rem', marginTop: '1rem' }}>
//             {label}
//           </h3>
//           <ul style={{ listStyle: 'none' }}>
//             {sortedPayload.map(
//               (dt) =>
//                 dt.value !== 0 && (
//                   <li
//                     key={dt.name}
//                     style={{
//                       color: dt.fill,
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       minWidth: '200px',
//                     }}
//                   >
//                     <div>{dt.name}</div>
//                     <div>{dt.value}</div>
//                   </li>
//                 )
//             )}
//           </ul>
  
//           {/* Display Top Lines */}
//         </div>
//       );
//     }
//     return null;
//   };
  

// // Main Component
// function HorizontalBarChartByRatio({groupByRatio,loading,  
//     setRun,
//     setModel,
//     models,
//     defect,
//     modelName,
//     setModelName,
//     damageName,
//     setdamageName,
//     lineName,
//     lines,
//     setLineName
//   }) {
  
  
//     // const [notDisplay, setNotDisplay] = useState({e,unscanned:false,reset:false});
//     const [data, setData] = useState([]);
//     const [sortedData, setSortedData] = useState([]);
//     // const [loading, setLoading] = useState(true); // Add loading state
//     // Fetch data on component mount
//     // useEffect(() => {
//     //   fetchData();
//     // }, []);
  
//     // Sort data whenever `data` changes
//     useEffect(() => {
//       if (groupByRatio) {
//         const sorted = [...groupByRatio].sort((a, b) => b.totalDefectsDescriptionQty - a.totalDefectsDescriptionQty); // Sorting in descending order
//         setSortedData(sorted);
//         console.log("The sorted data is: ",sortedData);
//       }
//     }, [groupByRatio]);
  
//     return (
//       loading ? ( // Conditional rendering based on loading state
//         <CircularColor />
//       ) : (
//        sortedData ?  <ResponsiveContainer width="120%" height={500}>
//        <h1 style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'gray' }}>Top Affected Lines</h1>
//        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'0.3rem'}}>
//    {/* <SelectionBox /> */}
//    {/* <MultipleSelectChip models={models} modelName={modelName} setModelName={setModelName}/> */}
//    {/* <Grid2 spacing={2} alignItems={'center'} container> */}
//      {/* <Grid2 item xs={12} sm={6}> */}
//    <FilterByModels models={models} modelName={modelName} setModelName={setModelName}/>
//    {/* </Grid2> */}
//    {/* <DamageChips defect={defect} damageName={damageName} setdamageName={setdamageName}/> */}
//    {/* <Grid2 item xs={12} sm={6}> */}
//    <FilterByDefects defect={defect} damageName={damageName} setdamageName={setdamageName}/>
//    {/* </Grid2> */}
//    {/* <Grid2 item xs={12} sm={6}> */}
//    <FilterByLines lines={lines} lineName={lineName} setLineName={setLineName}/>
//    {/* </Grid2> */}
//    <div>
//    <Button onClick={()=>{setRun(true)}} variant='contained' sx={{marginTop:'1rem'}}>RUN Query</Button>
//    </div>
//    {/* </Grid2> */}
//    {/* <Button onClick={()=>{setModel(['A667L'])}}>A667L</Button> */}
  
//     </div>
//        <BarChart
//          width={1200}
//          height={400}
//          data={sortedData} // Use sortedData instead of data
//          layout="vertical"
//          margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
//        >
//          {/* <XAxis type="number" dataKey={"totalDefectsDescriptionQty"} /> */}
//          <XAxis 
//     type="number" 
//     dataKey={"totalDefectsDescriptionQty"} // Map XAxis to totalDefectsDescriptionQty 
//     tickFormatter={(value) => value.toFixed(0)} // Optional: if you want to round off values
//   />
//          <YAxis type="category" dataKey="model" stroke="#ffffff" />
//          <Tooltip content={<CustomToolTip />} />
//          <Legend  wrapperStyle={{ color: '#ffffff' }}/>
//          <Bar dataKey="scanned" stackId="a" fill="#64bc8c" barSize={20} name="scanned" />
//        <Bar dataKey="unscanned" stackId="a" fill="#e4b434" barSize={20} name="unscanned" />
//         <Bar dataKey="reset" stackId="a" fill="#a47cdc" barSize={20} name="reset" />
//        </BarChart>
//      </ResponsiveContainer> : <h3>No any data to show</h3>
//       )
//     );
//   }
  
//   export default HorizontalBarChartByRatio;
  
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { FiCheckCircle, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'; // Icons for scanned, unscanned, and reset
import FilterByDefects from '../../components/AutoComplete/FilterByDefects';
import FilterByLines from '../../components/AutoComplete/FilterByLines';
import FilterByModels from '../../components/AutoComplete/FilterByModels';
import axios from 'axios';
import CircularColor from '../../components/partial/Loader/Loader'; // Assuming you have this component

const RatioCard = ({ model, totalDefectsDescriptionQty, scanned, unscanned, reset,

 }) => {
  const getColorForScanned = (scannedValue) => {
    if (scannedValue >= 60) return '#e11d48'; // Green for high scanned
    if (scannedValue < 40) return ' #22c55e';  // Red for low scanned
    return '#f59e0b';  // Yellow for moderate scanned
  };

  const scannedColor = getColorForScanned(scanned);

  const trendData = [
    { value: scanned },
    { value: scanned * 0.9 },
    { value: scanned * 1.05 },
    { value: scanned * 0.95 },
    { value: scanned }
  ];

  return (
    <>
 
    <Card 
    // style={{ background: 'linear-gradient(135deg, #1e293b 30%, #111827 100%)', color: 'white', margin: '1rem', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
    style={{
      backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 2,
        maxWidth: 300,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',  
    }}
    >
      <CardContent>
        <Typography variant="h5" component="div" style={{ fontWeight: '600' }}>
          {model}
        </Typography>
        <Typography variant="h3" component="div" style={{ margin: '10px 0', fontWeight: '700' }}>
          {totalDefectsDescriptionQty}
        </Typography>
        
        {/* Icons + Text for scanned, unscanned, reset */}
        <Box  alignItems="center" justifyContent="space-between" marginTop="20px" sx={{minWidth:'200px'}}>
          <Box display="flex" alignItems="center">
            <FiCheckCircle size={22} color={scannedColor} style={{ marginRight: '8px' }} />
            <Typography variant="body1" style={{ color: scannedColor }}>
              {scanned}% Scanned
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{marginTop:'0.5rem'}} >
            <FiAlertTriangle size={22} color="#f59e0b" style={{ marginRight: '8px' }} />
            <Typography variant="body1">
              {unscanned}% Unscanned
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{marginTop:'0.5rem'}}>
            <FiRefreshCw size={22} color="#6b7280" style={{ marginRight: '8px' }} />
            <Typography variant="body1">
              {reset}% Reset
            </Typography>
          </Box>
        </Box>

        {/* Line Chart */}
        <div style={{ height: '80px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={scannedColor}
                dot={false}
                strokeWidth={2}
                animationDuration={2500} // Added animation for smoother chart
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    </>
  );
};

// Main component
const RatioCardLayout = ({
  models,
  modelName,
  setModelName,
  defect,
  damageName,
  setdamageName,
  lines,
  lineName,
  setLineName,
  setRun,
  datas
}) => {
  const [data, setData] = useState('');
  // const data = [
  //   { totalDefectsDescriptionQty: 254, model: "CL8", scanned: 35, unscanned: 65, reset: 0 },
  //   { totalDefectsDescriptionQty: 2052, model: "KL5", scanned: 53.7, unscanned: 46.3, reset: 0 },
  //   { totalDefectsDescriptionQty: 7120, model: "CL6", scanned: 65.3, unscanned: 34.7, reset: 0 },
  //   { totalDefectsDescriptionQty: 1009, model: "CLA5", scanned: 50.4, unscanned: 49.6, reset: 0 }
  // ];

  useEffect(()=>{
    if(datas){
      const sorted = [...datas].sort((a, b) => b.totalDefectsDescriptionQty - a.totalDefectsDescriptionQty); // Sorting in descending order
    setData(sorted);
    }
    console.log("--Unique is: ",datas);
  },[datas])

  return (
    <>
    <h1 style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'gray' }}>Ratios</h1>
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'0.3rem',width:"120%"}}>
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
    {data.length > 0 && <Grid container spacing={3} mt={2} sx={{marginBottom:'5rem'}}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.model}>
          <RatioCard
            model={item.model}
            totalDefectsDescriptionQty={item.totalDefectsDescriptionQty}
            scanned={item.scanned}
            unscanned={item.unscanned}
            reset={item.reset}
          />
        </Grid>
      ))}
    </Grid>}
    </>
  );
};

export default RatioCardLayout;
