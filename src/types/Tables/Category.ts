import { MaterialIcons } from '@expo/vector-icons';

import { TableBase } from '~/ORM/types';

export type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;

export enum CategoryType {
  receita = 'receita',
  gasto = 'gasto',
  investimento = 'investimento',
}

export interface CategoryProps extends TableBase {
  name: string;
  icon_name: MaterialIconsName;
  tipo: CategoryType;
}
