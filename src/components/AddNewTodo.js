import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

const FOMAT_DATE = "DD/MM/YYYY";

class AddNewTodo extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
      currentDate: moment(new Date()).format(FOMAT_DATE),
      textInput: '',
      isUpdateTodo2: false,

    }

  }

  onChange = (event, selectedDate) => {
    if (selectedDate) {
      let dateChoosen = moment(selectedDate).format(FOMAT_DATE);
      this.setState({
        currentDate: dateChoosen,
        show: false
      })
    }
  };

  handleChangeTextInput = (text) => {
    this.setState({
      textInput: text
    })
  }

  createNewTodo = () => {
    let { currentDate, textInput } = this.state;
    let { addNewTodo } = this.props;
    let data = {};
    data.id = Math.floor(Math.random() * Math.floor(100000)); //random
    data.date = currentDate;
    data.content = textInput;
    addNewTodo(data);
    //clear input
    this.setState({
      textInput: ''
    })
  }

  updateOldTodo = () => {
    let { currentDate, textInput } = this.state;
    let { itemUpdate, updateToDoFromChild } = this.props
    itemUpdate.date = currentDate;
    itemUpdate.content = textInput;
    updateToDoFromChild(itemUpdate);

    this.setState({
      textInput: '',
      isUpdateTodo2: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let { isUpdateTodo, itemUpdate } = this.props;
    if (isUpdateTodo == true && itemUpdate !== prevProps.itemUpdate) {
      this.infoTextInput.focus();
      this.setState({
        textInput: itemUpdate.content,
        isUpdateTodo2: true
      })
    }
  }


  render() {
    let { show, date, currentDate, textInput, isUpdateTodo2 } = this.state;


    return (
      <View style={styles.container}>
        <View style={styles.inputUser}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new todo"
            value={textInput}
            onChangeText={(text) => { this.handleChangeTextInput(text) }}
            ref={(input) => { this.infoTextInput = input; }}

          />

          <TouchableOpacity style={styles.pickDate} onPress={() => this.setState({ show: true })} >
            <Icon name="calendar" style={styles.iconDate}></Icon>
            <Text style={styles.txtDate}> {currentDate}</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.btnCreate}>

          {!isUpdateTodo2 ?
            <Text onPress={() => this.createNewTodo()} style={{ color: '#efffff' }}>CREATE NOW</Text> :
            <Text onPress={() => this.updateOldTodo()} style={{ color: 'orange' }}>UPDATE</Text>}

        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => this.onChange(event, selectedDate)}
          />
        )}
      </View>

    );

  }


};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#6a9db8"
  },
  inputUser: {
    display: 'flex',
    flexDirection: 'row'
  },

  pickDate: {
    display: 'flex',
    flexDirection: 'row'
  },

  textInput: {
    width: '65%',
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },

  pickDate: {
    width: '35%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconDate: {
    alignSelf: 'center',
    fontSize: 22
  },
  txtDate: {
    alignSelf: 'center'
  },

  btnCreate: {
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    alignSelf: 'flex-start',
    borderColor: "#0095ff",
    backgroundColor: "#0095ff",
  }

});

export default AddNewTodo;
