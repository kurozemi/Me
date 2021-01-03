import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native'
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

const NewRecipe = ({ navigation, route }) => {

    const [picker, setPicker] = useState('breakfast');
    const [myRecipe, setmyRecipe] = useState({
        "name": "",
        "ingredients": [
            {
                "quantity": "1",
                "name": "item 1",
            },
            {
                "quantity": "1",
                "name": "item 2",
            },
            {
                "quantity": "1",
                "name": "item 3",
            },
        ],
        "steps": [
            "Step 1", "Step 2"
        ],
        "timers": 0,
        "imageURL": 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483097.jpg'
    })

    const saveNewRecipe = async() => {

        if (myRecipe.name == "" || myRecipe.timers == "")
        {
            alert("Please fill in all the information");
            return;
        }

        let recipe = JSON.parse(await AsyncStorage.getItem(picker));
        recipe.push(myRecipe);

        await AsyncStorage.setItem(picker, JSON.stringify(recipe));
        console.log("push completed", recipe);
        navigation.navigate('MainUI');
        console.log("navigate completed");

    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {saveNewRecipe();}}
                    style={style.saveButton}
                >

                    <Text style={style.saveButtonText}>Save</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={style.main}>

            <ScrollView>

                <View style={style.headingContainer}>
                    <TextInput
                        onChangeText = {(text)=> myRecipe.name = text}
                        autoFocus={true}
                        multiLine={true}
                        style={style.heading}
                        placeholder='Recipe name'
                    ></TextInput>
                </View>

                <Image
                    style={style.foodPic}
                    source={{ uri: myRecipe.imageURL }} />

                <View style={style.otherContainer}>
                    <Text style={style.otherHeading}>Type: </Text>

                    <View style = {style.picker}>
                        <Picker
                            selectedValue={picker}
                            onValueChange={(itemValue, itemIndex) => {
                                setPicker(itemValue);
                            }}
                        >
                            <Picker.Item label="Test" value="test" />
                            <Picker.Item label="Breakfast" value="breakfast" />
                        </Picker>

                        
                    </View>
                </View>

                <View style={style.headingContainer}>
                    <Text
                        style={style.heading}
                    >Ingredients</Text>

                    <TouchableOpacity
                        onPress={() => {
                            let temp = Object.assign({}, myRecipe);

                            temp.ingredients.push({
                                quantity: "1",
                                name: "item" + (temp.ingredients.length + 1)
                            });

                            setmyRecipe(temp);

                            setIsEditable(true);
                        }}
                        style={style.headerButton}
                    >
                        <Text style={style.headerButtonText}>+ Add ingredient</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.name}
                    data={myRecipe.ingredients}
                    renderItem={({ item }) => (
                        <View style={style.itemContainer}>

                            <TextInput
                                multiline={true}
                                style={style.item1}
                                onChangeText={(text) => {
                                    item.quantity = text;
                                }}
                            >{item.quantity}</TextInput>
                            <TextInput
                                onChangeText={text => item.name = text}
                                multiline={true}
                                style={style.item2} >{item.name}</TextInput>
                        </View>
                    )}
                />

                <View style = {style.otherContainer}>
                    <Text style = {style.otherHeading}>Timers: </Text>
                    
                    <TextInput
                        keyboardType = 'number-pad'
                        onChangeText = {text => {
                            myRecipe.timers = text; 
                        }}
                        placeholder = '0'
                        style = {style.timers}
                    ></TextInput>

                    <Text style = {style.minutes}>mins</Text>
                </View>

                <View style={style.headingContainer}>
                    <Text
                        style={style.heading}
                    >Preparation</Text>

                    <TouchableOpacity
                        onPress={() => {
                            let temp = Object.assign({}, myRecipe);

                            temp.steps.push(
                                "Step " + (temp.steps.length + 1)
                            );

                            setmyRecipe(temp);
                        }}
                        style={style.headerButton}
                    >
                        <Text style={style.headerButtonText}>+ Add step</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    scrollEnabled={false}
                    data={myRecipe.steps}
                    renderItem={({ item }) => (
                        <View style={style.steps}>
                            <Text style={style.stepOrder}>
                                Step {myRecipe.steps.indexOf(item) + 1}: </Text>
                            <TextInput
                                onChangeText={text => item = text}
                                multiline={true}
                                style={style.stepDetail}>{item}
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
            resizeMode: 'contain',
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
            color: 'black',
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
            backgroundColor: 'white'
        },

        item2: {
            backgroundColor: 'white',
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
            backgroundColor: 'white',
            color: 'black',
            fontSize: 18,
            borderRadius: 10,
            paddingLeft: 10,
        },

        headerButton: {
            flex: 0.2,
            paddingRight: 20,
        },

        saveButton: {
            marginRight: 10,
            backgroundColor: '#0384fc',
            borderRadius: 10,
        },

        saveButtonText: {
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',

            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 15,
            paddingRight: 15,
        },

        headerButtonText: {
            fontSize: 18,
            color: '#2a58db',
            fontStyle: 'italic'
        },
        otherContainer: {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems:'center',
        },

        otherHeading: {
            marginLeft: 10,
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black'
        },
        picker: {
            height: 50,
            width: 140,
            marginLeft: 10,
            borderRadius: 10,
            borderWidth: 2,
        }, 
        timers: {
            backgroundColor: 'white',
            borderRadius: 7,
            marginLeft: 10,
            padding: 12,
            fontSize: 17,
            width: 50,
            textAlign: 'center'
        },
        minutes: {
            marginLeft: 10,
            fontSize: 18,
            fontStyle: 'italic'
        },
    }
)
export default NewRecipe;