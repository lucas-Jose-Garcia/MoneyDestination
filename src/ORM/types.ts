export interface TableBase {
  [key: string]: string | number | null;
}

interface BaseColumnProps<T extends object> {
  name: keyof T;
  not_null: boolean;
}

interface ColumnVarcharProps<T extends object> extends BaseColumnProps<T> {
  type: 'varchar';
  limit: number;
}

interface ColumnIntergerProps<T extends object> extends BaseColumnProps<T> {
  type: 'interger';
  limit?: never;
}

type ColumnProps<T extends object> = ColumnVarcharProps<T> | ColumnIntergerProps<T>;

export type NameOfTables = 'category' | 'parameters';

export interface TableProps<T extends object> {
  name: NameOfTables;
  columns: ColumnProps<T>[];
}

export interface WithId {
  id: number;
}

export type CompleteTableProps<T extends object> = T & WithId;
