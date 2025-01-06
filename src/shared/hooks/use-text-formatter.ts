import { useNumericFormat, usePatternFormat } from "react-number-format";
import { CURRENCY_PREFIX } from "../../constants/generic-constants";

const useTextFormatter = () => {
  const { format: formatCaratage } = useNumericFormat({
    suffix: " K",
    thousandSeparator: true,
  });
  const { format: formatRs } = useNumericFormat({
    prefix: CURRENCY_PREFIX,
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

  const { format: formatPhoneNumber } = usePatternFormat({
    format: "+94 (##) ###-####",
    type: "tel",
    mask: "_",
  });

  return {
    formatCaratage,
    formatRs,
    formatWeight,
    formatPercentage,
    formatPhoneNumber,
  };
};

export default useTextFormatter;
