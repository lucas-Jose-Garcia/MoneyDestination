import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTheme } from 'tamagui';

import { RootDrawerParamList } from '../navigation';

import Table from '~/ORM/operations/table';
import { FabButton } from '~/components/FabButton';
import { CircleProgress } from '~/components/ProgressCircle';
import { ScreenContent } from '~/components/ScreenContent';
import { SheetOptions } from '~/components/SheetOptions';
import { SummaryCard } from '~/components/SummaryCard';
import { SummaryIcon } from '~/components/SummaryCard/SummaryIcon';

type OverviewScreenNavigationProps = DrawerNavigationProp<RootDrawerParamList, 'Overview'>;

export default function Overview() {
  const theme = useTheme();

  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <ScreenContent scrollContentContainerStyle={{ paddingBottom: 64 }}>
        <SummaryCard
          header={{
            title: 'Receitas em aberto',
            headerRight: { icon: 'history', onPress: () => {} },
          }}
          itens={[
            {
              text: 'Salário (Março - 2024)',
              value: '83%',
              left: (
                <MaterialCommunityIcons name="currency-usd" size={24} color={theme.color.val} />
              ),
            },
            {
              text: 'Adiantamento (Março - 2024)',
              value: '83%',
              left: (
                <MaterialCommunityIcons name="currency-usd" size={24} color={theme.color.val} />
              ),
            },
          ]}
          messageEmptyItems="Não existe receitas em aberto."
        />

        <SummaryCard
          header={{
            title: 'Destinos',
            headerRight: { icon: 'history', onPress: () => {} },
          }}
          itens={[
            {
              text: 'Alimentação',
              value: '23%',
              left: <CircleProgress percent={0.23} />,
            },
            {
              text: 'Lanches',
              value: '13%',
              left: <CircleProgress percent={0.13} />,
            },
            {
              text: 'Carro',
              value: '15%',
              left: <CircleProgress percent={0.15} />,
            },
            {
              text: 'Educação',
              value: '11%',
              left: <CircleProgress percent={0.11} />,
            },
            {
              text: 'Saúde',
              value: '21%',
              left: <CircleProgress percent={0.21} />,
            },
            {
              text: 'Vestuário ',
              value: '17%',
              left: <CircleProgress percent={0.17} />,
            },
          ]}
          messageEmptyItems="Não existe lançamentos nessa referência."
        />

        <SummaryCard
          header={{
            title: 'Últimos Lançamentos',
            headerRight: { icon: 'history', onPress: () => {} },
          }}
          itens={[
            {
              text: 'Mercado',
              value: 'R$ 99,23',
              left: <SummaryIcon type="down" />,
            },
            {
              text: 'Remédios',
              value: 'R$ 56,30',
              left: <SummaryIcon type="down" />,
            },
            {
              text: 'Salário',
              value: 'R$ 1.236,27',
              left: <SummaryIcon type="up" />,
            },
            {
              text: 'Gasolina',
              value: 'R$ 100,00',
              left: <SummaryIcon type="down" />,
            },
            {
              text: 'Consulta',
              value: 'R$ 300,00',
              left: <SummaryIcon type="down" />,
            },
          ]}
          messageEmptyItems="Não existe lançamentos nessa referência."
        />
      </ScreenContent>

      <FabButton icon="plus" bg="blue" whichSide="right" onPress={() => setIsOpenModal(true)} />

      <SheetOptions
        open={isOpenModal}
        onOpenChange={setIsOpenModal}
        actions={[
          {
            text: 'Receita',
            icon: 'plus-circle',
            bg: '$green6',
            onPress: () =>
              navigation.navigate('Register', { type: 'Receita', bg: theme.green6.val }),
            onPressFast: async () => {},
          },
          {
            text: 'Despesa',
            icon: 'minus-circle',
            bg: '$red6',
            onPress: () => navigation.navigate('Register', { type: 'Despesa', bg: theme.red6.val }),
            onPressFast: async () => {},
          },
          {
            text: 'Investimento',
            icon: 'arrow-up-circle',
            bg: '$orange6',
            onPress: () =>
              navigation.navigate('Register', { type: 'Investimento', bg: theme.orange6.val }),
            onPressFast: async () => {},
          },
        ]}
      />
    </>
  );
}
