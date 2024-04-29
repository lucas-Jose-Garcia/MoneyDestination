import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'tamagui';

interface SummaryIconProps {
  type: 'up' | 'down';
}

export function SummaryIcon({ type }: SummaryIconProps) {
  const theme = useTheme();
  return (
    <MaterialIcons
      name={type === 'up' ? 'arrow-upward' : 'arrow-downward'}
      size={24}
      color={type === 'up' ? theme.green7.val : theme.red7.val}
    />
  );
}
