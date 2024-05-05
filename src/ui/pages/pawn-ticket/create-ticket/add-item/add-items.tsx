import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { UseFormReset } from "react-hook-form";
import ConfirmationDialog from "../../../../../shared/components/confirmation-dialog";
import ItemCardLayout from "../../../../../shared/components/item-card-layout";
import {
  CreateTicketContext,
  emptyItem,
} from "../../all-tickets/all-pawn-tickets";
import { ActiveStepContext } from "../create-ticket";
import StepperBtns from "../stepper-btns";
import CRUItemForm, { CRUItemFormValues } from "./cru-item-form";

const AddItems = () => {
  const { items, setItems } = useContext(CreateTicketContext);
  const newItemRef = useRef<HTMLDivElement>(null); // Ref for the newly added item
  const prevItemCount = useRef<number>(1);
  const { handleNext } = useContext(ActiveStepContext);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const atLeastOneIemIsSubmitted = !!items?.find((item) => item.isSubmitted);

  const handleSaveItemToState = (
    data: CRUItemFormValues,
    uiId: number,
    reset: UseFormReset<CRUItemFormValues>
  ) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.uiId === uiId) {
          return { ...item, ...data, isSubmitted: true };
        }
        return item;
      });
    });
    reset(undefined, {
      keepValues: true,
      keepSubmitCount: true,
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { ...emptyItem, uiId: prev[prev.length - 1].uiId + 1 },
    ]);
  };

  const handleRemoveItem = (uiId: number) => {
    setItems((prev) => prev.filter((item) => item.uiId !== uiId));
  };

  const handleConfirmContinue = () => {
    setItems((prev) => prev.filter((item) => item.isSubmitted));
    setOpenConfirmationDialog(false);
    if (handleNext) handleNext();
  };

  const handleNextClick = () => {
    const unsubmittedItem = items?.find((item) => !item.isSubmitted);
    if (unsubmittedItem) {
      setOpenConfirmationDialog(true);
    } else {
      if (handleNext) handleNext();
    }
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
    <Stack spacing={2}>
      {items?.map((item) => (
        <ItemCardLayout
          handleRemoveItem={handleRemoveItem}
          id={items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) + 1}
          item={item}
          key={`${item.uiId}-item`}
          ref={
            items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) ===
            items.length - 1
              ? newItemRef
              : null
          }
          disableRemove={items.length === 1}
        >
          <CRUItemForm
            onSubmit={(data, reset) =>
              handleSaveItemToState(data, item.uiId, reset)
            }
            item={item}
          />
        </ItemCardLayout>
      ))}
      <Button
        onClick={handleAddItem}
        startIcon={<AddCircleOutlineRoundedIcon color="secondary" />}
        sx={{ pl: 2, pr: 2 }}
      >
        Add item
      </Button>
      <StepperBtns
        actionButtonProps={{
          disabled: !atLeastOneIemIsSubmitted,
          type: "button",
          onClick: handleNextClick,
        }}
      />
      <ConfirmationDialog
        open={openConfirmationDialog}
        title="Do you wish to continue?"
        content={
          "There are unsubmitted items which will be cleared if you continue. Are you sure to continue?"
        }
        cancelActionTitle="Cancel"
        confirmActionTitle="Continue"
        handleClose={setOpenConfirmationDialog}
        confirmAction={handleConfirmContinue}
      />
    </Stack>
  );
};

export default AddItems;
