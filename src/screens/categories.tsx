import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { ScrollView, View } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';
import { TabView } from '~/components/TabView';
import { Tag, TagProps } from '~/components/Tag';

const mockReceitas: TagProps[] = [
  {
    icon: { bg: '$green5', name: 'attach-money' },
    label: 'Salário',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$green5', name: 'attach-money' },
    label: 'Adiantamento',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$green5', name: 'attach-money' },
    label: 'Adicionais',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$green5', name: 'attach-money' },
    label: 'Renda Extra',
    value: 0,
    onPress: () => {},
  },
];

const mockDespesas: TagProps[] = [
  {
    icon: { bg: '$red5', name: 'restaurant-menu' },
    label: 'Alimentação',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'fastfood' },
    label: 'Lanches',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'car-repair' },
    label: 'Carro',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'health-and-safety' },
    label: 'Saúde',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'checkroom' },
    label: 'Vestuário',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'home-mini' },
    label: 'Utilidades',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'volunteer-activism' },
    label: 'Doações',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$red5', name: 'beach-access' },
    label: 'Lazer',
    value: 0,
    onPress: () => {},
  },
];

const mockInvestimentos: TagProps[] = [
  {
    icon: { bg: '$orange5', name: 'attach-money' },
    label: 'Reserva',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$orange5', name: 'trending-up' },
    label: 'Ações',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$orange5', name: 'domain' },
    label: 'FIs',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$orange5', name: 'elderly' },
    label: 'Previdência',
    value: 0,
    onPress: () => {},
  },
  {
    icon: { bg: '$orange5', name: 'track-changes' },
    label: 'Metas',
    value: 0,
    onPress: () => {},
  },
];

export default function Categories() {
  const refPagerView = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
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
            color: '$green8',
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
            <View flex={1} gap="$3">
              {mockReceitas.map((item) => (
                <Tag key={item.label} {...item} />
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.page} key="2">
          <View flex={1} gap="$3">
            {mockDespesas.map((item) => (
              <Tag key={item.label} {...item} />
            ))}
          </View>
        </View>
        <View style={styles.page} key="3">
          <View flex={1} gap="$3">
            {mockInvestimentos.map((item) => (
              <Tag key={item.label} {...item} />
            ))}
          </View>
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
