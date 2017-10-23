import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {this.props.open()}}>
                <Image source={require("./../img/title_city.png")} style={styles.img}/>
                </TouchableOpacity>
                <Text style={styles.txt}>{this.props.city}</Text>
                <TouchableOpacity onPress={() => {this.props.update()}}>
                <Image source={require("./../img/title_update.png")} style={styles.img}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    img: {
        width: 50,
        height: 50,
    },
    txt: {
        color: "#fff",
        fontSize: 28
    }
})