import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="transparent"
      pressStyle={{
        opacity: 0.5,
      }}
      paddingLeft={20}
      onPress={onPress}>
      <ChevronLeft />
    </Button>
  );
};
