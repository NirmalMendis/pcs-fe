import {
  Box,
  Divider,
  Stack,
  SvgIconTypeMap,
  Typography,
  Zoom,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";
import { FC } from "react";

export interface DashboardCampStatCardProps {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  color: string;
  values: Array<{
    label: string;
    value: string;
  }>;
  dataTitle: string;
  delay?: string;
}

const OuterBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ color }) => ({
  borderRadius: "5px",
  height: "100%",
  maxHeight: "150px",
  width: "100%",
  maxWidth: "300px",
  backgroundColor: color as string,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  paddingLeft: 15,
  paddingTop: 5,
  paddingBottom: 5,
  paddingRight: 10,
  color: "white",
}));

const ResponsiveOuterBox = styled(OuterBox)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100vw",
  },
}));

const DashboardStatCard: FC<DashboardCampStatCardProps> = ({
  icon,
  color,
  values,
  dataTitle,
  delay,
}) => {
  const InnerIcon = styled(icon)(({ theme }) => ({
    color: theme.palette.secondary.main,
    [theme.breakpoints.up("lg")]: {
      fontSize: 60,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: 60,
    },
  }));

  return (
    <Zoom
      in={true}
      mountOnEnter
      unmountOnExit
      style={{ transitionDelay: delay }}
    >
      <ResponsiveOuterBox color={color}>
        <Grid container spacing={1}>
          <Grid container xs={12}>
            <Grid xs={8}>
              <Stack textAlign="start">
                <Typography fontSize={16} fontWeight={600}>
                  {values[0].label}
                </Typography>
                <Typography fontSize={18}>{values[0].value}</Typography>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <InnerIcon />
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Divider sx={{ backgroundColor: "secondary.main" }} />
            <Typography fontSize={14} fontWeight={600} textAlign={"left"}>
              {dataTitle}
            </Typography>
          </Grid>
          <Grid container xs={12}>
            {values.slice(1, values.length).map((item) => (
              <Grid xs={6} key={item.label}>
                <Stack textAlign="start">
                  <Typography fontSize={12}>{item.label}</Typography>
                  <Typography fontSize={14}>{item.value}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ResponsiveOuterBox>
    </Zoom>
  );
};

export default DashboardStatCard;
