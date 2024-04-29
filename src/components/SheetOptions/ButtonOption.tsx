import { Entypo, Feather } from '@expo/vector-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ButtonText, ColorTokens, XStack, useTheme } from 'tamagui';

export interface ActionProps {
  text: string;
  icon: keyof typeof Feather.glyphMap;
  bg: ColorTokens;
  onPress: () => void;
  onPressFast: () => void;
}

interface ButtonOptionProps extends TouchableOpacityProps {
  action: ActionProps;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ButtonOption({ action, onOpenChange }: ButtonOptionProps) {
  const theme = useTheme();
  const color = theme.color.val;

  function onPressAction() {
    action.onPress();
    onOpenChange(false);
  }

  return (
    <XStack w="100%">
      <TouchableOpacity style={{ flex: 1 }} onPress={onPressAction} activeOpacity={0.7}>
        <XStack p="$3.5" gap="$3" bg={action.bg} bblr="$3" btlr="$3">
          <Feather name={action.icon} size={24} color={color} />
          <ButtonText color="$color">{action.text}</ButtonText>
        </XStack>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={action.onPressFast}>
        <XStack p="$3.5" gap="$3" bg={action.bg} bbrr="$3" btrr="$3">
          <Entypo name="flash" size={24} color={color} />
        </XStack>
      </TouchableOpacity>
    </XStack>
  );
}
