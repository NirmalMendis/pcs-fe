import { MutationKey, QueryKey } from "@tanstack/react-query";

const mutationExclusionList: Array<string> = [];

const queryInclusionList: Array<string> = [];

export const showMutationError = (keys: MutationKey) => {
  return !mutationExclusionList.includes(keys[0] as string);
};

export const showQueryError = (keys: QueryKey) => {
  return !!queryInclusionList.includes(keys[0] as string);
};
