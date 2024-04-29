import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import { RootStackParamList } from '../navigation';

import { DatePicker } from '~/components/DatePicker';
import { InputText } from '~/components/InputText';
import { ScreenContent } from '~/components/ScreenContent';
import { Select } from '~/components/Select';
import { SwitchWithLabel } from '~/components/SwitchWithLabel';
import { useTransactions } from '~/hooks/Transactions';

type RegisterSreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type RegisterScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const router = useRoute<RegisterSreenRouteProp>();
  const navigation = useNavigation<RegisterScreenNavigationProps>();

  const { states } = useTransactions();

  function onCheckCreditCard() {
    if (!states.isCreditCard && states.isPaid) states.setIsPaid(false);
  }

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: `Cadastrar ${router.params.type}`,
        headerStyle: {
          backgroundColor: router.params.bg,
        },
      });
    }, [])
  );

  return (
    <ScreenContent>
      <DatePicker
        isVisible={states.showDatePicker}
        setVisible={states.setShowDatePicker}
        val={states.date}
        setVal={states.setDate}
      />
      <InputText
        label="Valor"
        val={states.value}
        setVal={states.setValue}
        keyboardType="number-pad"
      />
      <Select
        label="Categoria"
        placeholder="Categoria"
        val={states.category}
        setVal={states.setCategory}
        data={['Exemplo 01', 'Exemplo 02']}
      />
      <Select
        label="Origem"
        placeholder="Origem"
        val={states.origin}
        setVal={states.setOrigin}
        data={['Exemplo 01', 'Exemplo 02']}
      />
      <Select
        label="Destino"
        placeholder="Destino"
        val={states.destination}
        setVal={states.setDestination}
        data={['Exemplo 01', 'Exemplo 02']}
      />
      <Select
        label="Tipo"
        placeholder="Tipo"
        val={states.destination}
        setVal={states.setDestination}
        data={['Pessoal', 'Compartilhado', 'Emprestado', 'Contribuição']}
      />
      <Select
        label="Referência"
        placeholder="Referência"
        val={states.reference}
        setVal={states.setReference}
        data={['Março - 2024', 'Abril - 2024']}
      />

      <SwitchWithLabel
        labelText="Cartão de Crédito"
        isEnabled={states.isCreditCard}
        setToggleSwitch={states.setIsCreditCard}
        onCheckChange={onCheckCreditCard}
      />
      <SwitchWithLabel
        labelText="Pago"
        isEnabled={states.isPaid}
        setToggleSwitch={states.setIsPaid}
      />
    </ScreenContent>
  );
}
