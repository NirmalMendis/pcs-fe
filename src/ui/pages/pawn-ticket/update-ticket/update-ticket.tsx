import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeletePawnTicket from "../../../../api/pawn-ticket/use-delete-pawn-ticket";
import useGetPawnTicketById from "../../../../api/pawn-ticket/use-get-pawn-ticket-by-id";
import useGetRevisionIds from "../../../../api/pawn-ticket/use-get-revision-ids";
import usePatchUpdateInvoice from "../../../../api/pawn-ticket/use-patch-update-invoice";
import usePatchUpdatePawnTicketGeneral from "../../../../api/pawn-ticket/use-patch-update-pawn-ticket-general";
import usePostCreateRevision from "../../../../api/pawn-ticket/use-post-create-revision";
import { TYPING_TIMEOUT_FOR_SEARCH } from "../../../../constants/generic-constants";
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from "../../../../constants/iam-constants";
import { GET_PAWN_TICKET_BY_ID } from "../../../../constants/query-leys";
import ROUTE_PATHS from "../../../../constants/route-paths";
import Backdrop from "../../../../shared/components/backdrop";
import ConfirmationDialog from "../../../../shared/components/confirmation-dialog";
import EllipsisMenu from "../../../../shared/components/ellipsis-menu";
import MenuDropDownButton from "../../../../shared/components/menu-dropdown-button";
import ModalDrawer from "../../../../shared/components/modal-drawer";
import PageTitleCard from "../../../../shared/components/page-title-card";
import SearchInput from "../../../../shared/components/search-input";
import Tabs from "../../../../shared/components/tabs";
import { PawnTicketStatusEnum } from "../../../../shared/types/generic";
import PermissionsWrapper from "../../access-control/permissions-wrapper";
import TicketGeneralTab from "./general/ticket-general-tab";
import UpdateGeneral from "./general/update-general";
import TicketInterestsSchedule from "./interests/ticket-interests-schedule";
import TicketItemsTab from "./items/ticket-items";
import UpdateItems from "./items/update-items";

const TABS = {
  GENERAL: {
    INDEX: 0,
    NAME: "General",
  },
  ITEMS: {
    INDEX: 1,
    NAME: "Items",
  },
  INTERESTS: {
    INDEX: 1,
    NAME: "Interests",
  },
  PAYMENTS: {
    INDEX: 3,
    NAME: "Payments",
  },
  REDEMPTIONS: {
    INDEX: 2,
    NAME: "Redemptions",
  },
};

const UpdateTicket = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [editModalType, setEditModalType] = useState<string | null>();
  const [
    openCreateRevisionConfirmationDialog,
    setOpenCreateRevisionConfirmationDialog,
  ] = useState(false);
  const queryClient = useQueryClient();

  const [
    openSaveRevisionConfirmationDialog,
    setOpenSaveRevisionConfirmationDialog,
  ] = useState(false);

  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);

  const { id: ticketId } = useParams();
  const navigate = useNavigate();
  const { data: revisionIds } = useGetRevisionIds(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: +ticketId!,
    },
    ticketId != null
  );
  const {
    mutate: mutatePostCreateRevision,
    isPending: isPendingMutatePostCreateRevision,
  } = usePostCreateRevision();
  const {
    mutate: mutatePatchUpdateInvoice,
    isPending: isPendingMutatePatchUpdateInvoice,
  } = usePatchUpdateInvoice();
  const {
    mutate: mutateUpdatePawnTicketGeneralDetails,
    isPending: isPendingMutateUpdateGeneral,
  } = usePatchUpdatePawnTicketGeneral();
  const deletePawnTicketMutation = useDeletePawnTicket();

  const {
    data: pawnTicketData,
    refetch,
    isFetching: isFetchingPawnTicketData,
  } = useGetPawnTicketById(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: +ticketId!,
    },
    false
  );

  const { enqueueSnackbar } = useSnackbar();

  const disableEdit = !!pawnTicketData?.revision || !!pawnTicketData?.invoiceId;
  const changeTab = (value: number) => {
    setCurrentTab(value);
  };

  const onChangeSearch = (
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    navigate(event?.target.value || "");
  };

  const onSelectRevision = (id: number) => {
    navigate(String(id));
  };

  const createRevision = () => {
    if (pawnTicketData?.id !== undefined)
      mutatePostCreateRevision(
        {
          payload: {
            id: pawnTicketData?.id,
          },
        },
        {
          onSuccess: (data) => {
            navigate(String(data.id));
            setOpenCreateRevisionConfirmationDialog(false);
          },
        }
      );
  };

  const updateInvoiceForLatestRevision = () => {
    if (pawnTicketData?.id !== undefined)
      mutatePatchUpdateInvoice(
        {
          payload: {
            id: pawnTicketData?.id,
          },
        },
        {
          onSuccess: () => {
            refetch();
            setOpenSaveRevisionConfirmationDialog(false);
          },
        }
      );
  };

  const deleteTicket = () => {
    if (pawnTicketData?.id)
      deletePawnTicketMutation.mutate(
        {
          payload: {
            id: pawnTicketData?.id,
          },
        },
        {
          onSuccess: () => {
            enqueueSnackbar(
              `Pawn ticket ${pawnTicketData.id} has been deleted.`,
              {
                variant: "success",
              }
            );
            queryClient.resetQueries({
              queryKey: [GET_PAWN_TICKET_BY_ID, pawnTicketData.id],
            });
            setOpenDeleteConfirmationDialog(false);
            navigate(`../${ROUTE_PATHS.PAWN_TICKET.ALL}`);
          },
        }
      );
  };
  const closeModal = () => {
    setEditModalType(null);
  };

  const getEditModal = () => {
    let modalContent;
    switch (editModalType) {
      case TABS.GENERAL.NAME:
        if (pawnTicketData?.id)
          modalContent = (
            <UpdateGeneral id={pawnTicketData?.id} refetch={refetch} />
          );
        break;
      case TABS.ITEMS.NAME:
        if (pawnTicketData?.id)
          modalContent = <UpdateItems pawnTicketId={pawnTicketData?.id} />;
    }

    return (
      <ModalDrawer
        open={!!editModalType}
        handleModalClose={closeModal}
        anchor="right"
        PaperProps={{ sx: { width: { xs: "100%", md: "75%", lg: "50%" } } }}
      >
        {modalContent}
      </ModalDrawer>
    );
  };

  const updateTicketStatus = (label: string) => {
    if (pawnTicketData?.id !== undefined)
      mutateUpdatePawnTicketGeneralDetails(
        {
          payload: {
            id: pawnTicketData?.id,
            status: label,
          },
        },
        {
          onSuccess: (data) => {
            enqueueSnackbar(
              `Pawn ticket status for ticket id ${data.id} has been updated to ${data.status}.`,
              {
                variant: "success",
              }
            );
            refetch();
          },
        }
      );
  };

  useEffect(() => {
    const debouncedApiCall = debounce(() => {
      refetch();
    }, TYPING_TIMEOUT_FOR_SEARCH);

    if (ticketId) debouncedApiCall();

    return () => {
      debouncedApiCall.cancel();
    };
  }, [ticketId, refetch]);

  return (
    <Stack sx={{ p: 1 }} spacing={1}>
      <PageTitleCard
        justifyContent="space-between"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        sx={{ gap: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Pawn Ticket
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            {revisionIds?.map((revision) => {
              return (
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => onSelectRevision(revision)}
                  component={Typography}
                  variant="h5"
                  key={revision}
                  sx={{
                    cursor: "pointer",
                    color: `${
                      pawnTicketData?.id === revision
                        ? "primary.main"
                        : "inherit"
                    }`,
                  }}
                >
                  {revision}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"end"}
          gap={2}
        >
          <SearchInput
            onChange={onChangeSearch}
            placeholder="Search pawn ticket..."
          />
          <Stack direction={"row"} spacing={2}>
            {pawnTicketData?.status ? (
              <Box>
                <MenuDropDownButton
                  selection={pawnTicketData?.status}
                  options={Object.values(PawnTicketStatusEnum).map((option) => {
                    let disabled;
                    switch (option) {
                      case PawnTicketStatusEnum.REVISED:
                        disabled = true;
                        break;
                      case PawnTicketStatusEnum.DUE:
                        disabled = !!isAfter(
                          pawnTicketData.dueDate,
                          new Date()
                        );
                        break;
                    }
                    return {
                      label: option,
                      disabled:
                        pawnTicketData?.status ===
                          PawnTicketStatusEnum.REVISED ||
                        disabled ||
                        pawnTicketData.status === option,
                      onClick: () => updateTicketStatus(option),
                    };
                  })}
                />
              </Box>
            ) : null}
            <PermissionsWrapper
              permission={{
                action: PERMISSION_ACTIONS.DELETE,
                permissionType: PERMISSIONS.PAWN_TICKET,
              }}
            >
              <IconButton
                color="error"
                onClick={() => setOpenDeleteConfirmationDialog(true)}
                sx={{
                  border: "1px solid",
                  borderRadius: "5px",
                }}
                disabled={
                  pawnTicketData?.status === PawnTicketStatusEnum.REVISED
                }
              >
                <DeleteIcon
                  color={
                    pawnTicketData?.status === PawnTicketStatusEnum.REVISED
                      ? "disabled"
                      : "error"
                  }
                  fontSize="inherit"
                />
              </IconButton>
            </PermissionsWrapper>
            <EllipsisMenu
              options={[
                {
                  label: "Create revision",
                  onClick: () => setOpenCreateRevisionConfirmationDialog(true),
                  disabled:
                    !!pawnTicketData?.revision || !pawnTicketData?.invoiceId,
                },
                {
                  label: "Edit General Details",
                  onClick: () => {
                    setEditModalType(TABS.GENERAL.NAME);
                  },
                  disabled: disableEdit,
                },
                {
                  label: "Edit Items",
                  onClick: () => {
                    setEditModalType(TABS.ITEMS.NAME);
                  },
                  disabled: disableEdit,
                },
                {
                  label: "Edit Interests",
                  onClick: () => {
                    console.log("first");
                  },
                  disabled: disableEdit,
                },
                {
                  label: "Generate Invoice",
                  onClick: () => setOpenSaveRevisionConfirmationDialog(true),
                  disabled: disableEdit,
                },
              ]}
            />
          </Stack>
        </Stack>
      </PageTitleCard>
      <Tabs
        tabs={Object.values(TABS)
          // .filter((tab) => {
          //   if (booking.id) {
          //     return true;
          //   } else {
          //     if (tab.NAME === TABS.GENERAL.NAME) {
          //       return true;
          //     }
          //   }
          //   return false;
          // })
          .map((tab) => tab.NAME)}
        currentTab={currentTab}
        changeTab={changeTab}
      >
        <Box>
          <Zoom
            in={true}
            mountOnEnter
            unmountOnExit
            // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
            timeout={500}
          >
            <Box>
              <TicketGeneralTab
                pawnTicketData={pawnTicketData}
                setOpenSaveRevisionConfirmationDialog={
                  setOpenSaveRevisionConfirmationDialog
                }
              />
            </Box>
          </Zoom>
        </Box>
        <Box>
          {pawnTicketData?.id !== undefined ? (
            <Zoom
              in={true}
              mountOnEnter
              unmountOnExit
              // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
              timeout={500}
            >
              <Box>
                <TicketItemsTab id={pawnTicketData?.id} />
              </Box>
            </Zoom>
          ) : null}
        </Box>
        {pawnTicketData?.id ? (
          <Box>
            <Zoom
              in={true}
              mountOnEnter
              unmountOnExit
              // style={{ transitionDelay: !showEditForm ? "400ms" : "0ms" }}
              timeout={500}
            >
              <Box>
                <TicketInterestsSchedule id={pawnTicketData?.id} />
              </Box>
            </Zoom>
          </Box>
        ) : null}
      </Tabs>
      <Backdrop
        open={
          isFetchingPawnTicketData ||
          isPendingMutatePostCreateRevision ||
          isPendingMutatePatchUpdateInvoice ||
          isPendingMutateUpdateGeneral
        }
      />
      <ConfirmationDialog
        open={openCreateRevisionConfirmationDialog}
        title="Do you wish to continue?"
        content={
          "A new ticket will be created with a new ticket ID. You will be able to edit the details of the new ticket. Are you sure to continue?"
        }
        cancelActionTitle="Cancel"
        confirmActionTitle="Continue"
        handleClose={setOpenCreateRevisionConfirmationDialog}
        confirmAction={createRevision}
      />
      <ConfirmationDialog
        open={openSaveRevisionConfirmationDialog}
        title="Do you wish to continue?"
        content={
          "After saving this revision, you will not be able to edit this ticket. Are you sure to continue?"
        }
        cancelActionTitle="Cancel"
        confirmActionTitle="Continue"
        handleClose={setOpenSaveRevisionConfirmationDialog}
        confirmAction={updateInvoiceForLatestRevision}
      />
      <ConfirmationDialog
        open={openDeleteConfirmationDialog}
        title="Are you sure to delete?"
        content={
          "This ticket and all its revisions and associated data will be deleted. Are you sure to delete?"
        }
        cancelActionTitle="Cancel"
        confirmActionTitle="Delete"
        handleClose={setOpenDeleteConfirmationDialog}
        confirmAction={deleteTicket}
        confirmActionColor="error"
      />
      {getEditModal()}
    </Stack>
  );
};

export default UpdateTicket;
