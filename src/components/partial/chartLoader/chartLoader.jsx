import React, { useEffect,useState } from 'react'
import HorizontalBarChart from '../../../charts/HorizonatlBarChart/HorizontalBarChart'
import CircularColor from '../Loader/Loader'
import { Box } from '@mui/material'
import C_PieChart from '../../../charts/PieChart/PieChart'
import HorizontalBarChartByLines from '../../../charts/HorizontalBarChartByLines/HorizontalBarChartByLines'
import HorizontalBarChartByModels from '../../../charts/BarChart/BarChart'
import axios from 'axios'

function ChartLoader({currentChart}) {
  const [models, setModel] = useState('');
  const [defect, setDefect] = useState('');
  const [lines, setLines] = useState('');
  const [run, setRun] = useState(false);
  const [groupByLines, setGroupByLines] = useState('');
  const [groupByError, setGroupByError] = useState('');
  const [groupByModels, setGroupyModels] = useState('');
  const [loading, setLoading] = useState(true);

  const [modelName, setmodelName] = React.useState([]);
  const [damageName, setdamageName] = React.useState([]);
  const [lineName, setLineName] = useState([]);



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://172.17.43.24:3000/combinedGroup',{models:modelName,defects:damageName,lines:lineName});

      // if (Array.isArray(response.data) && response.data.length > 0) {
        setGroupByError(response.data.data.groupByErrors);
        setGroupByLines(response.data.data.groupByLines);
        setGroupyModels(response.data.data.groupByModels);
        setModel(response.data.uniqueModels);
        setDefect(response.data.uniqueDamage);
        setLines(response.data.uniqueLines);
        console.log(response.data.data.groupByErrors);
        console.log(response.data.data.groupByLines);
        console.log(response.data.data.groupByModels);
      // }
      //  else {
        // console.error('Data is not in the expected format or is empty.');
        // setData([]);
      // }
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (run) {
      fetchData();
    }
    setRun(false);
  },[run])

  useEffect(()=>{
    fetchData();
    console.log("The Program is loading...");
  },[])
  return (
    // <HorizontalBarChart />
    <Box sx={{marginTop:'2rem',minWidth:'100%',minHeight:'200px'}}>
    {currentChart == 'one' && <HorizontalBarChartByModels 
    groupByModels={groupByModels} 
    loading={loading} 
    setRun={setRun} 
    setModel={setModel}
    models={models}
    defect={defect}
    modelName={modelName}
    setModelName={setmodelName}
    damageName={damageName}
    setdamageName={setdamageName}
    lineName={lineName}
    groupByLines={groupByLines}
    lines={lines}
    setLineName={setLineName}
    />}
    {currentChart == 'two' && <HorizontalBarChart groupByErrors={groupByError} 
     loading={loading} 
     setRun={setRun} 
     setModel={setModel}
     models={models}
     defect={defect}
     modelName={modelName}
     setModelName={setmodelName}
     damageName={damageName}
     setdamageName={setdamageName}
     lineName={lineName}
     groupByLines={groupByLines}
     lines={lines}
     setLineName={setLineName}
  />}
    {currentChart == 'three' && <HorizontalBarChartByLines groupByLines={groupByLines} 
    loading={loading}
    setRun={setRun} 
    setModel={setModel}
    models={models}
    defect={defect}
    modelName={modelName}
    setModelName={setmodelName}
    damageName={damageName}
    setdamageName={setdamageName}
    lineName={lineName}
    lines={lines}
    setLineName={setLineName}
    />}
    {currentChart == 'four' && <C_PieChart />}

    </Box>
  )
}

export default ChartLoader