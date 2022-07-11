import React from "react";
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

function CustomizeBox(props) {
    return (
        <View>
            <Text style={{ padding: 10, color: 'blue', fontSize: 18, fontWeight: "600" }} >CUSTOMIZE BOX</Text>
            <View style={{ alignItems: 'center', marginTop: 150 }}>
                <Image style={{ width: 130, height: 130, opacity: 0.6 }} source={require('../images/sketch.png')} />
                <Text style={{ paddingTop: 20, opacity: 0.8, color: '#ff1a1a', fontWeight: '600' }}>
                    THE CUSTOMIZATION OF THE FORMS AND THEIR QUANTITY WILL BE DEVELOPED HERE
                </Text>
            </View>
        </View>
    )
} export default CustomizeBox