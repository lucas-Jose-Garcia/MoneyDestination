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
import { CodeParameter } from '~/types/Tables/Parameters';

const baseData: CategoryProps[] = [
  { name: 'Salário', icon_name: 'attach-money', type: CategoryType.receita, active: 1 },
  { name: 'Adiantamento', icon_name: 'attach-money', type: CategoryType.receita, active: 1 },
  { name: 'Adicionais', icon_name: 'attach-money', type: CategoryType.receita, active: 1 },
  { name: 'Renda Extra', icon_name: 'attach-money', type: CategoryType.receita, active: 1 },
  { name: 'Alimentação', icon_name: 'restaurant-menu', type: CategoryType.gasto, active: 1 },
  { name: 'Lanches', icon_name: 'fastfood', type: CategoryType.gasto, active: 1 },
  { name: 'Carro', icon_name: 'car-repair', type: CategoryType.gasto, active: 1 },
  { name: 'Saúde', icon_name: 'health-and-safety', type: CategoryType.gasto, active: 1 },
  { name: 'Vestuário', icon_name: 'checkroom', type: CategoryType.gasto, active: 1 },
  { name: 'Utilidades', icon_name: 'home-mini', type: CategoryType.gasto, active: 1 },
  { name: 'Doações', icon_name: 'volunteer-activism', type: CategoryType.gasto, active: 1 },
  { name: 'Lazer', icon_name: 'beach-access', type: CategoryType.gasto, active: 1 },
  { name: 'Reserva', icon_name: 'attach-money', type: CategoryType.investimento, active: 1 },
  { name: 'Ações', icon_name: 'trending-up', type: CategoryType.investimento, active: 1 },
  { name: 'FIs', icon_name: 'domain', type: CategoryType.investimento, active: 1 },
  { name: 'Previdência', icon_name: 'elderly', type: CategoryType.investimento, active: 1 },
  { name: 'Metas', icon_name: 'track-changes', type: CategoryType.investimento, active: 1 },
];

export function useCategories() {
  const { category, parameters } = useContext(DatabaseContext) as DatabaseContextProps;

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
    setIsOpenModal(false);
    clearFields();
  };

  const handleEditing = async (id: number) => {
    const data = await category.get({ filters: [{ field: 'id', operation: '=', value: id }] });

    setCurrentId(id);
    setName(data[0].name);
    setActiveIcon(data[0].icon_name);

    setIsOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    await category.delete(id);
    fetchData();
  };

  const handleInsertBaseData = async () => {
    const BASE_DATA_INSERTED = await parameters.get({
      filters: [{ field: 'code', operation: '=', value: CodeParameter.BASE_DATA_INSERTED }],
    });

    if (BASE_DATA_INSERTED.length > 0 && BASE_DATA_INSERTED[0].value === 'INSERTED') {
      Alert.alert('Categorias', 'Categorias padrões já foram inseridas.');
      return;
    }

    await category.create(baseData);

    Alert.alert('Categorias', 'Categorias base importadas com sucesso.', [
      { text: 'OK', onPress: async () => await fetchData() },
    ]);

    await parameters.create({ code: CodeParameter.BASE_DATA_INSERTED, value: 'INSERTED' });
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
        onEditing: () => handleEditing(item.id),
        onDelete: () => handleDelete(item.id),
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
    handleEditing,
    handleDelete,
    handleInsertBaseData,
  };
}
