import { StyleSheet, Text, View, FlatList, Image,Pressable,useWindowDimensions, ActivityIndicator } from 'react-native'
//import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'
import { colors } from '../global/colors'

const CategoriesScreen = ({navigation}) => {
    //console.log("Categories: ", categories)
    const {width,height} = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    // const categories = useSelector(state=>state.shopSlice.value.categories)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(width>height){
            setIsPortrait(false)
        }else{
            setIsPortrait(true)
        }
    },
    [width,height])

    console.log(isPortrait)

    const renderCategoryItem = ({ item, index }) => {
        //console.log(item)
        return (
            <Pressable onPress={()=> {
                dispatch(setCategory(item.title))
                navigation.navigate('Productos')
                }}>
                <FlatCard style={
                    //Uso de operador ternario condicion?si verdadero:si falso
                    index % 2 == 0
                        ?
                        { ...styles.categoryItemContainer, ...styles.row }
                        :
                        { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width>400?styles.categoryTitle:stylesSmall.categoryTitle}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }


    return (
      <>
       {
        isLoading ? <ActivityIndicator size="large" color={colors.verdeNeon} /> : error ? <Text>Error: {error.message}</Text> :  <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={renderCategoryItem}
        />
       }
         
      </>
      
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    categoryTitleSmall:{
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 80
    },
    row: {
        flexDirection: 'row'
    },
    rowReverse: {
        flexDirection: 'row-reverse'
    }
})

