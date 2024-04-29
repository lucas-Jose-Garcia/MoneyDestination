import { Text, XStack } from 'tamagui';

interface SummaryMessageProps {
  message: string;
}

export function SummaryMessage({ message }: SummaryMessageProps) {
  return (
    <XStack p="$5" jc="space-between" borderColor="$background" bbw="$0.5">
      <Text w="100%" color="$color" textAlign="center">
        {message}
      </Text>
    </XStack>
  );
}
