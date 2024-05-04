import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { ColorTokens, Text, View, XStack } from 'tamagui';

interface TabProps {
  label: string;
  color: ColorTokens;
  index: number;
}

interface TabButtonProps extends TabProps {
  currentIndex: number;
}

interface TabViewProps {
  itens: TabProps[];
  currentIndex: number;
  onPageSelected: (event: PagerViewOnPageSelectedEvent) => void;
  children: ReactNode;
}

const TabButton = React.forwardRef((props: TabButtonProps, ref: React.Ref<PagerView> | null) => {
  const active = props.index === props.currentIndex;
  console.log('props', props);

  return (
    <TouchableOpacity
      style={{ width: '33%' }}
      onPress={() => {
        if (ref && 'current' in ref && ref.current) {
          ref.current.setPage(props.index);
        }
      }}>
      <View
        flex={1}
        py="$2"
        jc="center"
        ai="center"
        bc={active ? '$backgroundFocus' : '$background'}
        btrr="$2"
        btlr="$2"
        bbw="$1.5"
        borderColor={active ? props.color : '$background'}>
        <Text color="$color">{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
});

export const TabView = React.forwardRef((props: TabViewProps, ref: React.Ref<PagerView> | null) => {
  return (
    <>
      <XStack w="100%" ai="center" jc="space-between" bg="$background">
        {props.itens.map((item) => (
          <TabButton key={item.index} {...item} currentIndex={props.currentIndex} ref={ref} />
        ))}
      </XStack>
      <PagerView
        ref={ref}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={props.onPageSelected}>
        {props.children}
      </PagerView>
    </>
  );
});
