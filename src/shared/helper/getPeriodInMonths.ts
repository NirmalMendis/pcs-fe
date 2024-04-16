import { TimePeriod } from "../types/generic";

const getPeriodInMonths = (
  periodType?: TimePeriod,
  periodQuantity?: number
) => {
  const periodInMonths =
    periodType === TimePeriod.month
      ? periodQuantity
      : (periodQuantity || 0) * 12;
  return periodInMonths || 0;
};

export default getPeriodInMonths;
