export enum CodeParameter {
  BASE_DATA_INSERTED = 'BASE_DATA_INSERTED',
}

export interface ParametersProps {
  code: CodeParameter;
  value: string;
}
