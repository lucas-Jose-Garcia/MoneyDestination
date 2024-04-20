import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { RootStackParamList } from '../navigation';

import { DatePicker } from '~/components/DatePicker';
import { InputText } from '~/components/InputText';
import { ScreenContent } from '~/components/ScreenContent';
import { Select } from '~/components/Select';
import { useTransactions } from '~/hooks/Transactions';

type RegisterSreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

export default function Register() {
  const router = useRoute<RegisterSreenRouteProp>();

  const { states } = useTransactions();

  return (
    <ScreenContent>
      <DatePicker
        isVisible={states.showDatePicker}
        setVisible={states.setShowDatePicker}
        val={states.date}
        setVal={states.setDate}
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
      <InputText
        label="Valor"
        val={states.value}
        setVal={states.setValue}
        keyboardType="number-pad"
      />
    </ScreenContent>
  );
}
