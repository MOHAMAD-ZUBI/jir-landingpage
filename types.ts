export type Rule = {
  id: number;
  name: string;
  rule: string;
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
  is_active: boolean;
  shared_w_groups: boolean;
  type: number;
  id: number;
  user: number;
  groups: number[];
  rules: {
    rule: number;
    id: number;
    name: string;
    index: number;
    continue_if_failed: boolean;
    params: Param[];
  }[];
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
