import React from "react";
import {
    StyleSheet, Text, View, Button, Alert, TextInput,
    TouchableOpacity, Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Types } from "../constants/Types";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { TextField } from "native-base";
import { Picker } from '@react-native-picker/picker';
import AddItems from "./AddItems";

const SignupSchema = Yup.object().shape({
    boxName: Yup.string().required('Required'),
    // items: Yup.string().required('please select items'),
    items: Yup.array().of(Yup.string().required("reqq"))
});

function AddForm(props) {
    let dispatch = useDispatch()
    const { testVar, homePage, items, formValues, initialFormValues,
        formActionType, itemIndex } = useSelector(state => state.test)

    const [valiadteForm, setvaliadteForm] = React.useState({
        boxName: true, items: true
    })
    console.log('values on submit....', formActionType, formValues)

    const onBackToHome = () => {
        dispatch({ type: Types.HOME_PAGE, payload: true })
    }
    const submitFormHandler = () => {
        // alert()
        if (formActionType == 'add') {
            console.log('values on submit....')

            // setformValues(val)
            // let _items = [...[], ...items]
            let _itemsPayload = [...[], ...items]
            console.log('items....', _itemsPayload)
            _itemsPayload.push(formValues)
            dispatch({ type: Types.ITEMS_LIST, payload: _itemsPayload })
            dispatch({ type: Types.HOME_PAGE, payload: 'home' })
            dispatch({ type: Types.EDIT_BOX_DETAILS, payload: { boxName: '', items: [''] } })

        } else {
            let _items = [...[], ...items]
            _items[itemIndex] = formValues
            dispatch({ type: Types.ITEMS_LIST, payload: _items })
            dispatch({ type: Types.HOME_PAGE, payload: 'home' })
            console.log('values on update....', _items, itemIndex)
            dispatch({ type: Types.EDIT_BOX_DETAILS, payload: { boxName: '', items: [''] } })

        }
    }
    const onClearForm = () => {
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: initialFormValues })
    }
    const onchangeBoxName = (e) => {
        console.log('event......', e)
        let data = { ...formValues, boxName: e }
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: data })
        setvaliadteForm({ ...valiadteForm, boxName: e == '' ? false : true })
    }
    const ValidateFields = () => {
        if (formValues.boxName == '') {
            return false
        } else {
            return true
        }
    }
    const onSubmitFormHandler = () => {
        // let Validate = ValidateFields()
        if (formValues.boxName == '') {
            setvaliadteForm({ ...valiadteForm, boxName: false })
        } else {
            submitFormHandler()
        }
    }
    return (
        <React.Fragment>
            {
                formValues &&
                <KeyboardAvoidingView
                    // style={styles.container}
                    behavior="padding"
                >
                    <Text style={{ padding: 10, color: 'blue', fontSize: 18, fontWeight: "600" }} >ADD BOX</Text>
                    {
                        formValues && <View style={styles.formikContainer}>
                            <View>
                                <Text>Box Name :</Text>
                                <TextInput
                                    style={styles.formikLabel}
                                    label='enter Box Name'
                                    placeholder="Enter Box Name"
                                    onChangeText={onchangeBoxName}
                                    // onBlur={handleBlur('boxName')}
                                    value={formValues.boxName}
                                />
                                {
                                    !valiadteForm.boxName && <Text style={{ color: 'red' }}>please enter box name</Text>
                                }

                                <View style={{paddingTop:10, flexDirection:'row'}}>
                                    <Text>items :</Text>
                                    {
                                        (formValues.items.length > 0 && formValues.items[0] != '') ? <Text style={{fontSize: 18, fontWeight:'600', paddingLeft: 10}}>{formValues.items.length}</Text> : null
                                    }
                                </View>
                                <View style={ styles.submitContainer }>

                                    <AddItems />
                                </View>
                                {(formValues.items && formValues.items[0] != '') && <View style={styles.submitContainer}>
                                    <Button color='red' onPress={() => dispatch({ type: Types.EDIT_BOX_DETAILS, payload: initialFormValues })} title="clear" type='reset' />
                                    <Button color='green' onPress={onSubmitFormHandler} title="Submit" />
                                </View>}
                            </View>
                            {/* )}
                            </Formik> */}
                        </View>
                    }
                </KeyboardAvoidingView>
            }
        </React.Fragment>
    )
}
export default AddForm
const styles = StyleSheet.create({
    submitContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        // alignItems: "flex-end",
        justifyContent: 'flex-end'
    },
    submitButton: {
        backgroundColor: "green",
        color: 'red'
    },
    formikContainer: {
        paddingTop: 30,
        margin: 10,
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#e6f0ff',
        color: 'red',
        borderWidth: 3,
        borderColor: '#b3d1ff'
    },
    formikLabel: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        padding: 8,
        width: '100%',
        backgroundColor: '#f2f2f2'
    },
    container: {
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        borderWidth: 1,
        // height:300,
        maxHeight: 350
    }, plusIcon: {
        width: 30,
        height: 30,
        // alignItems:'flex-end'
    }, plusContainer: {
        alignItems: "center",
    }, itemInputs: {
        // backgroundColor:'#e6f0ff',
        padding: 5,
        backgroundColor: '#d9d9d9',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a6a6a6'
    }

})