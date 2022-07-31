import * as React from 'react';
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
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
            {children}
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

export default function RegPage() {
    const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Marx" {...a11yProps(0)} />
            <Tab label="Engels" {...a11yProps(1)} />
            <Tab label="Marx+Engels" {...a11yProps(2)} />
            <Tab label="Sources/Translations" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <Outlet />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          Engels
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          Marx+Engels
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
            Sources/Translations
        </TabPanel>
        </div>
    );
}