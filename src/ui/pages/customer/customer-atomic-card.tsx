import { AccountCircle } from "@mui/icons-material";
import { Link, PaperOwnProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CustomerIcon from "../../../assets/svg/customer.svg";
import ROUTE_PATHS from "../../../constants/route-paths";
import DataCard from "../../../shared/components/data-card";
import Customer from "../../../shared/types/customer";

export interface CustomerAtomicCardProps extends PaperOwnProps {
  customer?: Pick<Customer, "id" | "name" | "email">;
  darken?: boolean;
}

const CustomerAtomicCard: FC<CustomerAtomicCardProps> = ({
  customer,
  darken,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <DataCard
      backgroundImg={CustomerIcon}
      highlightBackground={!customer?.name}
      darken={darken}
      {...props}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="subdued"
          textTransform={"uppercase"}
          fontWeight="bold"
        >
          Customer
        </Typography>
        {customer?.name && (
          <Stack direction="row" spacing={1}>
            <AccountCircle color="primary" sx={{ fontSize: 40 }} />
            <Stack>
              <Link
                component="button"
                onClick={() => {
                  navigate(
                    `/${ROUTE_PATHS.CUSTOMER.BASE}/${ROUTE_PATHS.CUSTOMER.UPDATE}/${customer.id}`,
                    {
                      relative: "path",
                    }
                  );
                }}
                sx={{
                  textDecoration: "none",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                <Typography
                  noWrap
                  fontSize={14}
                  fontWeight="bold"
                  color={"primary"}
                  textAlign={"start"}
                >
                  {customer.name}
                </Typography>
              </Link>
              <Typography noWrap fontSize={12}>
                {customer.email}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </DataCard>
  );
};

export default CustomerAtomicCard;
