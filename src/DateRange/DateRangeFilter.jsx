import React,{ useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, createTheme, ThemeProvider } from '@mui/material';
import { Box, styled } from '@mui/system';
import dayjs from 'dayjs';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: 'white', // Light color for the label
  },
  '& .MuiInputBase-root': {
    backgroundColor: '#333', // Dark background for the input
    color: 'white', // Light text color for the input
  },
  '& .MuiInputBase-input': {
    color: 'white', // Light text color for the input field
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Light border color
  },
}));

const theme = createTheme({
  palette: {
    mode: 'dark', // Dark theme for MUI
    text: {
      primary: '#fff', // Primary text color
      secondary: '#fff', // Secondary text color
    },
  },
});

export default function DateRangeFilter({setStartDate, setEndDate, setStartingDate, setEndingDate, setValue, value}) {
  // const [value, setValue] = useState([null, null]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const formattedStart = newValue[0] ? dayjs(newValue[0]).format('YYYY-MM-DD') : null;
    const formattedEnd = newValue[1] ? dayjs(newValue[1]).format('YYYY-MM-DD') : null;
    setStartingDate(formattedStart);
    setEndingDate(formattedEnd);
    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    console.log("The value is: ",value);
    console.log('Formatted Start Date:', formattedStart);
    console.log('Formatted End Date:', formattedEnd);
  };

  return (
   <Box style={{width:'200px'}}>
     <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={handleDateChange}
            renderInput={(startProps, endProps) => (
              <>
                <StyledTextField {...startProps} />
                <StyledTextField {...endProps} />
              </>
            )}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
   </Box>
  );
}
