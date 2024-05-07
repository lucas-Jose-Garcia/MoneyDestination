interface BaseColumnProps {
  name: string;
  not_null: boolean;
}

interface ColumnVarcharProps extends BaseColumnProps {
  type: 'varchar';
  limit: number;
}

interface ColumnIntergerProps extends BaseColumnProps {
  type: 'interger';
  limit?: never;
}

type ColumnProps = ColumnVarcharProps | ColumnIntergerProps;

export interface TableProps {
  name: string;
  columns: ColumnProps[];
}
