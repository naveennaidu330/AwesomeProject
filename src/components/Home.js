import React from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import ItemsList from "./ItemsList";
import { useSelector,useDispatch } from "react-redux";
import { Types } from "../constants/Types";
import AddForm from "./AddForm";

function Home(params) {
    let dispatch = useDispatch()
    const {testVar , homePage} = useSelector(state => state.test)
    console.log('test',testVar,homePage)

    return (
        <View style={styles.homeContainer}>
            {
               homePage ?<ItemsList /> : <AddForm />
            }
            
        </View>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        marginTop: 40
    }

})
export default Home