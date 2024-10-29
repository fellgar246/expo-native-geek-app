import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
// import products from "../data/products.json";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useGetProductQuery } from "../services/shopService";
import { useSelector } from "react-redux";


const ProductScreen = ({ route, navigation }) => {
 // const [productFound, setProductFound] = useState({});

//   const productId = route.params;
    const productId = useSelector((state) => state.shopSlice.value.productId);

  const { width, height } = useWindowDimensions();

  const { data: productFound, error, isLoading } = useGetProductQuery(productId);

//   useEffect(() => {
//     setProductFound(products.find((product) => product.id === productId));
//   }, [productId]);

  const dispatch = useDispatch();

  return (
    <>
    {
        isLoading 
        ? 
        <ActivityIndicator size="large" color={colors.morado} />
        :
        error
        ?
        <Text>Error: {error.message}</Text>
        :
        <ScrollView style={styles.productContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
      </Pressable>
      <Text style={styles.textBrand}>{productFound.brand}</Text>
      <Text style={styles.textTitle}>{productFound.title}</Text>
      <Image
        source={{ uri: productFound.mainImage }}
        alt={productFound.title}
        width="100%"
        height={width * 0.7}
        resizeMode="contain"
      />
      <Text style={styles.longDescription}>{productFound.longDescription}</Text>
      <View style={styles.tagsContainer}>
        <View style={styles.tags}>
            <Text style={styles.tagText}>Tags : </Text>
            {
            /* <FlatList
                style={styles.tags}
                data={productFound.tags}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => (
                <Text style={styles.tagText}>{item}</Text>
                )}
            /> */
            productFound.tags?.map((tag) => (
                <Text key={tag} style={styles.tagText}>
                {tag}
                </Text>
            ))
            }
        </View>
        {productFound.discount > 0 && (
          <View style={styles.discount}>
            <Text style={styles.discountText}>
              Descuento {productFound.discount} %
            </Text>
          </View>
        )}
      </View>
      {productFound.stock <= 0 && (
        <Text style={styles.noStockText}>Sin Stock</Text>
      )}
      <Text style={styles.price}>Precio: $ {productFound.price}</Text>
      <Pressable 
        style={({pressed})=> [{opacity: pressed ? 0.95 : 1},styles.addToCartButton]}
        onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}
        // style={styles.addToCartButton} 
        >
        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
    }
    </>

  
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.grisMedio,
  },
  productContainer: {
    paddingHorizontal: 16,
  },
  textBrand: {
    color: colors.grisOscuro,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  longDescription: {
    fontSize: 16,
    textAlign: "justify",
    paddingVertical: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tags: {
    flexDirection: "row",
    gap: 5,
  },
  tagText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.morado,
  },
  price: {
    fontWeight: "700",
    fontSize: 32,
    alignSelf: "center",
    paddingVertical: 8,
  },
  discount: {
    backgroundColor: colors.naranjaBrillante,
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 64,
    alignSelf: "flex-start",
  },
  discountText: {
    color: colors.blanco,
  },
  noStockText: {
    color: "red",
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal:16,
    backgroundColor: colors.morado,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddToCart: {
    color: colors.blanco,
    fontSize: 24,
    textAlign: "center",
  },
});
