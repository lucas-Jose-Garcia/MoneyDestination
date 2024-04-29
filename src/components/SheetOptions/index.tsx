import { YStack } from 'tamagui';

import { ActionProps, ButtonOption } from './ButtonOption';
import { Sheet } from '../Sheet';

export interface SheetProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  actions: ActionProps[];
}

export function SheetOptions({ open, onOpenChange, actions }: SheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} snapPointsMode="fit">
      <YStack padding="$4" gap="$3">
        {actions.map((action) => (
          <ButtonOption key={action.text} action={action} onOpenChange={onOpenChange} />
        ))}
      </YStack>
    </Sheet>
  );
}
