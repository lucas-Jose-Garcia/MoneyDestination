import { InputProps, Label, Input as TInput, YStack, styled } from 'tamagui';

const Input = styled(TInput, {
  backgroundColor: '$background',
});

interface InputTextProps extends InputProps {
  label: string;
  val: string;
  setVal?: React.Dispatch<React.SetStateAction<string>>;
}

export function InputText({ label, val, setVal = () => {}, ...rest }: InputTextProps) {
  return (
    <YStack>
      {label && <Label>{label}</Label>}

      <Input value={val} onChangeText={(text) => setVal(text)} {...rest} />
    </YStack>
  );
}
