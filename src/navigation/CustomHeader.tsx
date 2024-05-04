import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { View, useTheme } from 'tamagui';

import { RootDrawerParamList } from '.';

type ScreenNavigationProps = DrawerNavigationProp<RootDrawerParamList>;

export function CustomHeader() {
  const navigation = useNavigation<ScreenNavigationProps>();
  const theme = useTheme();

  return (
    <View pl="$3">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color={theme.color.val} />
      </TouchableOpacity>
    </View>
  );
}
