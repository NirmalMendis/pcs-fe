import {
  InterestStatusEnum,
  PawnTicketStatusEnum,
} from "../shared/types/generic";

interface StatusColors {
  backgroundColor: string;
  color: string;
  borderColor: string;
  selectedBackgroundColor?: string;
  hoverColor?: string;
  disabledBackgroundColor?: string;
  disabledColor?: string;
}

interface StatusColorsMap {
  [key: PawnTicketStatusEnum | InterestStatusEnum | string]: StatusColors;
}

export const StatusColors: StatusColorsMap = {
  [PawnTicketStatusEnum.ACTIVE]: {
    backgroundColor: "rgba(13, 214, 133,0.1)",
    color: "rgba(13, 214, 133,1)",
    borderColor: "rgba(13, 214, 133,1)",
    selectedBackgroundColor: "rgba(13, 214, 133,1)",
    hoverColor: "rgba(13, 214, 133,0.2)",
  },
  [PawnTicketStatusEnum.RECOVERED]: {
    backgroundColor: "rgba(212, 238, 251,1)",
    color: "rgba(76,160,193,1)",
    borderColor: "rgba(76,160,193,1)",
    selectedBackgroundColor: "rgba(76,160,193,1)",
    hoverColor: "#c6e9f7",
  },
  [PawnTicketStatusEnum.DUE]: {
    backgroundColor: "rgba(247, 220, 220,1)",
    color: "rgba(219, 15, 15,1)",
    borderColor: "rgba(219, 15, 15,1)",
    selectedBackgroundColor: "rgba(219, 15, 15,1)",
    hoverColor: "#c6e9f7",
  },
  [PawnTicketStatusEnum.REVISED]: {
    backgroundColor: "rgba(240, 22, 155, 0.1)",
    color: "rgba(240, 22, 155,1)",
    borderColor: "rgba(240, 22, 155,1)",
    disabledBackgroundColor: "#80bee0",
    disabledColor: "rgba(240, 22, 155,0.3)",
  },
  [PawnTicketStatusEnum.FORFEITED]: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    color: "rgba(128, 128, 128,1)",
    borderColor: "rgba(128, 128, 128,1)",
    selectedBackgroundColor: "rgba(128, 128, 128,1)",
    hoverColor: "rgba(128, 128, 128,0.2)",
  },
  [InterestStatusEnum.UPCOMING]: {
    backgroundColor: "rgba(232, 184, 81,0.1)",
    color: "rgba(232, 184, 81,1)",
    borderColor: "rgba(232, 184, 81,1)",
    selectedBackgroundColor: "rgba(232, 184, 81,1)",
    hoverColor: "rgba(232, 184, 81,0.2)",
  },
  [InterestStatusEnum.OVERDUE]: {
    backgroundColor: "rgba(247, 142, 49,0.1)",
    color: "rgba(247, 142, 49,1)",
    borderColor: "rgba(247, 142, 49,1)",
    selectedBackgroundColor: "rgba(247, 142, 49,1)",
    hoverColor: "rgba(247, 142, 49,0.2)",
  },
  Postponed: {
    backgroundColor: "rgba(237, 211, 235,1)",
    color: "rgba(232, 51, 218,1)",
    borderColor: "rgba(232, 51, 218,1)",
    selectedBackgroundColor: "rgba(232, 51, 218,1)",
    hoverColor: "#c6e9f7",
  },
  [InterestStatusEnum.PAID]: {
    backgroundColor: "rgba(224, 247, 203,1)",
    color: "rgba(69, 143, 1,1)",
    borderColor: "rgba(69, 143, 1,1)",
    selectedBackgroundColor: "rgba(69, 143, 1,1)",
    hoverColor: "#c6e9f7",
  },
};
