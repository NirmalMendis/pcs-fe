import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const GridToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton variant="text" />
      <GridToolbarFilterButton
        componentsProps={{
          button: {
            variant: "text",
          },
        }}
      />
      <GridToolbarDensitySelector variant="text" />
    </GridToolbarContainer>
  );
};

export default GridToolBar;
