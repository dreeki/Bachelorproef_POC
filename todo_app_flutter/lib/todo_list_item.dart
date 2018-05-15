import 'package:flutter/material.dart';

import './todo.dart';

// zal 1 todo object beschrijven hoe het eruit ziet, er zal een lijst van deze widgets getoond worden
class TodoListItem extends StatelessWidget {
  final Todo todo;

  TodoListItem({this.todo});

  void _handleClick(){
    
  }

  @override
  Widget build(BuildContext context) {
    return new ListTile(
      title: new Text(
        todo.author,
        style: new TextStyle(fontWeight: FontWeight.bold),
      ),
      subtitle: new Text(todo.message),
      onTap: () => _handleClick(),
    );
  }
}