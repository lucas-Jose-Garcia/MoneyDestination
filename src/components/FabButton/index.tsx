import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'tamagui';

interface FabButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  whichSide: 'right' | 'left';
  disabled?: boolean;
}

export function FabButton({ icon, whichSide, disabled, ...rest }: FabButtonProps) {
  const theme = useTheme();
  const background = theme.background.val;

  const styles = StyleSheet.create({
    defaut: {
      borderRadius: 50,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 16,
    },
    left: {
      left: 16,
    },
    right: {
      right: 16,
    },
    active: {
      backgroundColor: theme.blue10.val,
    },
    disabled: {
      backgroundColor: theme.gray8.val,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.defaut,
        whichSide === 'right' ? styles.right : styles.left,
        disabled ? styles.disabled : styles.active,
      ]}
      activeOpacity={disabled ? 1 : 0.7}
      {...rest}>
      <Feather name={icon} size={24} color={background} />
    </TouchableOpacity>
  );
}
