import { Feather } from '@expo/vector-icons';
import { ChevronDown } from '@tamagui/lucide-icons';
import { useEffect } from 'react';
import { Adapt, Select as TSelect, Sheet, Label, YStack, Text, XStack } from 'tamagui';

import { CustomWidthProps, customWidth } from '../values/customWidth';

interface SelectProps<T extends string | undefined> {
  label?: string;
  placeholder: string;
  val: T;
  setVal: React.Dispatch<React.SetStateAction<T>>;
  data: string[];
  onValueChange?: () => void;
  dataIcon?: React.ComponentProps<typeof Feather>['name'][];
  size?: CustomWidthProps;
  flex?: boolean;
}

export function Select<T extends string | undefined>({
  label,
  placeholder,
  val,
  setVal,
  data,
  onValueChange = () => {},
  dataIcon,
  size = 'full',
  flex,
}: SelectProps<T>) {
  const handleValueChange = (value: string) => {
    setVal(value as T);
  };

  useEffect(() => {
    onValueChange();
  }, [val]);
  return (
    <YStack w={customWidth[size]} {...(flex && { flex: 1 })}>
      {label && <Label>{label}</Label>}
      <TSelect value={val} onValueChange={handleValueChange}>
        <TSelect.Trigger
          iconAfter={ChevronDown}
          borderWidth="$0.5"
          borderColor="$gray6"
          bg="$backgroundPress">
          <TSelect.Value placeholder={placeholder}>
            <Text>{val}</Text>
          </TSelect.Value>
        </TSelect.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            snapPointsMode="fit"
            native
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <TSelect.Content>
          <TSelect.Viewport>
            {data.map((item, i) => (
              <TSelect.Item key={item} index={1} value={item}>
                <XStack ai="center" gap="$2">
                  {dataIcon && <Feather name={dataIcon[i]} />}

                  <TSelect.ItemText>{item}</TSelect.ItemText>
                </XStack>
              </TSelect.Item>
            ))}
          </TSelect.Viewport>
        </TSelect.Content>
      </TSelect>
    </YStack>
  );
}
