import { Button, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import useGetAllUsers from "../../../../api/user/use-get-all-users";
import usePostCreateUser from "../../../../api/user/use-post-create-user";
import { DEFAULT_PAGE_SIZE } from "../../../../constants/generic-constants";
import { GET_ALL_USER } from "../../../../constants/query-leys";
import PageTitleCard from "../../../../shared/components/page-title-card";
import { OrderDirection } from "../../../../shared/types/generic";
import CRUUserForm, { CRUUserFormValues } from "./cru-user-form";
import UsersTable from "./users-table";

const UserManagement = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: 0,
  });

  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const { data, isFetching: isFetchingUsers } = useGetAllUsers({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    orderBy: "createdAt",
    orderDirection: OrderDirection.DESC,
  });

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: mutatePostCreateUser, isPending: isPendingPostCreateUser } =
    usePostCreateUser();

  const handleOpenCloseCreateUserModal = () => {
    setOpenCreateUserModal((prev) => !prev);
  };

  const handleCreateCustomer = (
    data: CRUUserFormValues,
    reset: UseFormReset<CRUUserFormValues>
  ) => {
    if (data.branches.length && data.branches[0])
      mutatePostCreateUser(
        {
          payload: {
            ...data,
            activeBranchId: +data.branches[0],
          },
        },
        {
          onSuccess: (data) => {
            enqueueSnackbar(`User ${data.name} has been created.`, {
              variant: "success",
            });
            queryClient.invalidateQueries({
              queryKey: [GET_ALL_USER],
            });
            reset();
            setOpenCreateUserModal(false);
          },
        }
      );
  };

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <PageTitleCard>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">User Management</Typography>
          <Button onClick={handleOpenCloseCreateUserModal}>Create User</Button>
        </Stack>
      </PageTitleCard>
      <UsersTable
        users={data?.pageData}
        totalItems={data?.pager.totalItems}
        isFetching={isFetchingUsers}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
      <CRUUserForm
        onSubmit={handleCreateCustomer}
        handleClose={handleOpenCloseCreateUserModal}
        openCreateUserModal={openCreateUserModal}
        isPendingMutation={isPendingPostCreateUser}
      />
    </Stack>
  );
};

export default UserManagement;
