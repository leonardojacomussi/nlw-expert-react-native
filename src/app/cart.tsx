import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { useState } from "react";
import { Header } from "@/components/header";
import { Feather } from "@expo/vector-icons";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from  "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5511939384181";

export default function Cart(){
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const total = formatCurrency(
    cartStore
      .products
      .reduce((total, product) => total + product.price * product.quantity, 0)
    );

  function handleProductRemove(product: ProductCartProps){
    Alert.alert("Remover produto", `Deseja remover o produto ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ]);
  };

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe o endereço de entrega para continuar.");
    };

    const order = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("");

    const message = `🍔 NOVO PEDIDO
    \n Entregar em: ${address}

    \n Produtos:
    ${order}

    \n Valor total: ${total}
    `;

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    setAddress("");
    navigation.goBack();
    Alert.alert("Pedido", "Seu pedido foi enviado com sucesso!");
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
                  <View className="border-b border-slate-700">
                    {cartStore.products.map((product) => (
                      <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>
                    ))}
                  </View>
              ) : (
                <Text className="font-body text-slate-400 text-center my-8">
                  Seu carrinho está vazio
                </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">
                Total:
              </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento..."
              onChangeText={(text) => setAddress(text)}
              value={address}
              blurOnSubmit
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button>
          <Button onPress={handleOrder}>
            <Button.Text>Enviar Pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>
    </View>
  );
};