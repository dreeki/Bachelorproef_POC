import 'dart:async';
import 'package:flutter/material.dart';
//import './create_todo.dart';
//import './todo_list_item.dart';
import './todo.dart';

class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => new _TodoListState();
}

class _TodoListState extends State<TodoList> {
  List<Todo> todos = new List();
  final TextEditingController _authorTextController =
      new TextEditingController();
  final TextEditingController _messageTextController =
      new TextEditingController();

  void _handleNewTodoSubmitted(BuildContext context, String author, String message) {
    if (author.isEmpty || message.isEmpty) return;
    // slecht id, maar voldoet voor deze use case
    Todo result = new Todo(
        id: new DateTime.now().millisecond, message: message, author: author);
    _authorTextController.text = '';
    _messageTextController.text = '';
    Navigator.of(context).pop(result);
  }

  // click op backbutton in appbar geeft crash, is een gekende bug voor de devs. https://github.com/flutter/flutter/issues/8080
  Future _handleNewTodo(BuildContext context) async {
    //geeft problemen als dit in apart bestand staat, waarom????
    Todo newTodo = await Navigator
        .of(context)
        .push(new MaterialPageRoute<Todo>(builder: (BuildContext context) {
      return new Scaffold(
        appBar: new AppBar(
          title: new Text('New Todo Item'),
        ),
        body: new Center(
          child: new Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              new Container(
                margin: const EdgeInsets.only(
                    left: 32.0, bottom: 16.0, right: 32.0),
                child: new TextField(
                  controller: _authorTextController,
                  decoration:
                      new InputDecoration(hintText: 'Enter the author name...'),
                ),
              ),
              new Container(
                margin: const EdgeInsets.only(
                    left: 32.0, bottom: 16.0, right: 32.0),
                child: new TextField(
                  controller: _messageTextController,
                  decoration:
                      new InputDecoration(hintText: 'Enter the message...'),
                ),
              ),
              new RaisedButton(
                child: new Text('Add'),
                onPressed: () => _handleNewTodoSubmitted(context,
                    _authorTextController.text, _messageTextController.text),
              )
            ],
          ),
        ),
      );
    }));

    setState(() {
      todos.add(newTodo);
    });
  }

  void _handleEditTodoSubmitted(BuildContext context, String author, String message, int id) {
    if (author.isEmpty || message.isEmpty) return;
    // slecht id, maar voldoet voor deze use case
    Todo result = new Todo(
        id: id, message: message, author: author);
    _authorTextController.text = '';
    _messageTextController.text = '';
    Navigator.of(context).pop(result);
  }

// heel moeilijk om een functio mee te geven
  Future _handleEditTodo(BuildContext context, Todo todo) async {
    //geeft problemen als dit in apart bestand staat, waarom????
    _authorTextController.text = todo.author;
    _messageTextController.text = todo.message;
    Todo editedTodo = await Navigator
        .of(context)
        .push(new MaterialPageRoute<Todo>(builder: (BuildContext context) {
      return new Scaffold(
        appBar: new AppBar(
          title: new Text('Edit Todo Item'),
        ),
        body: new Center(
          child: new Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              new Container(
                margin: const EdgeInsets.only(
                    left: 32.0, bottom: 16.0, right: 32.0),
                child: new TextField(
                  controller: _authorTextController,
                  decoration:
                      new InputDecoration(hintText: 'Enter the author name...'),
                ),
              ),
              new Container(
                margin: const EdgeInsets.only(
                    left: 32.0, bottom: 16.0, right: 32.0),
                child: new TextField(
                  controller: _messageTextController,
                  decoration:
                      new InputDecoration(hintText: 'Enter the message...'),
                ),
              ),
              new RaisedButton(
                child: new Text('Edit'),
                onPressed: () => _handleEditTodoSubmitted(context,
                    _authorTextController.text, _messageTextController.text, todo.id),
              )
            ],
          ),
        ),
      );
    }));


    setState(() {
      todos.remove(todo);
      todos.add(editedTodo);
    });
  }

  void _handleDeleteTodo(BuildContext context, Todo todo) {
    setState(() {
      todos.remove(todo);
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
          title: new Container(
        padding: const EdgeInsets.only(left: 16.0),
        child: new Text('Todo List Flutter'),
      )),
      body: new ListView(
          /*children: todos
            .map((Todo todo) => new TodoListItem(todo: todo))
            .toList()
            .reversed
            .toList(),*/
          children: todos
              .map((Todo todo) => new ListTile(
                    title: new Text(
                      todo.author,
                      style: new TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: new Text(todo.message),
                    onTap: () => _handleEditTodo(context, todo),
                    onLongPress: () => _handleDeleteTodo(context, todo),
                  ))
              .toList()
              .reversed
              .toList()),
      floatingActionButton: new FloatingActionButton(
        child: new Icon(Icons.add),
        tooltip: 'Add a new Todo item',
        onPressed: () => _handleNewTodo(context),
      ),
    );
  }
}
