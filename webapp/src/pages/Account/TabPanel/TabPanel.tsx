import React from "react";
import {
  Box,
  Typography
} from "@material-ui/core";

interface Props {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel (props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}