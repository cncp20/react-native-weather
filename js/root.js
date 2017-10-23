import React, {Component} from "react";
import { StackNavigator } from "react-navigation";
import WeatherScreen from "./containers/weather";
import CityScreen from "./containers/city";
import SelectCity from "./containers/select_city";

 const navigation = StackNavigator({
     WeatherScreen: {
         screen: WeatherScreen
     },
     CityScreen: {
         screen: CityScreen
     },
     SelectCity: {
         screen: SelectCity
     }
 });

 export default navigation;
