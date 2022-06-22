import React from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Types } from "../constants/Types";
import { Formik, Field } from 'formik';
// import { TextInput } from 'react-native-paper';
// import { green300 } from "react-native-paper/lib/typescript/styles/colors";
import * as Yup from 'yup';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { TextField } from "native-base";
import {Picker} from '@react-native-picker/picker';

const SignupSchema = Yup.object().shape({
    itemName: Yup.string().required('Required'),
       category: Yup.string().required('please select category'),
    //    email: Yup.string().email('Invalid email').required('Required'),
});

function AddForm(props) {
    let dispatch = useDispatch()
    const [formValues, setformValues] = React.useState(null);
    const { testVar, homePage,items } = useSelector(state => state.test)
    // const [selectedValue, setSelectedValue] = React.useState("java");

    console.log('reducer in add form.....', items)
    const onBackToHome = () => {
        dispatch({ type: Types.HOME_PAGE, payload: true })
    }
    const submitFormHandler =(val)=>{
        console.log('values on submit....',val)
        setformValues(val)
        let _items = [...[], ...items]
        _items.push(val)
        dispatch({ type: Types.ITEMS_LIST, payload: _items })
        dispatch({ type: Types.HOME_PAGE, payload: true })
    }
    return (
        <React.Fragment>
            <Button title="Back to Home" onPress={onBackToHome}></Button>
           
            <View style={styles.formikContainer}>

                <Formik
                    initialValues={{ itemName: '', category: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values => submitFormHandler(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text>Item Name :</Text>
                            <TextInput
                                style={styles.formikLabel}
                                label='enter Item Name'
                                placeholder="Enter item Name"
                                onChangeText={handleChange('itemName')}
                                onBlur={handleBlur('itemName')}
                                value={values.itemName}
                            />
                            {errors.itemName && touched.itemName ? (
                                <Text style={{ color: 'red' }}>{errors.itemName}</Text>
                            ) : null}

                            <View style={styles.container}>
                                <Picker
                                    selectedValue={values.category}
                                    style={{ height: 50, width: '100%' , borderWidth: 1}}
                                    // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    onValueChange={handleChange('category')}
                                    onBlur={handleBlur('category')}
                                >
                                    <Picker.Item label="select category" value="" />
                                    <Picker.Item label="Mobile Accessories" value="mobile" />
                                    <Picker.Item label="Laptop Accessories" value="laptop" />
                                </Picker>
                            </View>
                            {errors.category && touched.category ? (
                                <Text style={{ color: 'red' }}>{errors.category}</Text>
                            ) : null}

                            <View style={styles.submitContainer}>
                                <Button color='green' onPress={handleSubmit} title="Submit" />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>

            <View>
                {formValues &&
                <View>
                    <Text>item :  {formValues.itemName}</Text>
                    <Text>category :  {formValues.category}</Text>
                </View>
                }
            </View>
        </React.Fragment>
    )
}
export default AddForm
const styles = StyleSheet.create({
    submitContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: "flex-end",
        // justifyContent : "flex-start"
    },
    submitButton: {
        backgroundColor: "green",
        color: 'red'
    },
    formikContainer: {
        // backgroundColor: "#eaeaea",
        paddingTop: 30,
        margin: 10,
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'red'
    },
    formikLabel: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        padding : 8
    },
    container: {
        // flex: 1,
        // paddingTop: 40,
        
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        borderWidth: 1,
        // flexWrap:'wrap'
      
      }

})