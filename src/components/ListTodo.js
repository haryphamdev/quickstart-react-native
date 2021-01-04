import * as React from 'react';
import { StyleSheet, View, ScrollView, Text, Animated, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'

const RightActions = (item, index, progress, dragX, deleteItem) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [0.7, 0]
    })
    return (
        <>
            <TouchableOpacity onPress={() => deleteItem(item, index)}>
                <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
                    <Animated.Text
                        style={{
                            color: 'white',
                            paddingHorizontal: 10,
                            fontWeight: '600',
                            transform: [{ scale }]
                        }}>
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Delete button pressed')}>

                <View style={{ backgroundColor: 'green', justifyContent: 'center' }}>
                    <Animated.Text
                        style={{
                            color: 'white',
                            paddingHorizontal: 10,
                            fontWeight: '600',
                            transform: [{ scale }]
                        }}>
                        Edit
             </Animated.Text>
                </View>
            </TouchableOpacity>
        </>
    )
}
class ListTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.refsArray = []; // add this
    }

    deleteItem = (item, index) => {
      let { removeTodo } = this.props;
      removeTodo(item);
      this.refsArray[index].close(); // or this.refsArray[item.id].close(); if you are using custom id
    }
    
    render() {
        let { listTodo } = this.props;
        return (
            <View style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%', textAlign: 'center' }}>Date</Text>
                    <Text style={{ width: '50%', textAlign: 'center' }}>Content</Text>
                </View>
                <View style={{ height: '100%' }}>
                    <ScrollView >
                        {listTodo.length === 0 && <Text style={{ textAlign: 'center', paddingTop: 5 }}>No data</Text>}
                        {
                            listTodo.map((item, index) => {
                                return (
                                    <Swipeable

                                        ref={ref => {
                                            this.refsArray[index] = ref; //or this.refsArray[item.id] 
                                        }}
                                        renderRightActions={(progress, dragX) => RightActions(item, index, progress, dragX, this.deleteItem)}>
                                        <View key={index} style={{ display: 'flex', flexDirection: 'row', padding: 5, borderBottomWidth: 1, marginBottom: 3 }}>
                                            <Text style={{ width: "50%", textAlign: 'center' }}>{item.date ? item.date : "-"}</Text>
                                            <Text style={{ width: "50%", textAlign: 'center' }}>{item.content ? item.content : "-"}</Text>
                                        </View>
                                    </Swipeable>
                                );
                            })
                        }
                    </ScrollView>
                </View>

            </View>
        )
    }
}


export default ListTodo;