import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DangerousIcon from '@mui/icons-material/Dangerous';

export default function TabsWrappedLabel({ setCurrentChart }) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (value === 'one') {
      setCurrentChart('one');
    } else if (value === 'two') {
      setCurrentChart('two');
    } else if (value === 'three') {
      setCurrentChart('three');
    } else if (value === 'four') {
      setCurrentChart('four');
    }
  }, [value, setCurrentChart]);

  return (
    <Box sx={{ width: '100%', borderBottom: '1px solid white' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        textColor="white"
        indicatorColor="primary"
        variant="scrollable" // Makes tabs scrollable
        scrollButtons="auto" // Show scroll buttons automatically when needed
        allowScrollButtonsMobile // Ensures scroll buttons appear on mobile
      >
        <Tab
          value="one"
          icon={<OnDeviceTrainingIcon sx={{ marginRight: 1 }} />}
          label="Models"
          iconPosition="start"
        />
        <Tab
          value="two"
          label="Damages"
          icon={<DangerousIcon sx={{ marginRight: 1 }} />}
          iconPosition="start"
        />
        <Tab
          value="three"
          label="Lines"
          icon={<AddRoadIcon sx={{ marginRight: 1 }} />}
          iconPosition="start"
        />
        <Tab
          value="four"
          label="Scan-Unscan-Reset"
          icon={<PieChartOutlineIcon sx={{ marginRight: 1 }} />}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}
