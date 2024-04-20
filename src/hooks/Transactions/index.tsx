import { useState } from 'react';

export function useTransactions() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [origin, setOrigin] = useState('');
  const [category, setCategory] = useState('');
  const [destination, setDestination] = useState('');
  const [reference, setReference] = useState('');
  const [value, setValue] = useState('');

  return {
    states: {
      showDatePicker,
      setShowDatePicker,
      date,
      setDate,
      origin,
      setOrigin,
      category,
      setCategory,
      destination,
      setDestination,
      reference,
      setReference,
      value,
      setValue,
    },
  };
}
