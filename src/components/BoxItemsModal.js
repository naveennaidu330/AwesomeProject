import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Types } from "../constants/Types";


function BoxItemsModal(params) {
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const { testVar, homePage, items, boxItems } = useSelector(state => state.test)
    console.log('box items....', boxItems)
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            boxItems ?
                                <Text style={styles.modalText}>{boxItems.boxName}</Text> : null
                        }
                        {
                            boxItems ? boxItems.items.map((item, index) => {
                                return <View key={`${index}`} style={{paddingLeft:20}}>
                                    <Text>{item}</Text>
                                </View>
                            }) : null
                        }
                        <View style={{alignItems: 'flex-end', marginTop: 40}}>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    dispatch({ type: Types.BOX_ITEMS, payload: null })

                                }}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        //   backgroundColor: 'blue'
    },
    modalView: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80,
        // justifyContent:'flex-end'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        // flexDirection: 'row-reverse'
        // justifyContent: 'flex-end'
        // alignItems: 'flex-end'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: '600',
        color: 'skyblue'
    }
});
export default BoxItemsModal