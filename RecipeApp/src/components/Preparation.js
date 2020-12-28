import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const Preparation = ({ navigation, route }) => {
    const { curRecipe } = route.params;
    const [stepIndex, setStepIndex] = useState(0)

    const steps = curRecipe.steps;
    const timers = curRecipe.timers;

    return (
        <View style={style.main}>

            <View
                style={style.container}
            >
                <TouchableOpacity
                    style={style.button}
                    onPress={() => {
                        if (stepIndex > 0)
                            setStepIndex(stepIndex - 1)
                    }}
                    disabled={stepIndex == 0 ? true : false}
                >

                    <Text>Prev</Text>
                </TouchableOpacity>

                <Text style = {style.step}>{steps[stepIndex]}</Text>

                <TouchableOpacity
                    style={style.button}
                    onPress={() => {
                        if (stepIndex < (steps.length - 1))
                            setStepIndex(stepIndex + 1)
                    }}
                    disabled={stepIndex == (steps.length - 1)
                        ? true : false}
                >

                    <Text>Cont</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const style = StyleSheet.create(
    {
        main: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        step: {
            flex: 1,
            flexWrap: 'wrap',
            paddingLeft: 10,
            fontSize: 25,
        },
        button: {
            marginLeft: 10,
            marginRight: 10,
        }

    }
)
export default Preparation;