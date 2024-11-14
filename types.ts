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

export type Checker = {
  name: string;
  comparison_val: number;
  real_val: number;
  intersections: Intersection[];
};

export type Intersection = {
  op: string;
  intersection_json: {
    key: string;
    value: string;
  };
};
