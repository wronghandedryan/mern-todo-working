import React, { Component } from 'react';
import { render } from 'react-dom';
import Item from './Item';
import './style.css';
import 'calendar';

class App extends Component {
  constructor(props) {
    this.state = {
      newTodo: '',
      todos: [
        {
          text: 'Do Laundry',
          isComplete: false
        },
        {
          text: 'Cook Dinner',
          isComplete: true
        },
        {
          text: 'Learn Karate',
          isComplete: false
        },
        {
          text: 'Drink Wine',
          isComplete: true
        }
      ]
    };

    this.onChange = this.onChange.bind(this);
    this.handleTodoCheckboxToggle = this.handleTodoCheckboxToggle.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
  }

  onChange(e) {
    const todo = e.target.value;
    this.setState({
      newTodo: todo
    });
  }

  addNewTodo(e) {
    e.preventDefault();
    const newTodo = {
      text: this.state.newTodo,
      isComplete: false
    };
    const updatedTodos = [...this.state.todos, newTodo];
    this.setState({
      todos: updatedTodos,
      newTodo: ''
    });

  }

  handleTodoCheckboxToggle(todo_index) {
    const updatedTodos = this.state.todos.map((todo,index) => {
      if (index === todo_index) {
        return {
          ...todo,
          isComplete: !todo.isComplete
        };
      }

      return todo;
    });
    this.setState(prevState => ({
      todos: updatedTodos
    }));
  }

  renderTodos() {
    return this.state.todos.map((todo, index) => (
      <Item 
        key={index}
        index={index}
        text={todo.text} 
        checked={todo.isComplete}
        handleTodoCheckboxToggle={this.handleTodoCheckboxToggle}/>
    )).reverse();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNewTodo}>
          <input 
            type="text" 
            placeholder="Enter a todo" 
            value={this.state.newTodo}
            onChange={this.onChange}/>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
