import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'tamagui';

import { RootDrawerParamList } from '.';

type ScreenNavigationProps = DrawerNavigationProp<RootDrawerParamList>;

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<ScreenNavigationProps>();
  const theme = useTheme();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.background.val }}>
      <DrawerItem
        label="Visão Geral"
        onPress={() => navigation.navigate('Overview')}
        labelStyle={{ color: theme.color.val }}
      />
      <DrawerItem
        label="Categorias"
        onPress={() => navigation.navigate('Categories')}
        labelStyle={{ color: theme.color.val }}
      />
    </DrawerContentScrollView>
  );
}
