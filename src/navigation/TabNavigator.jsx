import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native' 
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ShopNavigator from './ShopNavigator'
import CartNavigator from './CartNavigator'
import ReceiptsNavigator from './ReceiptsNavigator'
import { colors } from '../global/colors'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Shop"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen 
                name="Shop" 
                component={ShopNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon name="storefront" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />
                    )
                }}
                />
            <Tab.Screen 
                name="Cart" 
                component={CartNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon name="shopping-cart" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />
                    )
                }}
            />
            <Tab.Screen 
                name="Receipts" 
                component={ReceiptsNavigator} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon name="receipt-long" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />
                    )
                }} 
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 64,
        backgroundColor: colors.grisClaro,
    }
})