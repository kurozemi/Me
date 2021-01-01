import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage, ImageBackground } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import { HeaderBackButton } from '@react-navigation/stack'
const Ingredients = ({ navigation, route }) => {

    const { curRecipe, recipeType } = route.params;
    const [isEditable, setIsEditable] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                    onPress={() => {
                        console.log("edit", isEditable);
                        if (isEditable) {
                            alert('Do you want to save ?');
                        }
                        navigation.goBack();
                    }}
                >

                </HeaderBackButton>
            )
        });
    }, [navigation]);

    const findRecipeByName = (recipe, name) => {
        for (var i = 0; i < recipe.length; i++) {
            if (recipe[i].name == name) {
                return i;
            }
        }

    }

    const onSaveChange = async () => {
        let fullRecipe = JSON.parse(await AsyncStorage.getItem(recipeType));
        let index = findRecipeByName(fullRecipe, curRecipe.name);

        fullRecipe[index] = curRecipe;

        await AsyncStorage.setItem(recipeType,
            JSON.stringify(fullRecipe));
    }
    return (
        <View style={style.main}>

            <ScrollView>

                <View style={style.headingContainer}>
                    <Text
                        style={style.heading}
                    >{curRecipe.name}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (isEditable)
                                onSaveChange();
                            setIsEditable(!isEditable);
                        }}
                        style={style.headerButton}
                    >
                        <Text style={style.headerButtonText}>{isEditable ? 'Save' : 'Edit'}</Text>
                        <Icon name={isEditable ? 'save' : 'edit'} size={20} color='#2a58db'></Icon>
                    </TouchableOpacity>
                </View>

                <Image
                    style={style.foodPic}
                    source={{ uri: curRecipe.imageURL }} />

                <View style={style.headingContainer}>
                    <Text
                        style={style.heading}
                    >Ingredients</Text>

                    <TouchableOpacity
                        style={style.headerButton}
                    >
                        <Text style={style.headerButtonText}>+ Add ingredient</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.name}
                    data={curRecipe.ingredients}
                    renderItem={({ item }) => (
                        <View style={style.itemContainer}>

                            <TextInput
                                multiline={true}
                                editable={isEditable}
                                style={[{
                                    backgroundColor: isEditable ? 'white' :
                                        'rgba(0,0,0,0)'
                                }, style.item1]}
                                onChangeText={(text) => {
                                    item.quantity = text;
                                }}
                            >{item.quantity}</TextInput>
                            <TextInput
                                onChangeText={text => item.name = text}
                                multiline={true}
                                editable={isEditable}
                                style={[{
                                    backgroundColor: isEditable ? 'white' :
                                        'rgba(0,0,0,0)'
                                }, style.item2]} >{item.name}</TextInput>
                        </View>
                    )}
                />

                <View style={style.headingContainer}>
                    <Text
                        style={style.heading}
                    >Preparation</Text>

                    <TouchableOpacity
                        style={style.headerButton}
                    >
                        <Text style={style.headerButtonText}>+ Add step</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    scrollEnabled={false}
                    data={curRecipe.steps}
                    renderItem={({ item }) => (
                        <View style={style.steps}>
                            <Text style={style.stepOrder}>
                                Step {curRecipe.steps.indexOf(item) + 1}: </Text>
                            <TextInput
                                onChangeText={text => item = text}
                                multiline={true}
                                editable={isEditable}
                                style={[{
                                    backgroundColor: isEditable ? 'white' :
                                        'rgba(0,0,0,0)'
                                }, style.stepDetail]}>{item}
                            </TextInput>
                        </View>
                    )}
                />

            </ScrollView>
        </View >
    )
}

const style = StyleSheet.create(
    {
        main: {
            marginBottom: 30,
            flex: 1,
        },

        foodPic: {
            marginTop: 15,
            alignSelf: 'stretch',
            height: 250,
            resizeMode: 'cover',
            borderWidth: 10,
        },

        headingContainer: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        heading: {
            marginTop: 10,
            flex: 0.8,
            marginRight: 20,
            marginLeft: 10,
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black'
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
            textAlign: 'center',
            color: 'black',
            marginRight: 30,
            fontSize: 20,
            flex: 0.4,
            fontWeight: 'bold',
            borderRadius: 10,
        },

        item2: {
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            flex: 0.6,
            flexWrap: 'wrap',
            borderRadius: 10,
            paddingLeft: 10,
        },

        steps: {
            color: 'black',
            marginTop: 10,
            marginRight: 30,
            marginLeft: 10,
        },

        stepOrder: {
            color: 'black',
            marginLeft: 10,
            paddingRight: 15,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
        },

        stepDetail: {
            color: 'black',
            fontSize: 18,
            borderRadius: 10,
            paddingLeft: 10,
        },
        checkbox: {
            alignSelf: 'center'
        },

        headerButton: {
            flex: 0.2,
            paddingRight: 20,
        },

        headerButtonText: {
            fontSize: 18,
            color: '#2a58db',
            fontStyle: 'italic'
        },

    }
)
export default Ingredients;