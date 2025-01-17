import { View, Text, FlatList, Image, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import cart from '../data/cart.json'
import { colors } from '../global/colors'
import FlatCard from '../components/FlatCard'

const CartScreen = () => {

    // const [total, setTotal] = useState(0)

    // useEffect(()=>{
    //     setTotal(cart.reduce((acumulador, item)=>(acumulador+=item.price*item.quantity),0))
    // },[cart])

    const cart = useSelector(state => state.cartSlice.value.cartItems)
    const total = useSelector(state => state.cartSlice.value.total)

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: $ {total} </Text>
            <Pressable style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
        </View>
    )

    const renderCartItem = ({item}) =>{
        return (
            <FlatCard style={styles.cartContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.cartImage}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.cartDescription}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.shortDescription}</Text>
                    <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.total}>Total: ${item.quantity * item.price} </Text>
                    <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
                </View>
            </FlatCard>
        )
    }


  return (
    <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
  )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    description: {
        marginBottom: 16,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700'
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    }, cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8
    }

})