import type { ReactNode } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

/** Generic, reusable accessible tab panel wrapper. */
export default function TabPanel({ children, value, index }: TabPanelProps) {
  const active = value === index;
  return (
    <Box
      role="tabpanel"
      hidden={!active}
      id={`unit-tabpanel-${index}`}
      aria-labelledby={`unit-tab-${index}`}
    >
      {active && <Box sx={{ pt: 4 }}>{children}</Box>}
    </Box>
  );
}

export function tabA11yProps(index: number) {
  return {
    id: `unit-tab-${index}`,
    'aria-controls': `unit-tabpanel-${index}`,
  };
}
