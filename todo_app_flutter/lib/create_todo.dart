import 'package:flutter/material.dart';

import './todo.dart';

class CreateTodo extends StatelessWidget {
  static const String routeName = '/create-todo';
  final TextEditingController _authorTextController = new TextEditingController();
  final TextEditingController _messageTextController = new TextEditingController();

  void _handleOnSubmitted(BuildContext context, String author, String message) {
    if (author.isEmpty || message.isEmpty) return;
    Navigator.of(context).pop(new Todo(message: message, author: author));
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('New Todo Item'),
      ),
      body: new Center(
        child: new Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            new Container(
              margin: const EdgeInsets.only(left: 32.0, bottom: 16.0, right: 32.0),
              child: new TextField(
                controller: _authorTextController,
                decoration: new InputDecoration(
                  hintText: 'Enter the author name...'
                ),
              ),
            ),
            new Container(
              margin: const EdgeInsets.only(left: 32.0, bottom: 16.0, right: 32.0),
              child: new TextField(
                controller: _messageTextController,
                decoration: new InputDecoration(
                  hintText: 'Enter the message...'
                ),
              ),
            ),
            new RaisedButton(
              child: new Text('Add'),
              onPressed: () => _handleOnSubmitted(context, _authorTextController.text, _messageTextController.text),
            )
          ],
        ),
      ),
    );
  }
}