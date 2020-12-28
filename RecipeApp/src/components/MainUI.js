import React, { useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';



const MainUI = ({ navigation }) => {

  var recipeTest;
  var recipeBreakfast;
  const loadData = async () => {
    // bug
    // var temp = JSON.parse(await AsyncStorage.getItem(recipeName));
    // console.log(recipeName, temp)
    // return temp;

    recipeBreakfast = JSON.parse(await AsyncStorage.getItem('breakfast'));
    recipeTest = JSON.parse(await AsyncStorage.getItem('test'));

  }
  loadData();

  console.log('test', recipeTest);
  const [recipe, setRecipe] = useState(recipeTest);
  const [picker, setPicker] = useState('test');


  // const checkFirstRun = async () => {
  //   if (await AsyncStorage.getItem('firstRun') === false) {
  //     await AsyncStorage.setItem('test', require('../assests/t'))
  //   }
  // }

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
                case ('breakfast'): setRecipe(recipeBreakfast); break;
                case ('test'): setRecipe(recipeTest);
              }

              //setRecipe(loadData(itemValue)); bug
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