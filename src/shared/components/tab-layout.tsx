import { Grid, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/system";
import {
  JSXElementConstructor,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export interface TabProps {
  title: string;
  icon:
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
  to: string;
}

export interface TabLayoutProps {
  tabs: Array<TabProps>;
  leftComponent?: JSX.Element;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== "fullWidth",
})(() => ({
  height: "30px",
  minHeight: "10px",
}));

export default function TabLayout({ tabs, leftComponent }: TabLayoutProps) {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const tabIndex = tabs.findIndex(
      (tab) =>
        location.pathname === tab.to || location.pathname.includes(tab.to + "/")
    );
    setValue(tabIndex === -1 ? 0 : tabIndex);
  }, [location, tabs]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent" }}>
      <Grid
        container
        sx={{
          bgcolor: "secondary.main",
          boxShadow: " 0px 2px 10px -3px rgba(0,0,0,0.6);",
          zIndex: "0 !important",
          position: "relative",
        }}
      >
        {/* in case needed to add right side component, set below col values
      xs={7} sm={8} md={9} lg={10} */}
        <Grid
          item
          xs={12}
          sx={{ [theme.breakpoints.down("sm")]: { width: "100vw" } }}
        >
          {value !== null && (
            <StyledTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="scrollable"
              sx={{ height: "40px", minHeight: "10px" }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  sx={{ height: "40px", minHeight: "10px", ml: 1 }}
                  label={tab.title}
                  key={index}
                  iconPosition="start"
                  icon={tab.icon}
                  {...a11yProps(index)}
                  component={Link}
                  to={tab.to}
                />
              ))}
            </StyledTabs>
          )}
        </Grid>
        <Grid
          item
          sm={3}
          md={2}
          xs={5}
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          {leftComponent && (
            <Box sx={{ marginLeft: "auto", mr: 1 }}>{leftComponent}</Box>
          )}
        </Grid>
      </Grid>
      <Outlet />
    </Box>
  );
}
