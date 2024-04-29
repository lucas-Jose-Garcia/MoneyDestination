import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'tamagui';

import { BackButton } from '../components/BackButton';

import Overview from '~/screens/overview';
import Register from '~/screens/register';

export type RootStackParamList = {
  Overview: undefined;
  Register: { type: 'Receita' | 'Despesa' | 'Investimento'; bg: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Overview"
        screenOptions={{
          headerStyle: { backgroundColor: theme.backgroundStrong.val },
          headerTitleStyle: { color: theme.color.val },
        }}>
        <Stack.Screen name="Overview" component={Overview} options={{ title: 'Visão Geral' }} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={({ navigation }) => ({
            title: 'Cadastrar Transação',
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
