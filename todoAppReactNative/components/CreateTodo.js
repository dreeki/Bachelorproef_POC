import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: (props.edit) ? props.todo.author : "",
            title: (props.edit) ? props.todo.title : ""
        };

    }

    generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        
        return id;
    }

    addTodo = () => {
        if (this.props.edit){
            let todo = this.props.todo;
            todo['author'] = this.state.author;
            todo['title'] = this.state.title;
            this.props.updateTodo(todo);
        }else{
            let id = this.generateID();
            let todo = {"id": id, "author": this.state.author, "title": this.state.title};
            this.props.addTodo(todo);
        }

        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                    <TextInput
                        onChangeText={(text) => this.setState({author: text})}
                        placeholder={"Author"}
                        autoFocus={true}
                        style={[styles.title]}
                        value={this.state.author}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({title: text})}
                        placeholder={"Enter title"}
                        style={[styles.title]}
                        value={this.state.title}
                    />
                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                                  disabled={(this.state.author.length > 0 && this.state.title.length > 0) ? false : true}
                                  onPress={this.addTodo}>
                    <Text style={[styles.buttonText,
                        {
                            color: (this.state.author.length > 0 && this.state.title.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                        }]}>
                        Save
                    </Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }

}

export default CreateTodo;

var styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },

    buttonText:{
        fontWeight: "500",
    },

    quote: {
        fontSize: 17,
        lineHeight: 38,
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});