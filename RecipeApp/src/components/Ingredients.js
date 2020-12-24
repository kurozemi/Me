import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

const Ingredients = ({ navigation, route }) => {
    const { curRecipe } = route.params;
    const ingredients = curRecipe.ingredients;

    return (
        <View style={style.main}>
            <Text
                style={style.recipeName}
            >{curRecipe.name}</Text>

            <Text style={style.ingredientsText}>
                Ingredients
            </Text>
            <View
            >
                <FlatList
                    keyExtractor={(item) => item.name}
                    data={ingredients}
                    renderItem={({ item }) => (
                        <View style={style.itemContainer}>
                            <Text style={style.item1}>{item.quantity}</Text>
                            <Text style={style.item2}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create(
    {
        main: {
            paddingTop: 30,
            alignItems: 'center',
            flex: 1,
        },

        ingredientsText: {
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 20,
        },

        recipeName: {
            padding: 20,
            borderWidth: 2,
            borderColor: 'black',
            fontSize: 20,
            backgroundColor: 'rgba(0,0,0,0.2)',
            textAlign: 'center',
            textAlignVertical: 'center',
            margin: 35,
        },

        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: 'black',
        },
        item1: {
            fontSize: 17,
            padding: 10,
        },

        item2: {
            fontSize: 17,
            padding: 10,

        },

        box: {
            borderWidth: 1,
            borderColor: 'black',
        },
    }
)
export default Ingredients;