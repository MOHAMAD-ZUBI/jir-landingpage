export type Rule = {
  rule: number;
  index: number;
  continue_if_failed: boolean | string;
  params: Param[];
};

export type Param = {
  name: string;
  value: string;
};

export type Job = {
  name: string;
  rules: Rule[];
};
