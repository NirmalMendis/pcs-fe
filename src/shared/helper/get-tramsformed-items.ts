import { TicketFormItem } from "../../ui/pages/pawn-ticket/all-tickets/all-pawn-tickets";
import { ItemDetailKey, ItemTypes } from "../types/generic";
import { Item, ItemDetailType } from "../types/item";

const getTransformedItems = (
  items?: Array<TicketFormItem & { id?: number }>
) => {
  const transformedItems = items?.map((item) => {
    const goldItem: Array<Pick<ItemDetailType, "type" | "value">> = [
      {
        type: ItemDetailKey.CARATAGE,
        value: String(item[ItemDetailKey.CARATAGE]),
      },
      {
        type: ItemDetailKey.WEIGHT,
        value: String(item[ItemDetailKey.WEIGHT]),
      },
    ];

    const vehicleItem: Array<Pick<ItemDetailType, "type" | "value">> = [
      {
        type: ItemDetailKey.VEHICLE_NO,
        value: String(item[ItemDetailKey.VEHICLE_NO]),
      },
    ];

    const getItemDetails = () => {
      switch (item.itemType) {
        case ItemTypes.GOLD:
          return goldItem;
        case ItemTypes.VEHICLE:
          return vehicleItem;
      }
    };
    const baseItem: Pick<
      Item,
      "description" | "appraisedValue" | "pawningAmount"
    > & { itemDetails: Array<Pick<ItemDetailType, "type" | "value">> } = {
      ...(item.id !== undefined ? { id: item.id } : {}),
      description: item.description,
      appraisedValue: item.appraisedValue,
      pawningAmount: item.pawningAmount,
      itemDetails: getItemDetails() || [],
    };

    return baseItem;
  });
  return transformedItems;
};

export default getTransformedItems;
