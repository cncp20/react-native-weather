import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    AsyncStorage,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView
} from 'react-native';

export default class Detail extends Component {
    render() {
        const data = this.props.data.data;
        return (
            <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.wendu}>{data.wendu}℃</Text>
                        <Text style={styles.type}>{data.forecast[0].type}</Text>
                        <View style={styles.info}>
                            <Text style={styles.info_txt}>空气质量：{data.quality}</Text>
                            <Text style={styles.info_txt}>风向风力：{data.forecast[0].fx + data.forecast[0].fl}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.info_txt}>湿度：{data.shidu}</Text>
                            <Text style={styles.info_txt}>pm2.5：{data.pm25}</Text>
                        </View >
                        <View style={styles.info}>
                            <Text style={styles.info_txt}>日出：{data.forecast[0].sunrise}</Text>
                            <Text style={styles.info_txt}>日落：{data.forecast[0].sunset}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.date}>昨天</Text>
                            <Image source={this.switchWeatherIcon(data.yesterday.type)} style={styles.img} />
                            <Text style={styles.date}>{data.yesterday.type}</Text>
                            <Text style={styles.date}>{data.yesterday.low.split("温")[1]}~{data.yesterday.high.split("温")[1]}</Text>
                        </View>
                        {data.forecast.map((item, index) => {
                            let path = this.switchWeatherIcon(item.type);
                            let low = item.low.split("温")[1];
                            let high = item.high.split("温")[1];
                            if (index === 0) {
                                return (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.date}>今天</Text>
                                        <Image source={path} style={styles.img} />
                                        <Text style={styles.date}>{item.type}</Text>
                                        <Text style={styles.date}>{low}~{high}</Text>
                                    </View>
                                );
                            } else if (index === 1) {
                                return (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.date}>明天</Text>
                                        <Image source={path} style={styles.img} />
                                        <Text style={styles.date}>{item.type}</Text>
                                        <Text style={styles.date}>{low}~{high}</Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={index} style={styles.row}>
                                        <Text style={styles.date}>{item.date.split("星")[0]}</Text>
                                        <Image source={path} style={styles.img} />
                                        <Text style={styles.date}>{item.type}</Text>
                                        <Text style={styles.date}>{low}~{high}</Text>
                                    </View>
                                );
                            }
                        })}
                    </View>
            </View>
        )
    }

    switchWeatherIcon(type) {
        let path = "";
        switch (type) {
            case "晴":
                path = require("./../img/weather_qing.png");
                break;
            case "多云":
                path = require("./../img/weather_duoyun.png");
                break;
            case "阴":
                path = require("./../img/weather_yin.png");
                break;
            case "阵雨":
                path = require("./../img/weather_40.png");
                break;
            case "小雨":
                path = require("./../img/weather_xiaoyu.png");
                break;
            case "中雨":
                path = require("./../img/weather_zhongyu.png");
                break;
            case "大雨":
                path = require("./../img/weather_dayu.png");
                break;
            case "小雪":
                path = require("./../img/weather_xiaoxue.png");
                break;
            case "中雪":
                path = require("./../img/weather_zhongxue.png");
                break;
            case "大雪":
                path = require("./../img/weather_daxue.png");
                break;
            default:
                path = require("./../img/weather_na.png");
                break;
        }
        return path;
    }
}

const styles = StyleSheet.create({
    top: {
        marginBottom: 25
    },
    wendu: {
        color: "#fff",
        fontSize: 80,
        textAlign: "center"
    },
    type: {
        color: "#fff",
        textAlign: "center",
        fontSize: 36,
    },
    row: {
        flexDirection: "row",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "space-between"
    },
    date: {
        color: "#fff",
        textAlign: "center"
    },
    img: {
        width: 20,
        height: 20
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20, 
        paddingLeft: 20,
        paddingRight: 20
    },
    info_txt: {
        color: "#fff",
        textAlign: "center",
        flex: 1,
        fontSize: 16
    }

})