import React, { useState } from "react";
import { View, Alert, Button, Modal, StyleSheet, Text, Pressable, ScrollView, TouchableHighlight, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Types } from "../constants/Types";
// import { Button } from "native-base";



const SignupSchema = Yup.object().shape({
    // boxName: Yup.string().required('Required'),
    // items: Yup.string().required('please select items'),
    items: Yup.array().of(Yup.string().required("required please fill last item"))
});
function AddItems(props) {
    const { testVar, homePage, items, formValues, initialFormValues, formActionType, itemIndex } = useSelector(state => state.test)
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [valiadteForm, setvaliadteForm] = React.useState({
        boxName: true, items: true
    })
    const validateItems = () => {
        let _array = []
        formValues.items.map((item, index) => {
            if (item == '') {
                _array.push(index)
            }
        })
        console.log('length', _array.length)
        return _array
    }

    const onAddItems = (values) => {
        // console.log('values..', values, val)
        // dispatch({ type: Types.EDIT_BOX_DETAILS, payload: values.items })
        let Valiadted = validateItems()
        if (Valiadted.length > 0) {
            setvaliadteForm({ ...valiadteForm, items: false })
        } else {
            setModalVisible(!modalVisible);
        }
    }
    const onInputitemHandler = (e, indexx) => {
        console.log('...............index', e, indexx.index)
        let data = { ...{}, ...formValues }
        data.items[indexx.index] = e
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: data })
        setvaliadteForm({ ...valiadteForm, items: e == '' ? false : true })
    }
    const onDeleteHandler = (data) => {
        // console.log('data....', data)
        // let data = {...formValues,  }
        let _data = [...[], ...formValues.items]
        _data.splice(data.index, 1)
        console.log('_data...', _data)
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: { ...formValues, items: _data } })


    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

                            {/* <Text style={{}}>Add Items</Text> */}
                            {/* <Button onPress={() => { setModalVisible(!modalVisible) }} title='close'></Button> */}
                            <Pressable onPress={() => {
                                setModalVisible(!modalVisible)
                                // dispatch({ type: Types.EDIT_BOX_DETAILS, payload: setModalVisible(!modalVisible) })
                            }}
                                style={{ paddingBottom: 10 }}
                                >
                                {/* <Text style={{ color: 'white' }}>X</Text> */}
                                <Image style={{width: 30,height: 30}} source={require('../images/close.png')} />
                                
                            </Pressable>

                        </View>
                        {!valiadteForm.items &&
                            <Text style={{ color: 'red' }}>please check all items must be filled</Text>
                        }
                        <SwipeListView
                            data={formValues.items}
                            renderItem={(data, rowMap) => (
                                <View key={`mainView${data.index}`} style={{ flexDirection: 'row', marginVertical: 4 }}>
                                    <TextInput
                                        key={`input${data.index}`}
                                        style={{
                                            width: '100%', borderWidth: 1, backgroundColor: '#e8f0fe', borderRadius: 8,
                                            paddingHorizontal: 10, paddingVertical: 5, fontSize: 16
                                        }}
                                        label='enter Item Name'
                                        onChangeText={(event) => onInputitemHandler(event, data)}
                                        // onBlur={handleBlur(`items[${data.index}]`)}
                                        value={formValues.items[data.index]}
                                    />
                                </View>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row-reverse', alignItems: 'center', flex: 1 }}>
                                    <TouchableHighlight onPress={() => onDeleteHandler(data)}>
                                        <Image style={{ width: 25, height: 25, marginTop: 5 }} source={require('../images/remove.png')} ></Image>
                                    </TouchableHighlight>
                                </View>
                            )}
                            // leftOpenValue={40}
                            rightOpenValue={-40}
                        >
                        </SwipeListView>

                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{}}>

                                <TouchableOpacity style={styles.plusContainer}
                                    onPress={(e, v) => {
                                        let _lastIndex = formValues.items.length - 1
                                        if (formValues.items[_lastIndex] !== '') {
                                            let data = { ...{}, ...formValues }
                                            data.items.push('')
                                            dispatch({ type: Types.EDIT_BOX_DETAILS, payload: data })
                                        } else {
                                            Alert.alert('please enter the item in the last Item input')
                                        }
                                    }}
                                >
                                    <Image style={styles.plusIcon} source={require('../images/plus.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                                <Button color='green' onPress={onAddItems} title="Add" />
                                <Button color='red'
                                    onPress={() => { dispatch({ type: Types.EDIT_BOX_DETAILS, payload: { ...formValues, items: [''] } }) }}
                                    title="clear" type='reset' />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={{}}
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ height: 40, height: 35, borderRadius:25, padding:10, backgroundColor:'#9999ff' }}>Add Items</Text>
            </Pressable>
            {/* <View style={{height: 50}}>
                <Button onPress={() => setModalVisible(true)} title='Add Items' />
            </View> */}
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight:450
        
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    plusIcon: {
        width: 30,
        height: 30,
        // alignItems:'flex-end'

    }, plusContainer: {
        alignItems: "center",
    }
});
export default AddItems