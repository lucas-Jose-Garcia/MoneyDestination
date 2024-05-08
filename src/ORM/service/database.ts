import { executeTransaction } from '~/ORM/sqlite';
import { TableBase, TableProps } from '~/ORM/types';

interface DatabaseService {
  createTable: <T extends TableBase>(model: TableProps<T>) => void;
  dropTable: (name: string) => void;
  insert: <T extends TableBase>(model: TableProps<T>, values: T) => void;
  select: (name: string) => void;
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
      variables.push(values[column.name]);
    });

    sql = sql.slice(0, -1) + ');';

    console.log(sql);

    const result = await executeTransaction(sql, variables);

    return { insertId: result.insertId };
  },
  select: async (name) => {
    const sql = `SELECT * FROM ${name}`;
    const result = await executeTransaction(sql);
    return result;
  },
};

export const databaseService: DatabaseService = databaseOperations;
