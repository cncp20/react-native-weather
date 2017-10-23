import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    AsyncStorage
} from 'react-native';
// import CitySelect from "react-native-city-select";
import city from "../city_data";
import store from "../store";

const KEY = "CHOOSED_CITY";

export default class SelectCity extends Component {
    static navigationOptions = {
        headerTitle: "选择城市",
        headerTitleStyle: {
            alignSelf:'center'
        },
        headerRight: () => (
            <Text />
        )
    }

    constructor() {
        super();
        let ds = new ListView.DataSource({
            getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
            getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID],
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2 
        });
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        let cityKeys = Object.keys(city);
        let dataObj = {};
        let sectionIDs = [];
        let rowIDs = [];
        cityKeys.map((key,index) => {
            sectionIDs.push(index);
            dataObj[index] = key;
            rowIDs[index] = [];
            city[key].map((item, idx) => {
                rowIDs[index].push(idx);
                dataObj[index + ":" + idx] = item.cityName;
            });
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataObj, sectionIDs, rowIDs)
        })
    }
    render() {
        return (
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader}
            />
        )
    }
    renderRow(row) {
        return(
            <TouchableOpacity style={styles.rowContainer} onPress={this.handleCitySelect.bind(this, row)}>
                <Text style={styles.row}>{row}</Text>
            </TouchableOpacity>
        )
    }
    renderSectionHeader(sectionData, sectionID) {
        return (
            <Text style={styles.section}>{sectionData}</Text>
        )
    }
    handleCitySelect(city) {
        AsyncStorage.getItem(KEY, (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            } else {
                if (res == null) {
                    //第一次存
                    let choosedCity = [city];
                    AsyncStorage.setItem(KEY, JSON.stringify(choosedCity));
                } else {
                    let choosedCity = JSON.parse(res);
                    if (choosedCity.indexOf(city) === -1) {
                        //没有存过
                        choosedCity.push(city);
                        AsyncStorage.setItem(KEY, JSON.stringify(choosedCity));
                    } 
                }
            }
        });
        store.dispatch({
            type: "CHANGE_CITY",
            payload: city
        });
        AsyncStorage.setItem("NOW_CITY", city)
        this.props.navigation.goBack("WeatherScreen");
    }
}

const styles = StyleSheet.create({
    section: {
        padding: 8,
        fontSize: 20,
        backgroundColor: "#F3F3F3",
        color: "#1BC1AF"
    },
    row: {
        fontSize: 18,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    rowContainer: {
        paddingLeft: 3,
        paddingRight: 3,
    }

})