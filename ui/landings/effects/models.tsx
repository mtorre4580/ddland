import ILanding from '../../../repository/models/web/landing';

export interface Action {
  type: string;
  payload: any;
}

export interface StateLandings {
  landings: ILanding[];
  loading: boolean;
  error: string;
  showModal: boolean;
  landingSelected: {
    path: string | null;
    index: number | null;
  };
}
