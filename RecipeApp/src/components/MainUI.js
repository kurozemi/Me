import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'


const MainUI = ({ navigation }) => {

  const recipes = require('../assests/recipetypes.json');
  const findRecipeByName = (name) => {
    for (var i = 0; i < recipes.length; i++){
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
      flex: 1,

      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    recipeName: {
      color: 'black',
      alignSelf: 'center',
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 20,
      fontWeight: 'bold',

    },

    picContainer: {
      marginLeft: 10,
      marginRight: 20,
    },

    recipePic: {
      height: 100,
      width: 100,
      resizeMode: 'center',
    },

    recipeContainer: {
      flexDirection: 'row',
      backgroundColor: 'pink',

      padding: 20,
      marginBottom: 2,
      paddingRight: 30,

      height: 150,
    }
  }
)
export default MainUI;