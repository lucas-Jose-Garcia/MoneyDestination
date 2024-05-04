import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { ScrollView, Text, View } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';
import { TabView } from '~/components/TabView';

export default function Categories() {
  const refPagerView = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
    console.log('Página selecionada:', position);
  };
  return (
    <ScreenContent>
      <TabView
        ref={refPagerView}
        currentIndex={currentPage}
        onPageSelected={onPageSelected}
        itens={[
          {
            index: 0,
            label: 'Receitas',
            color: '$blue8',
          },
          {
            index: 1,
            label: 'Despesas',
            color: '$red8',
          },
          {
            index: 2,
            label: 'Investimentos',
            color: '$orange8',
          },
        ]}>
        <View style={styles.page} key="1">
          <ScrollView>
            <Text color="$color">First page</Text>
            <Text color="$color">Swipe ➡️</Text>
          </ScrollView>
        </View>
        <View style={styles.page} key="2">
          <Text color="$color">Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text color="$color">Third page</Text>
        </View>
      </TabView>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
