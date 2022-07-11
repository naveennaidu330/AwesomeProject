import React from "react";
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import ItemsList from "./ItemsList";
import { useSelector, useDispatch } from "react-redux";
import { Types } from "../constants/Types";
import AddForm from "./AddForm";
import CustomizeBox from "./CustomizeBox";

function Home(params) {
    let dispatch = useDispatch()
    const { testVar, homePage, initialFormValues } = useSelector(state => state.test)
    console.log('test', testVar, homePage)
    const onAddHandler = () => {
        dispatch({ type: Types.HOME_PAGE, payload: 'addbox' })
        dispatch({ type: Types.FORM_ACTION_TYPE, payload: 'add' })
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: {boxName:'', items: [''] } })

    }
    const onCustomAddHandler = () => {
        dispatch({ type: Types.HOME_PAGE, payload: 'custombox' })
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: {boxName:'', items: [''] } })

    }
    const onBackToHome = () => {
        dispatch({ type: Types.HOME_PAGE, payload: 'home' })
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: {boxName:'', items: [''] } })

    }

    return (
        <View style={styles.homeContainer}>
            <View style={{ backgroundColor: 'skyblue' }}>

                {
                    <View style={styles.ImagesContainer}>
                        <View style={{ width: "33%", alignItems: 'center' }}>
                            <TouchableOpacity onPress={onBackToHome}>
                                <Image style={styles.addBoxHome} source={require('../images/home.png')} />
                            </TouchableOpacity>
                            <Text>Home</Text>
                        </View>
                        <View style={{ width: "33%", alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => onAddHandler()}>
                                <Image style={styles.addBoxImage}
                                    source={require('../images/box.png')} />
                            </TouchableOpacity>
                            <Text>Add Box</Text>
                        </View>
                        <View style={{ width: "33%", alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => onCustomAddHandler()}>
                                <Image style={styles.customBox}
                                    source={require('../images/gear.png')} />
                            </TouchableOpacity>
                            <Text>customize</Text>
                        </View>
                    </View>
                }
            </View>
            {
                homePage == 'home' ? <ItemsList /> : homePage == 'addbox' ? <AddForm /> : <CustomizeBox />
            }

        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        marginTop: 40
    }, addBoxImage: {
        width: 45,
        height: 45
    }, addBoxHome: {
        width: 45,
        height: 45,
    }, ImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10
    }, customBox: {
        width: 35,
        height: 35,
        // paddingTop: 30
        marginTop: 10
    }

})
export default Home