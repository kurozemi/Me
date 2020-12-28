import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Ingredients = ({ navigation, route }) => {
    const { curRecipe } = route.params;

    return (
        <View style={style.main}>

            <ScrollView>

                <Text
                    style={style.heading}
                >{curRecipe.name}</Text>

                <Image
                    style={style.foodPic}
                    source={{ uri: curRecipe.imageURL }} />

                <Text
                    style={style.heading}
                >Ingredients</Text>

                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.name}
                    data={curRecipe.ingredients}
                    renderItem={({ item }) => (
                        <View style={style.itemContainer}>
                            <Text style={style.item1}>{item.quantity}</Text>
                            <Text style={style.item2}>{item.name}</Text>
                        </View>
                    )}
                />

                <Text style = {style.heading}>Preparation</Text>

                <FlatList
                    scrollEnabled = {false}
                    data = {curRecipe.steps}
                    renderItem = { ({item}) => (
                        <View style = {style.steps}>
                            <Text style = {style.stepOrder}>
                                Step {curRecipe.steps.indexOf(item) + 1}: </Text>
                            <Text style = {style.stepDetail}>{item}</Text>
                        </View>
                    )}
                />
            
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create(
    {
        main: {
            marginBottom: 30,
            flex: 1,
        },

        foodPic: {
            alignSelf: 'stretch',
            height: 250,
            resizeMode: 'cover',
            marginTop: 10,
            borderWidth: 10,
        },

        heading: {

            marginTop: 15,
            marginLeft: 10,
            fontSize: 30,
            fontWeight: 'bold',
        },

        itemContainer: {
            flexDirection: 'row',

            borderBottomWidth: 2,
            borderColor: 'black',
            borderColor: 'rgba(0,0,0,0.2)',

            marginLeft: 10,
            marginRight: 15,
            paddingTop: 15,
            paddingBottom: 15,
        },
        item1: {
            alignSelf: 'center',
            paddingLeft: 15,
            fontSize: 20,
            flex: 0.4,
            fontWeight: 'bold'
        },

        item2: {
            fontSize: 20,
            flex: 0.6,
            flexWrap: 'wrap',
        },

        steps: {
            marginLeft: 20,
            marginTop: 10,
            marginRight: 30,
        },
        
        stepOrder: {
            paddingRight: 15,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
        },

        stepDetail: {
            fontSize: 18,
            textAlign: 'justify'
        }
    }
)
export default Ingredients;