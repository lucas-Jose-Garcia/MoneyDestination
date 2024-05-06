import { Button, H4, ScrollView, View, XStack, YStack, Text, useTheme, ColorTokens } from 'tamagui';

import { ButtonIcon, MaterialIconsName } from '../ButtonIcon';
import { InputText } from '../InputText';
import { Sheet } from '../Sheet';
import { ColorsOptions } from '../values/customColors';

export type TypeCategory = 'Receita' | 'Despesa' | 'Investimento';

export interface SheetCategoriesProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  type: TypeCategory;
  color: ColorsOptions;
  category: { val: string; setVal: React.Dispatch<React.SetStateAction<string>> };
  icon: {
    val: string | null;
    setVal: React.Dispatch<React.SetStateAction<MaterialIconsName | null>>;
  };
}

type MaterialGroupNames<T extends string> = {
  [key in T]: MaterialIconsName[];
};

export function SheetCategories({
  open,
  onOpenChange,
  type,
  category,
  color,
  icon,
}: SheetCategoriesProps) {
  const theme = useTheme();
  const colors = {
    blue: theme.blue10.val,
    green: theme.green10.val,
    red: theme.red10.val,
    orange: theme.orange10.val,
  };

  const colorsTamagui: { [key in ColorsOptions]: ColorTokens } = {
    blue: '$blue10',
    green: '$green10',
    red: '$red10',
    orange: '$orange10',
  };

  const materialGroupNames: MaterialGroupNames<string> = {
    Receitas: [
      'payment',
      'account-balance',
      'account-balance-wallet',
      'savings',
      'attach-money',
      'health-and-safety',
      'volunteer-activism',
      'trending-up',
      'track-changes',
      'analytics',
    ],
    Compras: [
      'shopping-basket',
      'paid',
      'local-mall',
      'shopping-cart',
      'credit-score',
      'add-business',
      'receipt',
      'receipt-long',
      'work',
      'store',
      'domain',
      'ssid-chart',
      'check-box',
      'palette',
    ],
    Pessoas: [
      'person',
      'person-2',
      'person-3',
      'person-4',
      'person-add',
      'boy',
      'girl',
      'face',
      'face-2',
      'face-3',
      'face-4',
      'face-5',
      'elderly',
      'sentiment-satisfied',
      'sentiment-dissatisfied',
      'handshake',
      'waving-hand',
      'thumbs-up-down',
    ],
    Alimentacao: [
      'fastfood',
      'restaurant-menu',
      'menu-book',
      'menu-open',
      'lunch-dining',
      'cake',
      'local-cafe',
      'local-bar',
      'local-drink',
      'liquor',
      'local-pizza',
      'ramen-dining',
      'egg',
      'brunch-dining',
      'set-meal',
      'breakfast-dining',
      'takeout-dining',
      'rice-bowl',
      'soup-kitchen',
      'food-bank',
      'tapas',
    ],
    Mobilidade: [
      'directions-car',
      'local-shipping',
      'directions-bus',
      'airport-shuttle',
      'pedal-bike',
      'directions-bike',
      'directions-boat',
      'local-taxi',
      'ev-station',
      'electric-car',
      'no-crash',
      'car-repair',
      'commute',
    ],
    Lazer: [
      'beach-access',
      'icecream',
      'spa',
      'cottage',
      'pool',
      'luggage',
      'sports-bar',
      'location-city',
      'travel-explore',
      'trip-origin',
      'contact-phone',
      'personal-injury',
      'room-service',
      'airline-stops',
    ],
    Outros: [
      'key',
      'sync',
      'bolt',
      'block',
      'restart-alt',
      'file-open',
      'create-new-folder',
      'forward-to-inbox',
      'home-mini',
      'checkroom',
    ],
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} snapPointsMode="fit">
      <YStack padding="$4">
        <YStack pb="$3.5" gap="$1.5">
          <H4>Cadastrar {type}</H4>
          <View borderColor={colors[color]} bbw="$1.5" br={50} />
        </YStack>
        <YStack gap="$3">
          <InputText label="Descrição" val={category.val} setVal={category.setVal} />
          <ScrollView h="$18" showsVerticalScrollIndicator={false}>
            {Object.keys(materialGroupNames).map((nameGroup) => (
              <XStack>
                <YStack>
                  <Text color="$color" pt="$3" pb="$2">
                    {nameGroup}
                  </Text>
                  <View
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    space="$2"
                    gap="$1">
                    {materialGroupNames[nameGroup].map((name) => (
                      <ButtonIcon
                        key={name}
                        name={name}
                        bg={icon.val === name ? colorsTamagui[color] : '$backgroundFocus'}
                        onPress={() =>
                          icon.setVal((prevState) => (prevState === name ? null : name))
                        }
                      />
                    ))}
                  </View>
                </YStack>
              </XStack>
            ))}
          </ScrollView>
          <Button bg={colors[color]} mt="$4">
            Salvar
          </Button>
        </YStack>
      </YStack>
    </Sheet>
  );
}
