import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('ease-in-out', [
      transition(':enter', [
        style({transform: 'translateY(-20px)', opacity: 0}),
        animate(250)
      ]),

      transition(':leave', [
        animate(250, style({transform: 'translateY(-20px)', opacity: 0}))
      ])
    ]),

    trigger('move-up', [
      transition('* => *', [
        animate(250)
      ])
    ])
  ]

})
export class AppComponent {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {

  }
  
  addTodo() {
    if (this.newTodo.title !== '') {
      this.todoDataService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }
  
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }
  
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
