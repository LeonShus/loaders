export type TStatuses = 'process' | 'error'

export interface IProcess {
  name: string;
  start_dttm: string;
  end_dttm: string;
  plan_dttm: string;
  status: TStatuses
}
