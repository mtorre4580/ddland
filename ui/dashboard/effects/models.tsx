export interface StateEditor {
  blocks: any[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface Block {
  id: string;
  values: object;
}
