import React from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import { Text, XStack, useTheme } from 'tamagui';

interface SwitchWithLabelProps {
  labelText: string;
  isEnabled: boolean;
  setToggleSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  onCheckChange?: () => void;
}

export function SwitchWithLabel({
  labelText,
  isEnabled,
  setToggleSwitch,
  onCheckChange = () => {},
}: SwitchWithLabelProps) {
  const theme = useTheme();
  const activeColor = theme.blue10.val;
  const inactiveColor = theme.gray8.val;
  const trackActiveColor = theme.blue5.val;
  const thumbInactiveColor = theme.gray6.val;

  const toggleSwitch = () => setToggleSwitch((prevState) => !prevState);

  function onCheck() {
    onCheckChange();
    toggleSwitch();
  }

  return (
    <XStack alignItems="center" gap="$1.5">
      <Switch
        trackColor={{ false: thumbInactiveColor, true: trackActiveColor }}
        thumbColor={isEnabled ? activeColor : inactiveColor}
        onValueChange={onCheck}
        value={isEnabled}
      />
      <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.7}>
        <Text color="$color">{labelText}</Text>
      </TouchableOpacity>
    </XStack>
  );
}
