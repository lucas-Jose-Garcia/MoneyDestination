import { databaseService } from '../service/database';
import { TableProps } from '../types';

export default class Table<T extends object> {
  model: TableProps<T>;

  constructor(model: TableProps<T>) {
    this.model = model;

    this.down();
    this.up();

    console.log('Construida');
  }

  async up() {
    await databaseService.createTable(this.model);
  }

  async down() {
    await databaseService.dropTable(this.model.name);
  }

  public async create(values: T) {
    await databaseService.insert<T>(this.model, values);
  }

  public async all() {
    return databaseService.select(this.model.name);
  }
}
