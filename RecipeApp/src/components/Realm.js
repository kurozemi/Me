import React, {useState} from 'react'
import {View, Text} from 'react-native'
const FoodSchema = {
    name: 'Food',
    properties: {
        name: 'string',
        type: 'string',
        ingredients: 'string[]',
        steps: 'string[]',
        timers: 'int',
        imageURL: 'string'
    }
}
const Realm = () => {
    const Realm = require('realm');

    var data = [];
    Realm.open({ 
        schema: [FoodSchema] })
        .then(realm => {
            // realm.write(() => {
            //     const myRepice = realm.create('Food', {
            //         name: 'Cinnamon Baked Doughnuts',
            //         type: 'Breakfast',
            //         ingredients: [
            //             'abc',
            //             'def',
            //             'kcd',
            //         ],
            //         steps: [
            //             'step1',
            //             'step2',
            //             'step3'
            //         ],
            //         timers: 10,
            //         imageURL: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/29/0/BX0903H_cinnamon-baked-doughnuts-recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1449692373072.jpeg'
                
            //     });
            // });
        
        setstate(realm.objects('Food'))
        console.log("Realm",realm.objects('Food'));  
        })
    return (
        <View>
            {/* <Text>{state[0].name}</Text> */}
        </View>
    )
        
}

export default Realm