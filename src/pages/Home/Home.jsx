import React, { useState, useEffect } from 'react'
import C_container from '../../components/common/container'
import one from '../../assets/one.jpeg'
import logo from '../../assets/tecno_logo.jpeg'
import { Box } from '@mui/material'
import TabsWrappedLabel from '../../components/partial/Tabs/Tabs'
import ChartLoader from '../../components/partial/chartLoader/chartLoader'
import DonutChartCard from '../../shortCards/ShortCards'
import axios from 'axios'


const TecnoLogo = ()=>{
   return <Box sx={{width:'100px',height:'100px',position:'absolute',bottom:-50,left:'20%',borderRadius:'50%'}}>
        <img src={logo} alt="" style={{width:'100%',height:'100%',objectFit:'inherit',borderRadius:'50%'}}/>
    </Box>
}

function Home() {
    const [currentChart, setCurrentChart] = useState('');
    const [visible, setVisible] = useState(false);
    const [running, setRunning] = useState(false);
    const [modelsName, setModelsName] = useState('');
    const [inspectedQty, setInspectedQty] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');

    const fetchInspectedQty = async()=>{
      try {
        const response = await axios.post("http://localhost:3000/inspectedQty",{models:modelsName,startDate:startingDate,endDate:endingDate});
        console.log("InspectedQty----",response.data);
        setInspectedQty(response.data);
      } catch (error) {
        console.log(error);      
      }
    }

    useEffect(()=>{
      if (running) {
    fetchInspectedQty();
      }
      setRunning(false);
    },[running])

  useEffect(() => {
    // Trigger the transition effect after the component mounts
    setVisible(true);
    fetchInspectedQty();

  }, []);

  return (
    <>
   <Box sx={{width:'100%',position:'relative'}}>
    <div style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      opacity: visible ? 1 : 0, // Transition from invisible to visible
      transform: visible ? 'translateY(0)' : 'translateY(-20px)', // Slide in effect
      transition: 'opacity 0.5s ease, transform 0.5s ease' // Smooth transition
    }}>
        <a href="http://172.17.43.24:4174/" style={{color:'white',textDecoration:'none',cursor:'pointer'}}>Home</a>
    </div>
    <C_container style={{width:'100%',border:'1px solid black',height:'230px'}}>
        <img src={one} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </C_container>
    <TecnoLogo />
   </Box>
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'4rem',position:'relative'}}>
    <C_container style={{width:'60%'}}>
        <h1>DEFECTS LIBRARY</h1>
    </C_container>
   </Box>
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3rem',position:'relative'}}>
    <div style={{width:'200px',marginRight:'1rem',marginTop:'13rem'}}>
   <DonutChartCard  inspectedQty={inspectedQty}/>
   </div>
    <C_container style={{width:'60%',marginRight:'13rem'}}>
        <TabsWrappedLabel setCurrentChart={setCurrentChart}/>
        <ChartLoader currentChart={currentChart} setRunning={setRunning} setModelsName={setModelsName}
        setStartingDate={setStartingDate}
        setEndingDate={setEndingDate}
        />
    </C_container>
   </Box>
   </>
  )
}

export default Home