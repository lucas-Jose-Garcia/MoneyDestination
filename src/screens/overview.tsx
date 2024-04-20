import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';

import { ScreenContent } from '~/components/ScreenContent';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <ScreenContent>
      <Button
        onPress={() =>
          navigation.navigate('Register', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </ScreenContent>
  );
}
