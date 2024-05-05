import { CRUItemFormValues } from "../../ui/pages/pawn-ticket/create-ticket/add-item/cru-item-form";
import { ItemDetailKey, ItemTypes } from "../types/generic";
import { Item, ItemDetailType } from "../types/item";

export const getTransformedItem = (
  item: CRUItemFormValues & { id?: number }
) => {
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
    "description" | "appraisedValue" | "pawningAmount" | "itemType"
  > & { itemDetails: Array<Pick<ItemDetailType, "type" | "value">> } = {
    ...(item.id !== undefined ? { id: item.id } : {}),
    description: item.description,
    appraisedValue: item.appraisedValue,
    pawningAmount: item.pawningAmount,
    itemType: item.itemType as ItemTypes,
    itemDetails: getItemDetails() || [],
  };

  return baseItem;
};

const getTransformedItems = (
  items?: Array<CRUItemFormValues & { id?: number }>
) => {
  const transformedItems = items?.map((item) => {
    const baseItem = getTransformedItem(item);
    return baseItem;
  });
  return transformedItems;
};

export default getTransformedItems;
