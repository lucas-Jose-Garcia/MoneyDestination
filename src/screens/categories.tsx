import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'tamagui';

import { FabButton } from '~/components/FabButton';
import { ScreenContent } from '~/components/ScreenContent';
import { SheetCategories } from '~/components/SheetCategories';
import { TabView } from '~/components/TabView';
import { Tag, TagProps } from '~/components/Tag';
import { useCategories } from '~/hooks/Categories';

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
  const { refs, states, list, data, onPageSelected, toggleModal, handleAction, fetchData } =
    useCategories();

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <>
      <ScreenContent>
        <TabView
          ref={refs.refPagerView}
          currentIndex={states.currentPage}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View flex={1} gap="$3" pb="$12">
                {list.dataReceitas &&
                  list.dataReceitas.map((item) => <Tag key={item.label} {...item} />)}
              </View>
            </ScrollView>
          </View>
          <View style={styles.page} key="2">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View flex={1} gap="$3" pb="$12">
                {list.dataDespesas &&
                  list.dataDespesas.map((item) => <Tag key={item.label} {...item} />)}
              </View>
            </ScrollView>
          </View>
          <View style={styles.page} key="3">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View flex={1} gap="$3" pb="$12">
                {list.dataInvestimento &&
                  list.dataInvestimento.map((item) => <Tag key={item.label} {...item} />)}
              </View>
            </ScrollView>
          </View>
        </TabView>
      </ScreenContent>
      <FabButton
        icon="plus"
        bg={data.colorsButton[states.currentPage]}
        whichSide="right"
        onPress={toggleModal}
      />
      <SheetCategories
        color={data.colorsButton[states.currentPage]}
        open={states.isOpenModal}
        onOpenChange={states.setIsOpenModal}
        type={data.typeCategory[states.currentPage]}
        category={{ val: states.name, setVal: states.setName }}
        icon={{ val: states.activeIcon, setVal: states.setActiveIcon }}
        onAction={handleAction}
      />
    </>
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
