import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from '../components/Home'
import CreateTodo from '../components/CreateTodo'

class Main extends Component {

    constructor(props){
        super(props);
    }

    addTodo = (todo) => {
        
        AsyncStorage.getItem('data', (err, todos) => {
            if(todos !== null){
                todos = JSON.parse(todos);
                todos.unshift(todo);
                AsyncStorage.setItem('data', JSON.stringify(todos));
                this.setState({todos: todos});
            }else {
                var list = [todo];
                AsyncStorage.setItem('data', JSON.stringify(list));
                this.setState({todos: list});
            }
        });
    }

    updateTodo = (todo) => {
        AsyncStorage.getItem('data', (err, todos) => {
            if(todos !== null) {
                todos = JSON.parse(todos);
                var index = this.getIndex(todos, todo.id);
                if(index !== -1){
                    todos[index]['author'] = todo.author;
                    todos[index]['title'] = todo.title;
                }
                AsyncStorage.setItem('data', JSON.stringify(todos));
                this.setState({todos: todos});
            }
        });
    }

    getIndex(data, id){
        let clone = JSON.parse(JSON.stringify(data));
        return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Overview" addTodo={this.addTodo} updateTodo={this.updateTodo} initial/>
                    <Scene key="create_todo" component={CreateTodo} title="Create Todo" addTodo={this.addTodo} updateTodo={this.updateTodo}/>
                </Scene>
            </Router>
        );
    }
}

export default Main;