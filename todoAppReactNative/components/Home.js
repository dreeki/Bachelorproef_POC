import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS,
    AsyncStorage
} from 'react-native';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import {Actions} from 'react-native-router-flux'

const BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];

const CANCEL_INDEX = 2;

@connectActionSheet
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true};
        this.getTodos();
    }

    getTodos = () => {
        AsyncStorage.getItem('data', (err, todos) => {
            if(todos !== null) {
                todos = JSON.parse(todos);
                this.setState({todos: todos, loading: false});
            }
            else{
                this.setState({todos: [], loading: false})
            }
        });
    }

    deleteTodo = (id) => {
        AsyncStorage.getItem('data', (err, todos) => {
            if(todos !== null) {
                todos = JSON.parse(todos);
                var index = this.getIndex(todos, id);
                if(index !== -1){
                    todos.splice(index, 1);
                }
                AsyncStorage.setItem('data', JSON.stringify(todos));
                this.setState({todos: todos});
            }
        });
    }

    showOptions = (todo) => {
        this.props.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: 1,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.create_todo({todo: todo, edit: true, title:"Edit Todo"})
                else if (buttonIndex === 1) this.deleteTodo(todo.id)
            });
    }

    getIndex(data, id){
        let clone = JSON.parse(JSON.stringify(data));
        return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.state.todos}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}/>


                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.create_todo()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderItem = ({item}) => {
        return (
            <TouchableHighlight onPress={() => this.showOptions(item)} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Text style={styles.author}>
                        {item.author}
                    </Text>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
};

export default Home;

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    title: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});