import { useContext, useRef, useState } from 'react';
import { Alert } from 'react-native';
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { ColorTokens } from 'tamagui';

import { CompleteTableProps } from '~/ORM/types';
import { TypeCategory } from '~/components/SheetCategories';
import { TagProps } from '~/components/Tag';
import { ColorsOptions } from '~/components/values/customColors';
import { DatabaseContext, DatabaseContextProps } from '~/contexts/databaseContext';
import { CategoryProps, CategoryType, MaterialIconsName } from '~/types/Tables/Category';

export function useCategories() {
  const { category } = useContext(DatabaseContext) as DatabaseContextProps;

  const refPagerView = useRef<PagerView>(null);

  const colorsButton: ColorsOptions[] = ['green', 'red', 'orange'];
  const typeCategory: TypeCategory[] = ['Receita', 'Despesa', 'Investimento'];
  const colorsTamagui: { [key in CategoryType]: ColorTokens } = {
    receita: '$green5',
    gasto: '$red5',
    investimento: '$orange5',
  };
  const typeIndex = [CategoryType.receita, CategoryType.gasto, CategoryType.investimento];

  const [currentPage, setCurrentPage] = useState(0);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [activeIcon, setActiveIcon] = useState<MaterialIconsName | null>(null);

  const [dataReceitas, setDataReceitas] = useState<TagProps[]>();
  const [dataDespesas, setDataDespesas] = useState<TagProps[]>();
  const [dataInvestimento, setDataInvestimento] = useState<TagProps[]>();

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
  };

  const toggleModal = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  const handleAction = async () => {
    if (name === '' || activeIcon === null) {
      Alert.alert('Cadastro', 'Preencha o nome e selecione um ícone!', [{ text: 'OK' }]);
      return;
    }

    const data: CategoryProps = {
      name,
      icon_name: activeIcon,
      type: typeIndex[currentPage],
      active: 1,
    };

    if (currentId === null) {
      await category.create(data);
      Alert.alert('Categoria', 'Categoria cadastrada com sucesso!', [{ text: 'OK' }]);
    } else {
      await category.update(data, currentId);
      Alert.alert('Categoria', 'Categoria atualizada com sucesso!', [{ text: 'OK' }]);
    }

    fetchData();
    toggleModal();
    clearFields();
  };

  const clearFields = () => {
    setCurrentId(null);
    setName('');
    setActiveIcon(null);
  };

  const fetchData = async () => {
    const revenues = await fetchRevenues();
    const expense = await fetchExpense();
    const investment = await fetchInvestment();

    setDataReceitas(revenues);
    setDataDespesas(expense);
    setDataInvestimento(investment);
  };

  const fetchRevenues = async () => {
    const revenues = await category.get({
      filters: [{ field: 'type', operation: '=', value: CategoryType.receita }],
    });

    return createTag(revenues);
  };

  const fetchExpense = async () => {
    const expense = await category.get({
      filters: [{ field: 'type', operation: '=', value: CategoryType.gasto }],
    });

    return createTag(expense);
  };

  const fetchInvestment = async () => {
    const investment = await category.get({
      filters: [{ field: 'type', operation: '=', value: CategoryType.investimento }],
    });

    return createTag(investment);
  };

  const createTag = (data: CompleteTableProps<CategoryProps>[]) => {
    const stage: TagProps[] = data.map((item) => {
      const tag: TagProps = {
        icon: { bg: colorsTamagui[item.type], name: item.icon_name },
        label: item.name,
        value: 0,
        onPress: () => {},
      };
      return tag;
    });

    return stage;
  };

  return {
    refs: {
      refPagerView,
    },
    states: {
      currentPage,
      setCurrentPage,
      currentId,
      setCurrentId,
      isOpenModal,
      setIsOpenModal,
      name,
      setName,
      activeIcon,
      setActiveIcon,
    },
    list: { dataReceitas, dataDespesas, dataInvestimento },
    data: { colorsButton, typeCategory },
    onPageSelected,
    toggleModal,
    handleAction,
    fetchData,
  };
}
