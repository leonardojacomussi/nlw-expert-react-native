import { useState } from "react";
import { Header } from "@/components/header";
import { View, Text, FlatList } from "react-native";
import { CategoryButton } from "@/components/category-button";

import { CATEGORIES } from "@/utils/data/products";

export default function Home() {
  const [categorySelected, setCategorySelected] = useState(CATEGORIES[0]);

  function handleCategorySelection(category: string) {
    setCategorySelected(category);
  };

  return (
    <View>
      <Header title="Faça seu pedido" cartQuantityItems={5}/>

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
    </View>
  );
}