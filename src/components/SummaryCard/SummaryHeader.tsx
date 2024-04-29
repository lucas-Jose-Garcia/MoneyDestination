import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text, XStack, useTheme } from 'tamagui';

export interface SummaryHeaderProps {
  title: string;
  headerRight?: {
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
  };
}

export function SummaryHeader({ title, headerRight }: SummaryHeaderProps) {
  const theme = useTheme();

  return (
    <XStack p="$3" borderColor="$background" bbw="$1" jc="space-between" ai="center">
      <Text color="$color" fontWeight="bold">
        {title}
      </Text>
      {headerRight && (
        <TouchableOpacity onPress={headerRight.onPress} activeOpacity={0.7}>
          <MaterialIcons name={headerRight.icon} size={24} color={theme.color.val} />
        </TouchableOpacity>
      )}
    </XStack>
  );
}
