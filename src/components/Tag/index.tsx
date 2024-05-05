import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ColorTokens, Text, View, XStack, YStack, useTheme } from 'tamagui';

import { helper } from '~/utils/helper';

export interface TagProps {
  icon: {
    bg: ColorTokens;
    name: React.ComponentProps<typeof MaterialIcons>['name'];
  };
  label: string;
  value: number;
  onPress: () => void;
}

export function Tag({ icon, label, value, onPress }: TagProps) {
  const theme = useTheme();
  const color = theme.color.val;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <XStack gap="$3" px="$2.5">
        <View w="$3.5" h="$3.5" bg={icon.bg} br={50} jc="center" ai="center">
          <MaterialIcons name={icon.name} size={24} color={color} />
        </View>
        <XStack flex={1} ai="center" jc="space-between">
          <YStack>
            <Text color="$color" fontSize="$5">
              {label}
            </Text>
            <Text color="$color" fontSize="$2">
              {helper.format.currency(value)}
            </Text>
          </YStack>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color={color} />
          </TouchableOpacity>
        </XStack>
      </XStack>
    </TouchableOpacity>
  );
}
