import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import back from '../images/back1.png';
import bell from '../images/notification.png'
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigation } = this.props;
        const data = [
            {
                name: "Item 1",
                description: "dfsafasfasfasfafasfafafa"
            },
            {
                name: "Item 2",
                description: "dfsafasfasfasfafasfafafa"
            },
            {
                name: "Item 3",
                description: "dfsafasfasfasfafasfafafa"
            },
            {
                name: "Item 4",
                description: "dfsafasfasfasfafasfafafa"
            },
        ];
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <View style={styles.back}>

                    </View>
                    <View style={styles.titlebg}>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <View style={styles.box} item={item} index={index}>
                                <View style={styles.image}>
                                    <Image source={bell} style={{ alignSelf: 'center', margin: 20 }}></Image>
                                </View>
                                <View style={styles.des}>
                                    <Text style={styles.textNo}>{item.name}</Text>
                                    <Text style={styles.textDes}>{item.description}</Text>
                                </View>
                            </View>
                        )
                    }} ></FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    toolbar: {
        backgroundColor: '#F58B03',
        width: '100%',
        height: '8%',
        flexDirection: 'row'
    },
    body: {
        marginTop: 10,
        width: '100%',
        height: '95%',
    },
    back: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlebg: {
        width: '75%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    box: {
        width: '100%',
        height: 80,
        backgroundColor: '#F9F9F9',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    image: {
        flex: 2,
    },
    des: {
        flex: 8,
        flexDirection: 'column'
    },
    textNo: {
        flex: 0.5,
        width: '100%',
        margin: 2,
        fontWeight: "bold",

    },
    textDes: {
        flex: 1,
        width: '100%',

    },

});