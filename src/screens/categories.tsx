import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'tamagui';

import { FabButton } from '~/components/FabButton';
import { ScreenContent } from '~/components/ScreenContent';
import { SheetCategories } from '~/components/SheetCategories';
import { TabView } from '~/components/TabView';
import { Tag } from '~/components/Tag';
import { useCategories } from '~/hooks/Categories';

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
