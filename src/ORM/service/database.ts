import { executeTransaction } from '~/ORM/sqlite';
import { CompleteTableProps, TableProps } from '~/ORM/types';
import { CategoryProps } from '~/types/Tables/Category';

type OperationProps = '=';

interface FiltersProps<T extends object> {
  field: keyof CompleteTableProps<T>;
  operation: OperationProps;
  value: string | number | null;
}

export interface SelectProps<T extends object> {
  columns?: (keyof T)[];
  filters?: FiltersProps<T>[];
}

interface DatabaseService {
  createTable: <T extends object>(model: TableProps<T>) => void;
  dropTable: (name: string) => void;
  insert: <T extends object>(model: TableProps<T>, values: T) => void;
  select: <T extends object>(model: TableProps<T>, dataSelect?: SelectProps<T>) => void;
  update: <T extends object>(model: TableProps<T>, values: T, id: number) => void;
}

const databaseOperations: DatabaseService = {
  createTable: async (model) => {
    let sql = `CREATE TABLE IF NOT EXISTS ${model.name} (id INTEGER PRIMARY KEY AUTOINCREMENT, `;
    model.columns.forEach((column) => {
      sql += `${String(column.name)} ${column.type.toUpperCase()}${column.type === 'varchar' && `(${column.limit})`}${column.not_null ? ' NOT NULL,' : ','}`;
    });
    sql = sql.slice(0, -1) + ');';

    await executeTransaction(sql);

    console.log(sql);
  },
  dropTable: async (name) => {
    const sql = `DROP TABLE ${name}`;
    await executeTransaction(sql);
  },
  insert: async (model, values) => {
    const variables: (string | number | null)[] = [];
    let sql = `INSERT INTO ${model.name} (`;

    model.columns.forEach((column) => {
      sql += `${String(column.name)},`;
    });

    sql = sql.slice(0, -1) + ') values (';

    model.columns.forEach((column) => {
      sql += `?,`;
      //TODO: Verificar se tem uma forma melhor de garantir o tipo do valor sem usar as string | number | null
      variables.push(values[column.name] as string | number | null);
    });

    sql = sql.slice(0, -1) + ');';

    console.log(sql);

    const result = await executeTransaction(sql, variables);

    return { insertId: result.insertId };
  },
  select: async (model, data) => {
    let sql = `SELECT`;

    if (data && data.columns && data.columns.length > 0) {
      data.columns.forEach((column) => {
        sql += ` ${String(column)},`;
      });
    } else {
      sql += ' * ';
    }

    sql = sql.slice(0, -1) + `  FROM ${model.name}`;

    if (data && data.filters && data.filters.length > 0) {
      sql += ` WHERE`;

      data.filters.forEach((filter, index) => {
        if (index > 0) sql += ` AND`;
        sql += ` ${String(filter.field)} ${filter.operation} ${typeof filter.value === 'string' ? `'${filter.value}'` : filter.value}`;
      });
    }

    console.log(sql);
    const result = await executeTransaction(sql);
    return result;
  },
  update: async (model, values, id) => {
    const variables: (string | number | null)[] = [];
    let sql = `UPDATE ${model.name} SET `;

    model.columns.forEach((column) => {
      sql += `${String(column.name)} = ?,`;
      //TODO: Verificar se tem uma forma melhor de garantir o tipo do valor sem usar as string | number | null
      variables.push(values[column.name] as string | number | null);
    });

    sql = sql.slice(0, -1) + ` WHERE id = ${id}`;

    console.log(sql);

    const result = await executeTransaction(sql, variables);

    return { rowsAffected: result.rowsAffected };
  },
};

export const databaseService: DatabaseService = databaseOperations;
