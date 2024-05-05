import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'tamagui';

export type FabButtonColor = 'blue' | 'green' | 'red' | 'orange';

interface FabButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap;
  bg: FabButtonColor;
  whichSide: 'right' | 'left';
  disabled?: boolean;
}

export function FabButton({ icon, bg, whichSide, disabled, ...rest }: FabButtonProps) {
  const theme = useTheme();
  const colorIcon = theme.background.val;

  const colors = {
    blue: theme.blue10.val,
    green: theme.green10.val,
    red: theme.red10.val,
    orange: theme.orange10.val,
  };

  const backgroundColor = colors[bg];

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
      backgroundColor,
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
      <Feather name={icon} size={24} color={colorIcon} />
    </TouchableOpacity>
  );
}
