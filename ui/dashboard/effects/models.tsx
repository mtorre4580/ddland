export interface StateEditor {
  blocks: any[];
  [key: string]: any;
  path: string;
  title: string;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Block {
  id: string;
  values: object;
}
