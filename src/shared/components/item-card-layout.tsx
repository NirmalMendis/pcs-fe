import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { PropsWithChildren, forwardRef } from "react";
import { TicketFormItem } from "../../ui/pages/pawn-ticket/all-tickets/all-pawn-tickets";
import { UpdateItem } from "../../ui/pages/pawn-ticket/update-ticket/items/update-items";

export interface ItemCardLayoutProps extends PropsWithChildren {
  item: TicketFormItem | UpdateItem;
  id: number | string;
  handleRemoveItem: (id: number) => void;
  disableRemove?: boolean;
}

// eslint-disable-next-line react/display-name
const ItemCardLayout = forwardRef<HTMLDivElement, ItemCardLayoutProps>(
  ({ item, id, handleRemoveItem, children, disableRemove }, ref) => {
    return (
      <Card
        variant="outlined"
        key={`${item.uiId}-item`}
        sx={{
          p: 2,
          borderColor: "secondary.dark",
        }}
        ref={ref}
      >
        <Stack spacing={2}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              fontSize={14}
              fontWeight={"bold"}
            >{`Item ${id}`}</Typography>
            <Button
              onClick={() => handleRemoveItem(item.uiId)}
              startIcon={<RemoveCircleOutlineRoundedIcon color="secondary" />}
              sx={{ pl: 2, pr: 2 }}
              color="error"
              disabled={disableRemove}
            >
              Remove item
            </Button>
          </Box>
          {children}
        </Stack>
      </Card>
    );
  }
);

export default ItemCardLayout;
