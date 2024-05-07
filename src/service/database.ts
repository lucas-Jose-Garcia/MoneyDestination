import { executeTransaction } from '~/sqlite';
import { TableProps } from '~/types/orm/tables';

interface DatabaseService {
  createTable: (props: TableProps) => void;
  dropTable: (name: string) => void;
  insert: (name: string) => void;
  select: (name: string) => void;
}

const databaseOperations: DatabaseService = {
  createTable: async (props) => {
    let sql = `CREATE TABLE IF NOT EXISTS ${props.name} (id INTEGER PRIMARY KEY AUTOINCREMENT, `;
    props.columns.forEach((column) => {
      sql += `${column.name} ${column.type.toUpperCase()}${column.type === 'varchar' && `(${column.limit})`}${column.not_null ? ' NOT NULL,' : ','}`;
    });
    sql = sql.slice(0, -1) + ');';

    await executeTransaction(sql);

    console.log(sql);
  },
  dropTable: async (name) => {
    const sql = `DROP TABLE ${name}`;
    await executeTransaction(sql);
  },
  insert: async (name) => {
    const sql = `INSERT INTO ${name} (descricao, valor) values ('descricao2', 36);`;

    const result = await executeTransaction(sql);

    return { insertId: result.insertId };
  },
  select: async (name) => {
    const sql = `SELECT * FROM ${name}`;
    const result = await executeTransaction(sql);
    return result;
  },
};

export const databaseService: DatabaseService = databaseOperations;
