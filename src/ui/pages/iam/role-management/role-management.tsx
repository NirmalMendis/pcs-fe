import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTE_PATHS from "../../../../constants/route-paths";
import PageTitleCard from "../../../../shared/components/page-title-card";
import RolesTable from "./roles-table";

const RoleManagement = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <PageTitleCard>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Role Management</Typography>
          <Button onClick={() => navigate(ROUTE_PATHS.IAM.ADD_ROLE)}>
            Create Role
          </Button>
        </Stack>
      </PageTitleCard>
      <RolesTable />
    </Stack>
  );
};

export default RoleManagement;
