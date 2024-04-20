import { ReactNode } from 'react';
import { Keyboard } from 'react-native';
import { Sheet as TSheet, SheetProps as TSheetProps } from 'tamagui';

export interface SheetProps extends TSheetProps {
  children?: ReactNode;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sheet({ children, open, onOpenChange, snapPoints, snapPointsMode }: SheetProps) {
  return (
    <TSheet
      {...(snapPoints && { snapPoints })}
      {...(snapPointsMode && { snapPointsMode })}
      open={open}
      onOpenChange={(open: boolean) => {
        Keyboard.dismiss();
        onOpenChange(open);
      }}
      native
      modal
      dismissOnSnapToBottom
      animationConfig={{
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
      }}>
      <TSheet.Frame borderTopStartRadius="$5" borderTopEndRadius="$5">
        {snapPoints && <TSheet.Handle backgroundColor="$gray6" mt="$3" />}
        <TSheet.ScrollView>{children}</TSheet.ScrollView>
      </TSheet.Frame>
      <TSheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
    </TSheet>
  );
}
