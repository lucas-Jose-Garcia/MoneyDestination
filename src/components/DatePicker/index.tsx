import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';

import { InputText } from '../InputText';

interface DatePickerProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  val: Date;
  setVal: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({ isVisible, setVisible, val, setVal }: DatePickerProps) {
  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const onChange = (event: any, selectedDate: any) => {
    onClose();
    setVal(selectedDate);
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen} activeOpacity={0.7}>
        <InputText
          label="Data"
          val={val.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
          editable={false}
        />
      </TouchableOpacity>
      {isVisible && <DateTimePicker mode="date" value={val} onChange={onChange} />}
    </>
  );
}
