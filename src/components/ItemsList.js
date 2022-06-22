import React from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector,useDispatch } from "react-redux";
import { Types } from "../constants/Types";

function ItemsList(props) {
    let dispatch = useDispatch()
    const [text, setText] = React.useState('')
    const {testVar , homePage, items} = useSelector(state => state.test)

    const onAddHandler = () => {
        // setText('add clicked')
        dispatch({type: Types.HOME_PAGE, payload : false})
    }
    console.log('test',testVar,homePage)

    return(
        <React.Fragment>

            <Text style={styles.titleHeader} >{testVar}</Text>
            <React.Fragment>
                <View style={styles.searchField}>

                    <TextInput
                        label="search item"
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
            </React.Fragment>
            <View style={styles.addButton} >
                <Button title="Add Item" onPress={() => onAddHandler()}></Button>
            </View>

            <View  >
                {
                    items && items.length > 0 ?
                    items.map((item, index) => {
                        return <View style={styles.itemsContainer} > 
                            <Text style={{padding: 5}}>Name :   <Text style={{fontSize: 18, color: 'blue'}}>{item.itemName}</Text></Text>
                            <Text style={{padding: 5}}>category : <Text style={{fontSize: 16, color: 'skyblue'}}> {item.category} </Text></Text>
                        </View> 
                    }) 
                    : <Text>no Data yet , please try to add</Text>
                }
            </View>
        </React.Fragment>
    )
}
export default ItemsList

const styles = StyleSheet.create({
    searchField: {
        // margin: 10,
        // display:'flex',
        // padding: 10,
        // width:20,
        marginHorizontal: 10
    },
    titleHeader: {
        minHeight: 30,
        padding: 10,
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: 'skyblue',
        // marginVertical: 10,
        paddingLeft: 90
    },
    addButton: {
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: "flex-end",
        // justifyContent : "flex-start"
    },
    itemsContainer: {
        borderWidth : 1,
        padding: 5,
        margin: 10,display:'flex',  justifyContent : 'space-around'
    }

})