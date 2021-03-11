export interface StateEditor {
  blocks: any[];
  [key: string]: any;
  path: string;
  title: string;
  loading: boolean;
  error: string | null;
  isEdit: boolean;
  isModalOpen: boolean;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Block {
  id: string;
  values: any;
}
