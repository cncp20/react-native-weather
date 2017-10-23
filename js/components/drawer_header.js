import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class DrawerHeader extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {this.props.callback(); navigate("CityScreen") }}>
                    <Text style={styles.normalText}>城市管理</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this.props.callback(); }}>
                    <Text style={styles.normalText}>设置</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.callback(); }}>
                    <Text style={styles.normalText}>关于</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    normalText: {
        padding: 10,
        color: "#fff",
        fontSize: 15
    }
})