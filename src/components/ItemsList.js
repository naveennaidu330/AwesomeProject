import React from "react";
import { StyleSheet, Text, View, Button, Alert, Image, Separator, TouchableHighlight, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { Types } from "../constants/Types";
import { SwipeListView } from 'react-native-swipe-list-view';
import BoxItemsModal from "./BoxItemsModal";


function ItemsList(props) {
    let dispatch = useDispatch()
    const [text, setText] = React.useState('')
    const { testVar, homePage, items, boxItems, allItems } = useSelector(state => state.test)

    const onAddHandler = () => {
        // setText('add clicked')
        dispatch({ type: Types.HOME_PAGE, payload: false })
    }
    // console.log('test', items)
    const onDeleteHandler = (payload) => {
        console.log("payload", payload.index)
        let _data = [...[], ...items]
        console.log("data before", _data.length)

        _data.splice(payload.index, 1)
        console.log("data after", _data.length)
        Alert.alert(
            "Confirm",
            "Are you sure want to delete ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => dispatch({ type: Types.DELETE_ITEMS, payload: _data }) }
            ]
        );
    }
    const onEditDetails = (data) => {
        console.log('item ....', data.index)
        dispatch({ type: Types.EDIT_BOX_DETAILS, payload: data.item })
        dispatch({ type: Types.HOME_PAGE, payload: 'addbox' })
        dispatch({ type: Types.FORM_ACTION_TYPE, payload: 'edit', itemIndex: data.index })
    }
    const onSearchHandler = (e) => {
        console.log(e)
        setText(e)
        let _data = [...[], ...items]
        // console.log('_data...', _data)
        if (e != '') {
            let _boxes = []
            _data.map((item, index) => {
                item.items.filter(ele => {
                    console.log('if......', ele.toLowerCase().includes(e.toLowerCase()))
                    if (ele.toLowerCase().includes(e.toLowerCase())) {
                        console.log('elememn......', ele)
                        _boxes.push(item)
                    }
                })
            })

            console.log('_booooxes...', _boxes)
            dispatch({ type: Types.SEARCH_ITEMS, payload: _boxes })
        } else {
            dispatch({ type: Types.SEARCH_ITEMS, payload: allItems })

        }

    }
    const onViewItems = (data) => {
        // alert(()=>{
        //     return "hello"
        // })
        console.log('data,.......', data.item)
        dispatch({ type: Types.BOX_ITEMS, payload: data.item })
    }
    return (
        <React.Fragment>
            <Text style={{ padding: 10, color: 'blue', fontSize: 18, fontWeight: "600" }} >HOME</Text>
            <React.Fragment>
                <View style={styles.searchField}>
                    <TextInput
                        label="search item"
                        mode="outlined"
                        value={text}
                        onChangeText={onSearchHandler}
                    />
                </View>
            </React.Fragment>
            {
                boxItems ? <BoxItemsModal /> : null
            }

            <View style={{ paddingTop: 40 }} >
                {
                    items && items.length > 0 ?
                        <View style={{ marginHorizontal: 20, backgroundColor: '#ffffff', maxHeight: 450, padding: 10, borderWidth: 3, borderColor: '#cccccc', borderRadius: 5, shadowColor: 'gray', elevation: 20 }}>
                            <SwipeListView
                                data={items}
                                renderItem={(data, rowMap) => (
                                    // <View  style={styles.itemsListrenderd}>

                                    <Pressable onPress={() => onViewItems(data)} style={styles.itemsListrenderd}>
                                        <Text style={{ fontSize: 16 }}>{data.item.boxName}</Text>
                                        <Image style={{ width: 35, height: 35 }} source={require('../images/file.png')}></Image>
                                    </Pressable>

                                    // </View>
                                )}
                                renderHiddenItem={(data, rowMap) => (
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <TouchableHighlight onPress={() => onDeleteHandler(data)}>
                                            <Image style={{ width: 25, height: 25 }} source={require('../images/remove.png')} ></Image>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => onEditDetails(data)}>
                                            <Image style={{ width: 25, height: 25 }} source={require('../images/edit-info.png')} ></Image>
                                        </TouchableHighlight>
                                    </View>
                                )}
                                leftOpenValue={40}
                                rightOpenValue={-40}
                            />
                        </View>
                        // })
                        : <View style={{ alignItems: 'center', marginTop: 150 }}>
                            <Image style={{ width: 130, height: 130, opacity: 0.3 }} source={require('../images/boxEmpty.png')} />
                            <Text style={{ paddingTop: 20, opacity: 0.4, color: '#ff1a1a', fontWeight: '600' }}>No Data Found, please try to ADD</Text>
                        </View>
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
        borderWidth: 1.5,
        borderColor: '#adc2eb',
        padding: 5,
        margin: 10, display: 'flex',
        // justifyContent: 'space-around',
        borderRadius: 7,
        // borderWidth
        flexDirection: 'row',
        backgroundColor: '#e6f0ff'
    },
    itemsListrenderd: {
        backgroundColor: '#8cb3d9',
        marginVertical: 5,
        height: 60,
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        paddingEnd: 20,
        flexDirection: 'row',
        // justifyContent: 'center',
        justifyContent: 'space-between',
    }

})