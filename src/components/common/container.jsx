import React from 'react'
import { Box } from '@mui/material'

function C_container({children,style}) {
  return (
    <Box sx={{width:'80%',...style}}>
        {children}
    </Box>
  )
}

export default C_container