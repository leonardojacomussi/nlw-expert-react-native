import { useState, useRef } from "react";
import { Link } from "expo-router";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { View, FlatList, SectionList, Text } from "react-native";
import { CategoryButton } from "@/components/category-button";
import { useCartStore } from "@/stores/cart-store";

import { CATEGORIES, MENU } from "@/utils/data/products";

export default function Home() {
  const cartStore = useCartStore();
  const [categorySelected, setCategorySelected] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);
  const cartQuantityItems = cartStore.products.reduce((total, item) => total + item.quantity, 0);

  function handleCategorySelection(category: string) {
    setCategorySelected(category);

    const sectionIndex = CATEGORIES.findIndex((item) => item === category);

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  return (
    <View>
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems}/>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton title={item} isSelected={item === categorySelected} onPress={() => handleCategorySelection(item)}/>
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 230 }}
      />
    </View>
  );
}