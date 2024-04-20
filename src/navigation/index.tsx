import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';

import Overview from '~/screens/overview';
import Register from '~/screens/register';

export type RootStackParamList = {
  Overview: undefined;
  Register: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Overview">
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
