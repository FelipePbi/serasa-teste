import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab label="DashBoard" {...a11yProps(0)} sx={{ color: 'white' }} />
          <Tab label="Produtores Rurais" {...a11yProps(1)} sx={{ color: 'white' }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Registration />
      </TabPanel>
    </Box>
  );
}
