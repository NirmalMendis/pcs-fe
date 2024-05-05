import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useRef, useState } from "react";
import { UseFormReset } from "react-hook-form";
import useDeleteItem from "../../../../../api/item/use-delete-item";
import useGetItemsByPawnTicketId from "../../../../../api/item/use-get-items-by-ticketId";
import usePatchItem from "../../../../../api/item/use-patch-item";
import usePostAddItem from "../../../../../api/item/use-post-add-item";
import Backdrop from "../../../../../shared/components/backdrop";
import ConfirmationDialog from "../../../../../shared/components/confirmation-dialog";
import ItemCardLayout from "../../../../../shared/components/item-card-layout";
import { getTransformedItem } from "../../../../../shared/helper/get-tramsformed-items";
import { ItemTypes } from "../../../../../shared/types/generic";
import { Item } from "../../../../../shared/types/item";
import CRUItemForm, {
  CRUItemFormValues,
} from "../../create-ticket/add-item/cru-item-form";

export interface UpdateItemsProps {
  pawnTicketId: number;
}

export interface UpdateItem extends Item {
  uiId: number;
}

const UpdateItems: FC<UpdateItemsProps> = ({ pawnTicketId }) => {
  const {
    data: dbItems,
    isFetching: isFetchingGetItemsByPawnTicketId,
    refetch: refetchItemsByPawnTicket,
  } = useGetItemsByPawnTicketId<Array<Item>>({
    id: pawnTicketId,
  });

  const extendedItems = dbItems?.map((item) => ({
    ...item,
    uiId: item.id,
  }));

  const newItemRef = useRef<HTMLDivElement>(null); // Ref for the newly added item
  const prevItemCount = useRef<number>(1);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const { mutate: mutateDeleteItem, isPending: isPendingMutateDeleteItem } =
    useDeleteItem();
  const { mutate: mutateAddItem, isPending: isPendingMutateAddItem } =
    usePostAddItem();
  const { mutate: mutatePatchItem, isPending: isPendingMutatePatchItem } =
    usePatchItem();

  const [items, setItems] = useState<UpdateItem[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const itemToDeleteRef = useRef<number>();

  const handleAddItem = () => {
    if (items)
      setItems(
        (prev) =>
          prev?.concat({
            uiId: items.length + 1,
            itemType: ItemTypes.GOLD,
          } as UpdateItem)
      );
  };

  const handleDeleteItemFromTicket = () => {
    if (itemToDeleteRef.current !== undefined)
      mutateDeleteItem(
        {
          payload: {
            id: itemToDeleteRef.current,
          },
        },
        {
          onSuccess: () => {
            refetchItemsByPawnTicket();
            enqueueSnackbar(
              `Item Id: #${itemToDeleteRef.current} has been deleted.`,
              {
                variant: "success",
              }
            );
            setOpenConfirmationDialog(false);
          },
        }
      );
  };

  const handleRemoveItem = (uiId: number) => {
    setItems((prev) => prev.filter((item) => item.uiId !== uiId));
  };

  const handleUpdateItem = (itemId: number, data: CRUItemFormValues) => {
    const transformedItem = getTransformedItem(data);

    mutatePatchItem(
      {
        payload: {
          ...transformedItem,
          id: itemId,
        },
      },
      {
        onSuccess: (data: Item) => {
          refetchItemsByPawnTicket();
          enqueueSnackbar(`Item Id: #${data.id} has been Added.`, {
            variant: "success",
          });
        },
      }
    );
  };

  const handleAddItemToTicket = (
    data: CRUItemFormValues,
    itemId: number,
    reset: UseFormReset<CRUItemFormValues>
  ) => {
    const transformedItem = getTransformedItem(data);

    mutateAddItem(
      {
        payload: {
          ...transformedItem,
          pawnTicketId: pawnTicketId,
        },
      },
      {
        onSuccess: () => {
          refetchItemsByPawnTicket();
          enqueueSnackbar(`Item Id: #${itemId} has been Added.`, {
            variant: "success",
          });
          reset();
          setItems((prev) => prev.filter((item) => item.uiId !== itemId));
        },
      }
    );
  };

  const openDeleteConfirmation = (id: number) => {
    itemToDeleteRef.current = id;
    setOpenConfirmationDialog(true);
  };

  useEffect(() => {
    if (
      newItemRef.current &&
      items?.length !== undefined &&
      items?.length > prevItemCount.current
    ) {
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
    prevItemCount.current = items?.length ?? 1;
  }, [items]);

  return (
    <Stack sx={{ p: 3, pt: 0 }} spacing={4}>
      <Typography variant="h5">Edit Pawn Ticket Items</Typography>
      <Stack spacing={2}>
        {extendedItems?.map((item) => (
          <ItemCardLayout
            handleRemoveItem={() => openDeleteConfirmation(item.id)}
            id={item.id}
            item={item}
            disableRemove={extendedItems.length === 1}
            key={`${item.uiId}-item`}
            ref={
              extendedItems.findIndex(
                (arrayItem) => arrayItem.uiId === item.uiId
              ) ===
              extendedItems.length - 1
                ? newItemRef
                : null
            }
          >
            <CRUItemForm
              onSubmit={handleUpdateItem.bind(this, item.id)}
              item={{
                appraisedValue: item.appraisedValue,
                description: item.description,
                itemType: item.itemType,
                pawningAmount: item.pawningAmount,
                ...(item.itemDetails
                  ? Object.assign(
                      {},
                      ...item.itemDetails.map((itemDetail) => ({
                        [itemDetail.type]: itemDetail.value,
                      }))
                    )
                  : {}),
              }}
            />
          </ItemCardLayout>
        ))}
        {items?.map((item) => (
          <ItemCardLayout
            handleRemoveItem={handleRemoveItem}
            id={`XXXX-${
              items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) + 1
            }`}
            item={item}
            key={`${item.uiId}-item`}
            ref={
              items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) ===
              items.length - 1
                ? newItemRef
                : null
            }
          >
            <CRUItemForm
              onSubmit={(data, reset) =>
                handleAddItemToTicket(data, item.uiId, reset)
              }
              item={{
                appraisedValue: item.appraisedValue,
                description: item.description,
                itemType: item.itemType,
                pawningAmount: item.pawningAmount,
                ...(item.itemDetails
                  ? Object.assign(
                      {},
                      ...item.itemDetails.map((itemDetail) => ({
                        [itemDetail.type]: itemDetail.value,
                      }))
                    )
                  : {}),
              }}
            />
          </ItemCardLayout>
        ))}
      </Stack>
      <Button
        onClick={handleAddItem}
        startIcon={<AddCircleOutlineRoundedIcon color="secondary" />}
        sx={{ pl: 2, pr: 2 }}
      >
        Add item
      </Button>
      <ConfirmationDialog
        open={openConfirmationDialog}
        title="Are you sure to delete?"
        content={"Are you sure to delete this item?"}
        cancelActionTitle="Cancel"
        confirmActionTitle="Delete"
        confirmActionColor="error"
        handleClose={setOpenConfirmationDialog}
        confirmAction={handleDeleteItemFromTicket}
      />
      <Backdrop
        open={
          isFetchingGetItemsByPawnTicketId ||
          isPendingMutateAddItem ||
          isPendingMutateDeleteItem ||
          isPendingMutatePatchItem
        }
      />
    </Stack>
  );
};

export default UpdateItems;
