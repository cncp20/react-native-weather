import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';
import store from "../store";

export default class Weather extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "城市列表",
        headerTitleStyle: {
            alignSelf:'center'
        },
        headerRight: (
            <Text style={styles.addButton} onPress={() => { navigation.navigate("SelectCity") }}>添加</Text>
        )
    })
    constructor() {
        super();
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            noCity: true
        }
    }
    componentDidMount() {
        AsyncStorage.getItem("CHOOSED_CITY", (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            } else {
                if (res == null) {
                    //当前无城市
                } else {
                    let choosedCity = JSON.parse(res);
                    this.setState({
                        noCity: false,
                        dataSource: this.state.dataSource.cloneWithRows(choosedCity)
                    })
                }
            }
        })
    }
    render() {
        return (
            <View>
                {this.state.noCity ?
                    <Text>当前没有已选择的城市，点击加号添加</Text>
                    :
                    <ListView
                        renderRow={this._renderRow.bind(this)}
                        dataSource={this.state.dataSource}
                    />
                }
            </View>
        )
    }

    _renderRow(row) {
        return (
            <TouchableOpacity onPress={this.selectCity.bind(this, row)} onLongPress={this.delCity.bind(this, row)} style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.text}>{row.split("")[0]}</Text>
                </View>
                <Text style={styles.row}>{row}</Text>
            </TouchableOpacity>
        )
    }
    selectCity(city) {
        AsyncStorage.getItem("NOW_CITY", (err, res) => {
            if (!err) {
                if (res !== city) {
                    store.dispatch({
                        type: "CHANGE_CITY", 
                        payload: city
                    });
                    AsyncStorage.setItem("NOW_CITY", city)
                }
                this.props.navigation.goBack(null);
            }
        });
    }
    delCity(city) {
        Alert.alert(null, "确定删除" + city + "吗", [
            {text: "确认", onPress: () => {
                AsyncStorage.getItem("CHOOSED_CITY", (err,res) => {
                    if (!err) {
                        let cities = JSON.parse(res);
                        let index = cities.indexOf(city);
                        cities.splice(index, 1);
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(cities)
                        })
                        AsyncStorage.setItem("CHOOSED_CITY", JSON.stringify(cities));
                        AsyncStorage.removeItem("city");
                    }
                });
            }},
            {text: '取消'}
        ])
    }
}

const styles = StyleSheet.create({
    row: {
        fontSize: 18,
        padding: 15,
    },
    addButton: {
        padding: 8,
        marginRight: 14,
        color: "#fff",
        backgroundColor: "#2866BD",
        borderRadius: 5,
        textAlign: "center" 
    },
    container: {
        flexDirection: "row",
        marginBottom: 10,
        padding: 8
    },
    left: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#2866BD",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20
    }
})
