import { YStack } from 'tamagui';

import { SummaryHeader, SummaryHeaderProps } from './SummaryHeader';
import { SummaryItem, SummaryItemProps } from './SummaryItem';
import { SummaryMessage } from './SummaryMessage';

interface SummaryCardProps {
  header: SummaryHeaderProps;
  itens: SummaryItemProps[];
  messageEmptyItems: string;
}

export function SummaryCard({ header, itens, messageEmptyItems }: SummaryCardProps) {
  return (
    <YStack bg="$backgroundFocus" br="$3" my="$2">
      <SummaryHeader title={header.title} headerRight={header.headerRight} />
      {itens.length > 0 ? (
        itens.map((item, i) => (
          <SummaryItem key={item.text + i} text={item.text} left={item.left} value={item.value} />
        ))
      ) : (
        <SummaryMessage message={messageEmptyItems} />
      )}
    </YStack>
  );
}
