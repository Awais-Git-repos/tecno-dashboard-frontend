import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: 'black', // Background color for the dropdown
      color: 'white', // Text color for the dropdown items
    },
  },
};


function getStyles(name, damageName, theme) {
  return {
    fontWeight:
      damageName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    color: 'white', // Text color for each MenuItem
  };
}


export default function DamageChips({ defect, damageName, setdamageName }) {
    const [modes, setModes] = React.useState('');
  const theme = useTheme();

  // Debugging the defect prop
  React.useEffect(() => {
    console.log('The defect are:', defect);
    // Check if the defect prop is an array and not empty
    setModes(defect[0]);
  }, [defect]);



  const handleChange = (event) => {
    console.log('Selected values:', damageName);
    const {
      target: { value },
    } = event;
    setdamageName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
   modes &&  <div>
   <FormControl sx={{ m: 1, width: 300 }}>
     <InputLabel id="demo-multiple-chip-label" sx={{ color: 'white' }}>
       Filter By defect
     </InputLabel>
     <Select
       labelId="demo-multiple-chip-label"
       id="demo-multiple-chip"
       multiple
       value={damageName}
       onChange={handleChange}
       input={
         <OutlinedInput
           id="select-multiple-chip"
           label="Filter By defect"
           sx={{ color: 'white', borderColor: 'white' }}
         />
       }
       renderValue={(selected) => (
         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
           {selected.map((value) => (
             <Chip key={value} label={value} sx={{ color: 'white', backgroundColor: '#333' }} />
           ))}
         </Box>
       )}
       MenuProps={MenuProps}
       sx={{
         color: 'white', // Text color for selected value
         '.MuiOutlinedInput-notchedOutline': {
           borderColor: 'white', // Border color for the input box
         },
         '&:hover .MuiOutlinedInput-notchedOutline': {
           borderColor: 'white', // Hover border color
         },
         '& .MuiSvgIcon-root': {
           color: 'white', // Icon color
         },
       }}
     >
       {modes.map((model, index) => (
         <MenuItem
           key={model} // Use index as key if names might not be unique
           value={model}
           style={getStyles(model, damageName, theme)}
         >
           {model}
         </MenuItem>
       ))}
     </Select>
   </FormControl>
 </div>
  );
}
