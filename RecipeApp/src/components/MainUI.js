import React, { useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler';
import realm from './Realm'



const MainUI = ({ navigation }) => {

  var data;
  const recipesTest = require('../assests/test.json');
  const recipeBreakfast = require('../assests/breakfast.json');

  const [recipe, setRecipe] = useState(recipesTest);
  const [picker, setPicker] = useState('test');

  const findRecipeByName = (name) => {
    for (var i = 0; i < recipe.length; i++) {
      if (recipe[i].name == name)
        return recipe[i];
    }
  }

  return (
    <View style={style.container}>

      <ScrollView>
        <View style={style.picker}>
          <Picker
            selectedValue={picker}
            onValueChange={(itemValue, itemIndex) => {
              setPicker(itemValue);
              switch (itemValue) {
                case ('test'): setRecipe(recipesTest); break;
                case ('breakfast'): setRecipe(realm.object('Food')[0].name); break;
              }
              }
            }
          >
            <Picker.Item label="Test" value="test" />
            <Picker.Item label="Breakfast" value="breakfast" />

          </Picker>
        </View>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item) => item.name}
          data={recipe}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={style.recipeContainer}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Ingredients', {
                    curRecipe: findRecipeByName(item.name)
                  });
                }}
              >
                <View style={style.picContainer}>
                  <Image
                    style={style.recipePic}
                    source={{ uri: item.imageURL }} />
                </View>
                <Text

                  style={style.recipeName}>{item.name}</Text>
                <View style={style.timer}>
                  <Icon name='clockcircle' size={20} />
                  <Text> Cooking time: {item.timers} minutes</Text>
                </View>

              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  )


}

const style = StyleSheet.create(
  {
    container: {
      marginTop: 15,
      flex: 1,
    },

    picker: {
      marginRight: 10,
      marginBottom: 15,

      alignSelf: 'flex-end',

      height: 50,
      width: 140,


      borderWidth: 2,
      borderRadius: 10,
    },
    recipeName: {
      color: 'black',
      textAlign: 'center',
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 25,
      fontWeight: 'bold',

    },

    timer: {
      flexDirection: 'row',
    },
    picContainer: {
      paddingRight: 15,
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },

    recipePic: {
      height: 200,
      width: 330,
      resizeMode: 'cover',
      borderRadius: 25,
    },

    recipeContainer: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderWidth: 3,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,

      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,

    }
  }
)
export default MainUI;