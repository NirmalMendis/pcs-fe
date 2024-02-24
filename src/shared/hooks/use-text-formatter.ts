import { useNumericFormat } from "react-number-format";

const useTextFormatter = () => {
  const { format: formatCaratage } = useNumericFormat({
    suffix: " K",
    thousandSeparator: true,
  });
  const { format: formatRs } = useNumericFormat({
    prefix: "Rs. ",
    thousandSeparator: true,
  });
  const { format: formatWeight } = useNumericFormat({
    suffix: " g",
    thousandSeparator: true,
  });
  const { format: formatPercentage } = useNumericFormat({
    suffix: " %",
    thousandSeparator: true,
  });
  return {
    formatCaratage,
    formatRs,
    formatWeight,
    formatPercentage,
  };
};

export default useTextFormatter;
