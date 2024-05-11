import { ReactNode, createContext } from 'react';

import Table from '~/ORM/operations/table';
import { TableProps } from '~/ORM/types';
import { CategoryProps } from '~/types/Tables/Category';
import { ParametersProps } from '~/types/Tables/Parameters';

export interface DatabaseContextProps {
  category: Table<CategoryProps>;
  parameters: Table<ParametersProps>;
}

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseContext = createContext<DatabaseContextProps | null>(null);

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const categoryModel: TableProps<CategoryProps> = {
    name: 'category',
    columns: [
      { name: 'name', type: 'varchar', limit: 100, not_null: true },
      { name: 'icon_name', type: 'varchar', limit: 100, not_null: true },
      { name: 'type', type: 'varchar', limit: 50, not_null: true },
      { name: 'active', type: 'interger', not_null: true },
    ],
  };

  const parametersModel: TableProps<ParametersProps> = {
    name: 'parameters',
    columns: [
      { name: 'code', type: 'varchar', limit: 100, not_null: true },
      { name: 'value', type: 'varchar', limit: 100, not_null: true },
    ],
  };

  const category = new Table<CategoryProps>(categoryModel);
  const parameters = new Table<ParametersProps>(parametersModel);

  return (
    <DatabaseContext.Provider value={{ category, parameters }}>{children}</DatabaseContext.Provider>
  );
}
