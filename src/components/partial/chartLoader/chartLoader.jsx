import React, { useEffect,useState } from 'react'
import HorizontalBarChart from '../../../charts/HorizonatlBarChart/HorizontalBarChart'
import CircularColor from '../Loader/Loader'
import { Box } from '@mui/material'
import C_PieChart from '../../../charts/PieChart/PieChart'
import HorizontalBarChartByLines from '../../../charts/HorizontalBarChartByLines/HorizontalBarChartByLines'
import HorizontalBarChartByModels from '../../../charts/BarChart/BarChart'
import HorizontalBarChartByRatio from '../../../charts/HorizontalBarChartByRatio/HorizontalBarChartByRatio'
import axios from 'axios'

function ChartLoader({currentChart, setRunning, setModelsName, setStartingDate, setEndingDate, setLinesName}) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [models, setModel] = useState('');
  const [defect, setDefect] = useState('');
  const [lines, setLines] = useState('');
  const [run, setRun] = useState(false);
  const [groupByLines, setGroupByLines] = useState('');
  const [groupByError, setGroupByError] = useState('');
  const [groupByModels, setGroupyModels] = useState('');
  const [groupByRatio, setGroupByRatio] = useState('');
  const [loading, setLoading] = useState(true);

  const [modelName, setmodelName] = React.useState([]);
  const [damageName, setdamageName] = React.useState([]);
  const [lineName, setLineName] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [value, setValue] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://${backendUrl}/combinedGroup`,{models:modelName,defects:damageName,lines:lineName,startDate,endDate});

    
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

  const fetchRatio = async()=>{
    try {
      const response = await axios.post(`http://${backendUrl}/defectsRatio`,{models:modelName,lines:lineName,defectsDescription:damageName,startDate,endDate})
      console.log("The Defects Ratio: ",response.data);
      setGroupByRatio(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(()=>{
    if (run) {
      fetchData();
      fetchRatio();
      setModelsName(modelName);
      setLinesName(lineName);
      setRunning(true);
    }
    setRun(false);
  },[run])

  useEffect(()=>{
    fetchData();
    fetchRatio();
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
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setStartingDate={setStartingDate}
    setEndingDate={setEndingDate}
    setValue={setValue}
    value={value}
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
     setStartDate={setStartDate}
     setStartingDate={setStartingDate}
     setEndingDate={setEndingDate}
    setEndDate={setEndDate}
    setValue={setValue}
    value={value}
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
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setStartingDate={setStartingDate}
    setEndingDate={setEndingDate}
    setValue={setValue}
    value={value}
    />}
    {currentChart == 'four' && <C_PieChart />}
    {currentChart == 'five' && <HorizontalBarChartByRatio 
    datas={groupByRatio} 
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
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setStartingDate={setStartingDate}
    setEndingDate={setEndingDate}
    setValue={setValue}
    value={value}
    />}

    </Box>
  )
}

export default ChartLoader