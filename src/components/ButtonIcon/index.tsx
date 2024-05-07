import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ColorTokens, View } from 'tamagui';

import { MaterialIconsName } from '~/types/Tables/Category';

interface ButtonIconProps extends TouchableOpacityProps {
  name: MaterialIconsName;
  bg: ColorTokens;
}

export function ButtonIcon({ name, bg, ...rest }: ButtonIconProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <View w="$3.5" h="$3.5" br={50} ai="center" jc="center" bg={bg} mt="$1.5">
        <MaterialIcons name={name} size={24} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
}
