import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'tamagui';

import { CustomDrawerContent } from './CustomDrawerContent';
import { CustomHeader } from './CustomHeader';
import { BackButton } from '../components/BackButton';

import Categories from '~/screens/categories';
import Overview from '~/screens/overview';
import Register from '~/screens/register';

export type RootDrawerParamList = {
  Overview: undefined;
  Register: { type: 'Receita' | 'Despesa' | 'Investimento'; bg: string };
  Categories: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootStack() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Overview"
        screenOptions={{
          headerStyle: { backgroundColor: theme.backgroundStrong.val },
          headerTitleStyle: { color: theme.color.val },
          headerLeft: () => <CustomHeader />,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Overview" component={Overview} options={{ title: 'Visão Geral' }} />
        <Drawer.Screen name="Categories" component={Categories} options={{ title: 'Categorias' }} />
        <Drawer.Screen
          name="Register"
          component={Register}
          options={({ navigation }) => ({
            title: 'Cadastrar Transação',
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
