import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { FC } from "react";
import GenericTable, {
  TableColumn,
} from "../../../../../shared/components/generic-table";
import useTextFormatter from "../../../../../shared/hooks/use-text-formatter";
import { Item } from "../../../../../shared/types/item";
import { TicketFormItem } from "../../create-ticket/create-ticket";

export interface TicketItemsTableProps {
  items: Array<Partial<Item> & Partial<TicketFormItem>>;
}

const columns: TableColumn[] = [
  { header: "", accessor: "icon", align: "center" },
  { header: "Description", accessor: "description", align: "left" },
  { header: "Caratage", accessor: "caratage", align: "center" },
  { header: "Appraised Value", accessor: "appraisedValue", align: "center" },
  { header: "Pawning Amount", accessor: "pawningAmount", align: "center" },
  { header: "Weight", accessor: "weight", align: "center" },
];

const TicketItemsTable: FC<TicketItemsTableProps> = ({ items }) => {
  const { formatCaratage, formatRs, formatWeight } = useTextFormatter();

  const getFormattedItems = () => {
    let formattedItems;
    if (formatCaratage && formatRs && formatWeight) {
      formattedItems = items.map((item) => ({
        ...item,
        icon: <LabelImportantIcon sx={{ color: "success.light" }} />,
        caratage: formatCaratage(String(item.caratage)),
        appraisedValue: formatRs(String(item.appraisedValue)),
        pawningAmount: formatRs(String(item.pawningAmount)),
        weight: formatWeight(String(item.weight)),
      }));
    }
    return formattedItems;
  };

  return <GenericTable columns={columns} data={getFormattedItems() || []} />;
};

export default TicketItemsTable;
