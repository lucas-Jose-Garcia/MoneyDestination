import { databaseService } from '../service/database';
import { TableProps } from '../types/orm/tables';

import { MaterialIconsName } from '~/components/ButtonIcon';

export enum CategoryType {
  receita = 'receita',
  gasto = 'gasto',
  investimento = 'investimento',
}

export interface CategoryProps {
  name: string;
  icon_name: MaterialIconsName;
  tipo: CategoryType;
}

export default class Category {
  table: TableProps = {
    name: 'category',
    columns: [
      { name: 'name', type: 'varchar', limit: 100, not_null: true },
      { name: 'icon_name', type: 'varchar', limit: 100, not_null: true },
      { name: 'tipo', type: 'varchar', limit: 50, not_null: true },
    ],
  };

  constructor() {
    this.down();
    this.up();
    console.log('Construida');
  }

  async up() {
    await databaseService.createTable(this.table);
  }

  async down() {
    await databaseService.dropTable(this.table.name);
  }

  public async create() {
    console.log('Registrado!');
  }

  public async all() {
    return databaseService.select(this.table.name);
  }
}
