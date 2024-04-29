import { useHeaderHeight } from '@react-navigation/elements';
import React, { MutableRefObject, ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'tamagui';

interface ScreenContentProps {
  children: ReactNode;
  scrollContentContainerStyle?: ViewStyle;
  scrollViewRef?: MutableRefObject<ScrollView | null>;
}

export function ScreenContent({
  children,
  scrollContentContainerStyle = {},
  scrollViewRef,
}: ScreenContentProps) {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  const renderScrollView = (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: theme.background.val }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 13,
          paddingTop: 18,
          paddingHorizontal: 18,
          ...scrollContentContainerStyle,
        }}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
        overScrollMode="never">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  if (Platform.OS === 'android') return renderScrollView;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {renderScrollView}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
