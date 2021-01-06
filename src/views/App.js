import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo'; // import it explicitly
import AddNewTodo from "../components/AddNewTodo";
import ListTodo from "../components/ListTodo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTodo: [],
      isUpdateTodo: false,
      itemUpdate: {}
    }
  }

  addNewTodo = (newData) => {
    let { listTodo } = this.state;
    listTodo.push(newData);
    this.setState({
      listTodo: listTodo
    })
  }

  removeTodo = (data) => {
    let { listTodo } = this.state;
    listTodo = listTodo.filter(item => {return item.id !== data.id})
    this.setState({
      listTodo: listTodo
    })
  }

  updateToDo = (data) => {
    this.setState({
      isUpdateTodo: true,
      itemUpdate: data
    })
  }

  updateToDoFromChild = (data) => {
    let { listTodo } = this.state;
    let currentTodoIndex = listTodo.findIndex(item => { return item.id === data.id })
    if (currentTodoIndex > -1) {
      listTodo[currentTodoIndex].date = data.date;
      listTodo[currentTodoIndex].content = data.content;
      this.setState({
        listTodo: listTodo,
        isUpdateTodo: false,
        itemUpdate: {}
      })

    }
  }

  render() {
    let { listTodo, isUpdateTodo, itemUpdate } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={{flex : 2}}>
          <Text style={styles.text}>To do App with Eric</Text>
          <AddNewTodo addNewTodo={this.addNewTodo} isUpdateTodo={isUpdateTodo} itemUpdate={itemUpdate} updateToDoFromChild={this.updateToDoFromChild}/>
        </View>
        <View style={{flex: 3}}>
          <ListTodo listTodo={listTodo} removeTodo={this.removeTodo} updateToDo={this.updateToDo} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: '#e4e6e8',
    height: "100%",
    flexDirection: 'column',
    flex: 1
  },

  text: {
    fontSize: 20,
    textTransform: 'uppercase',
    height: 30,
    justifyContent: "center",
    marginTop: 30,
    borderColor: 'black',
    color: 'red',
    textAlign: 'center'
  },

});
export default registerRootComponent(App); // this is how I register the App component