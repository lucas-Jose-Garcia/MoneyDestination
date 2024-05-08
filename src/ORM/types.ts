export interface TableBase {
  [key: string]: string | number | null;
}

interface BaseColumnProps<T extends TableBase> {
  name: keyof T;
  not_null: boolean;
}

interface ColumnVarcharProps<T extends TableBase> extends BaseColumnProps<T> {
  type: 'varchar';
  limit: number;
}

interface ColumnIntergerProps<T extends TableBase> extends BaseColumnProps<T> {
  type: 'interger';
  limit?: never;
}

type ColumnProps<T extends TableBase> = ColumnVarcharProps<T> | ColumnIntergerProps<T>;

export interface TableProps<T extends TableBase> {
  name: string;
  columns: ColumnProps<T>[];
}

export interface WithId {
  id: number;
}

export type CompleteTableProps<T extends TableBase> = T & WithId;
