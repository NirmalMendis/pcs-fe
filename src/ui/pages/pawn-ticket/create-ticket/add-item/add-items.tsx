import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import ConfirmationDialog from "../../../../../shared/components/confirmation-dialog";
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

  const handleSaveItemToState = (data: CRUItemFormValues, uiId: number) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.uiId === uiId) {
          return { ...item, ...data, isSubmitted: true };
        }
        return item;
      });
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
        <Card
          variant="outlined"
          key={`${item.uiId}-item`}
          sx={{
            p: 2,
            borderColor: "secondary.dark",
          }}
          ref={
            items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) ===
            items.length - 1
              ? newItemRef
              : null
          }
        >
          <Stack spacing={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontSize={14} fontWeight={"bold"}>{`Item ${
                items.findIndex((arrayItem) => arrayItem.uiId === item.uiId) + 1
              }`}</Typography>
              <Button
                onClick={() => handleRemoveItem(item.uiId)}
                startIcon={<RemoveCircleOutlineRoundedIcon color="secondary" />}
                sx={{ pl: 2, pr: 2 }}
                color="error"
                disabled={items.length === 1}
              >
                Remove item
              </Button>
            </Box>
            <CRUItemForm
              onSubmit={(...props) =>
                handleSaveItemToState(...props, item.uiId)
              }
              item={item}
            />
          </Stack>
        </Card>
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
