import { MaterialIcons } from '@expo/vector-icons';

export type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;

export enum CategoryType {
  receita = 'receita',
  gasto = 'gasto',
  investimento = 'investimento',
}

export interface CategoryProps {
  name: string;
  icon_name: MaterialIconsName;
  type: CategoryType;
  active: 0 | 1;
}
