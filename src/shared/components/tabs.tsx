import { Box, Tabs as MuiTabs, Tab, Typography, styled } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
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
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled(MuiTabs, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})(() => ({
  height: "30px",
  minHeight: "10px",
}));

const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})(({ theme }) => ({
  height: "30px",
  minHeight: "10px",
  fontWeight: "bold",
  fontSize: "13px",
  textTransform: "capitalize",
  color: theme.palette.secondary.dark,
  opacity: 0.7,
  "&.Mui-selected": {
    color: theme.palette.primary.dark,
    opacity: 1,
  },
}));

export interface TabProps extends PropsWithChildren {
  tabs: string[];
  currentTab: number;
  changeTab: (value: number) => void;
}

const Tabs: FC<TabProps> = ({ currentTab, changeTab, tabs, children }) => {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number
  ) => {
    if (value !== currentTab) {
      changeTab(value);
    }
  };

  const mappedChildren = React.Children.map(children, (child, index) => {
    // You can perform any manipulation or logic on each child element here
    return (
      <TabPanel value={currentTab} index={index} key={`panel_${index}`}>
        {child}
      </TabPanel>
    );
  });

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "inherit",
          borderBottom: "1px solid",
          borderColor: "secondary.light",
        }}
      >
        <StyledTabs
          // indicatorColor="drawer"
          TabIndicatorProps={{ style: { background: "#707e94" } }}
          value={currentTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          {tabs.map((tab, index) => (
            <StyledTab
              label={tab}
              key={`tab_${index}`}
              {...a11yProps(index)}
              sx={{ p: "0px !important" }}
            />
          ))}
        </StyledTabs>
      </Box>
      <Box>{mappedChildren}</Box>
    </Box>
  );
};

export default Tabs;
