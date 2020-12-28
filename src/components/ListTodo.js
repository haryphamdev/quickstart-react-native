import * as React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

class ListTodo extends React.Component {

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
                                    <View key={index} style={{ display: 'flex', flexDirection: 'row', padding: 5, borderBottomWidth: 1, marginBottom: 3}}>
                                        <Text style={{ width: "50%", textAlign: 'center' }}>{item.date ? item.date : "-"}</Text>
                                        <Text style={{ width: "50%", textAlign: 'center' }}>{item.content ? item.content : "-"}</Text>
                                    </View>
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