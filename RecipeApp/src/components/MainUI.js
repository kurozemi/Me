import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';



const MainUI = ({ navigation }) => {

  const recipes = require('../assests/recipetypes.json');
  const findRecipeByName = (name) => {
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].name == name)
        return recipes[i];
    }
  }

  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={recipes}
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
    </View>
  )
}

const style = StyleSheet.create(
  {
    container: {
      marginTop: 20,
      flex: 1,
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