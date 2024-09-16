import React, { useState } from 'react'
import C_container from '../../components/common/container'
import one from '../../assets/one.jpeg'
import logo from '../../assets/tecno_logo.jpeg'
import { Box } from '@mui/material'
import TabsWrappedLabel from '../../components/partial/Tabs/Tabs'
import ChartLoader from '../../components/partial/chartLoader/chartLoader'


const TecnoLogo = ()=>{
   return <Box sx={{width:'100px',height:'100px',position:'absolute',bottom:-50,left:'20%',borderRadius:'50%'}}>
        <img src={logo} alt="" style={{width:'100%',height:'100%',objectFit:'inherit',borderRadius:'50%'}}/>
    </Box>
}

function Home() {
    const [currentChart, setCurrentChart] = useState('');
  return (
    <>
   <Box sx={{width:'100%',position:'relative',border:'1px solid white'}}>
    <C_container style={{width:'100%',border:'1px solid black',height:'230px'}}>
        <img src={one} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
    </C_container>
    <TecnoLogo />
   </Box>
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'4rem'}}>
    <C_container style={{width:'60%'}}>
        <h1>DEFECTS LIBRARY</h1>
    </C_container>
   </Box>
   <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3rem'}}>
    <C_container style={{width:'60%'}}>
        <TabsWrappedLabel setCurrentChart={setCurrentChart}/>
        <ChartLoader currentChart={currentChart}/>
    </C_container>
   </Box>
   </>
  )
}

export default Home