import { ReactNode } from 'react';
import { Text, View, XStack } from 'tamagui';

export interface SummaryItemProps {
  text: string;
  value: string;
  left?: ReactNode;
}

export function SummaryItem({ text, value, left }: SummaryItemProps) {
  return (
    <XStack p="$3" jc="space-between" ai="center" borderColor="$background" bbw="$0.5">
      <XStack ai="center">
        {left && <View pr="$2">{left}</View>}
        <Text color="$color">{text}</Text>
      </XStack>
      <Text color="$color">{value}</Text>
    </XStack>
  );
}
