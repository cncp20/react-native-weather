import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    ScrollView,
    ToastAndroid
} from 'react-native';
import DrawerLayout from "react-native-drawer-layout";
import { getWeather } from "./../api";
import DrawerContent from "../components/drawer_header";
import Detail from "../components/weather_detail";
import Header from "../components/weather_header";
import store from "../store";

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            nowCity: "",
            isLoading: true
        }
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        AsyncStorage.getItem("NOW_CITY", (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            } else {
                if (res === null) {
                    //未选择城市，定位
                    this.loadData("上海");
                    this.setState({
                        nowCity: "上海"
                    })
                } else {
                    this.loadData(res);
                    this.setState({
                        nowCity: res
                    })
                }
            }
        })
        store.subscribe(() => {
            let city = store.getState().city;
            this.loadData(city);
            this.setState({
                nowCity: city
            })
        })
    }
    loadData(city) {
        AsyncStorage.getItem(city, (err, res) => {
            if (!err) {
                if (res === null) {
                    //没保存数据
                    this.get(city);
                } else {
                    let date = new Date();
                    let weather = JSON.parse(res);
                    let today = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
                    if (today === weather.date) {
                        //缓存中读取
                        this.setState({
                            weatherData: weather,
                            isLoading: false
                        })
                    } else {
                        this.get(city);
                    }
                }
            }
        })

    }
    closeDrawer() {
        this.refs.drawer.closeDrawer();
    }
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    update() {
        this.get(this.state.nowCity, () => {
            ToastAndroid.show("刷新成功", 3000);
        });
    }

    get(city, callback) {
        getWeather(city, data => {
            if (data.status === 200) {
                AsyncStorage.setItem(city, JSON.stringify(data));
                this.setState({
                    weatherData: data,
                    isLoading: false
                });
                if (callback) {
                    callback();
                }
            } else {
                alert("刷新太频繁了，请稍后重试");
            }
        });
    }
    render() {
        return (
            <DrawerLayout
                ref="drawer"
                drawerWidth={250}
                drawerPosition={DrawerLayout.positions.Left}
                renderNavigationView={() =>
                    <DrawerContent navigation={this.props.navigation} callback={this.closeDrawer.bind(this)}
                    />}
                drawerBackgroundColor="rgb(54,57,66)"
            >
                <Image
                    source={require("./../img/bg.jpg")}
                    style={styles.bg}
                    resizeMethod={'scale'}
                    blurRadius={5}
                />
                {this.state.isLoading ? <Text></Text> : <Header city={this.state.nowCity} open={this.openDrawer.bind(this)} update={this.update.bind(this)} />}
                <ScrollView>
                    {this.state.isLoading ? <Text>加载中</Text> : <Detail data={this.state.weatherData} />}
                </ScrollView>
            </DrawerLayout>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -2,
    }
})