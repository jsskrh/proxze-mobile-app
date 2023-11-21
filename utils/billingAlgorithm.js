import settings from "./settings";

const skillsetMultiple = 1.68;
const baseRate = 100; // base rate per min
const bulkRate = 1.015;
const durationBlock = 30; // 30 min

const billingAlgorithm = (
  type,
  lga,
  state,
  dateBlock,
  timeBlock,
  searchRange,
  durationMultiple,
  enterprise
) => {
  const typeValue =
    settings.types.find((item) => item.type === type)?.value || 1;
  const searchRangeValue =
    settings.searchRange.find((range) => range.range === searchRange)?.value ||
    1;
  const dateBlockValue =
    settings.dateBlock.find((block) => block.type === dateBlock)?.value || 1;
  const timeBlockValue =
    settings.timeBlock.find((block) => block.type === timeBlock)?.value || 1;
  const durationMultipleValue = durationMultiple || 1;
  const lgaSearch = settings.states
    .find((foundState) => foundState.locationState === state)
    ?.lgas.find((foundLga) => foundLga.location === lga);
  const lgaMultiple = lgaSearch?.multiple;
  const lgaValue =
    lgaMultiple === "High" ? 1.6 : lgaMultiple === "Mid" ? 1.2 : 1;

  const billingMultiple =
    searchRangeValue *
    dateBlockValue *
    timeBlockValue *
    lgaValue *
    skillsetMultiple;

  const billPerMin = billingMultiple * baseRate;

  const duration = durationBlock * durationMultipleValue;

  const bill = billPerMin * duration;

  console.log({
    typeValue: typeValue,
    searchRangeValue: searchRangeValue,
    dateBlockValue: dateBlockValue,
    timeBlockValue: timeBlockValue,
    durationMultipleValue: durationMultipleValue,
    duration: duration,
    lgaValue: lgaValue,
    billingMultiple: billingMultiple,
    billPerMin: billPerMin,
  });

  if (
    type ||
    lga ||
    state ||
    dateBlock ||
    timeBlock ||
    searchRange ||
    durationMultiple
  ) {
    if (enterprise) {
      return (bill * bulkRate).toFixed(2);
    } else {
      return bill.toFixed(2);
    }
  } else {
    return 0;
  }
};

export default billingAlgorithm;
