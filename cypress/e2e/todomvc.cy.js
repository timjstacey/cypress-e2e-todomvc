import { faker } from '@faker-js/faker';

const inputNewTodo = 'input.new-todo';
const listTodoItems = 'ul.todo-list li';
const inputToggleComplete = 'input.toggle';
const buttonDelete = 'button.destroy';
const textTodoCount = 'footer .todo-count';
const listFilters = '.filters li';

const generateActiveTodos = (todoCount = 1) => {
  const todos = [];
  for (let i = 0; i < todoCount; i += 1) {
    todos.push({
      id: faker.datatype.uuid(),
      title: faker.random.word(),
      completed: false,
    });
  }

  return todos;
};

describe('todo mvc', () => {
  context('add todos', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('can add a todo', () => {
      const todos = generateActiveTodos();
      cy.get(inputNewTodo)
        .type(`${todos[0].title}{enter}`);

      cy.get(listTodoItems)
        .should('have.length', 1);

      cy.get(textTodoCount)
        .should('have.text', '1 item left');
      cy.window()
        .then((window) => {
          const localStorage = JSON.parse(window.localStorage.getItem('react-todos'));
          expect(localStorage[0].title).to.eq(todos[0].title);
          expect(localStorage[0].completed).to.eq(false);
        });
    });

    it('can add multiple todos', () => {
      const todos = generateActiveTodos(5);
      todos.forEach((todo) => {
        cy.get(inputNewTodo)
          .type(`${todo.title}{enter}`);
      });
      cy.get(listTodoItems)
        .should('have.length', todos.length);
      cy.get(textTodoCount)
        .should('have.text', `${todos.length} items left`);
      cy.window()
        .then((window) => {
          const localStorage = JSON.parse(window.localStorage.getItem('react-todos'));
          expect(localStorage).to.have.length(todos.length);
          todos.forEach((todo, index) => {
            expect(localStorage[index].title).to.eq(todo.title);
            expect(localStorage[index].completed).to.eq(false);
          });
        });
    });
  });

  context('update todos', () => {
    it('can mark a todo complete', () => {
      const todos = generateActiveTodos(5);
      window.localStorage.setItem('react-todos', JSON.stringify(todos));
      cy.visit('/');

      const todo = todos[0];
      cy.contains(listTodoItems, todo.title)
        .find(inputToggleComplete)
        .click();

      cy.contains(listTodoItems, todo.title)
        .should('have.class', 'completed');

      cy.window()
        .then((window) => {
          const localStorage = JSON.parse(window.localStorage.getItem('react-todos'));
          const completedtodo = localStorage.find((ls) => ls.title === todo.title);
          expect(completedtodo.completed).to.eq(true);
        });
    });

    it('can mark a completed todo as active', () => {
      const todos = generateActiveTodos(5);
      todos[0].completed = true;
      window.localStorage.setItem('react-todos', JSON.stringify(todos));
      cy.visit('/');

      const todo = todos[0];
      cy.contains(listTodoItems, todo.title)
        .should('have.class', 'completed');

      cy.contains(listTodoItems, todo.title)
        .find(inputToggleComplete)
        .click();

      cy.contains(listTodoItems, todo.title)
        .should('not.have.class', 'completed');

      cy.window()
        .then((window) => {
          const localStorage = JSON.parse(window.localStorage.getItem('react-todos'));
          const completedtodo = localStorage.find((ls) => ls.title === todo.title);
          expect(completedtodo.completed).to.eq(false);
        });
    });

    it('can delete a todo', () => {
      const todos = generateActiveTodos(5);

      window.localStorage.setItem('react-todos', JSON.stringify(todos));
      cy.visit('/');

      const todo = todos[0];
      cy.contains(listTodoItems, todo.title)
        .find(buttonDelete)
        .click({ force: true });

      cy.contains(listTodoItems, todo.title)
        .should('not.exist');

      cy.window()
        .then((window) => {
          const localStorage = JSON.parse(window.localStorage.getItem('react-todos'));
          expect(localStorage).to.have.length(todos.length - 1);
        });
    });
  });

  context('filter todos', () => {
    it('can filter completed todos', () => {
      const todos = generateActiveTodos(5);
      todos[0].completed = true;
      window.localStorage.setItem('react-todos', JSON.stringify(todos));
      cy.visit('/');

      cy.contains(listFilters, 'Completed')
        .click();
      cy.get(listTodoItems)
        .should('have.length', 1);

      cy.contains(listFilters, 'Active')
        .click();
      cy.get(listTodoItems)
        .should('have.length', 4);

      cy.contains(listFilters, 'All')
        .click();
      cy.get(listTodoItems)
        .should('have.length', 5);
    });

    it('can filter active todos', () => {
      const todos = generateActiveTodos(5);
      todos[0].completed = true;
      window.localStorage.setItem('react-todos', JSON.stringify(todos));
      cy.visit('/');

      cy.contains(listFilters, 'Active')
        .click();
      cy.get(listTodoItems)
        .should('have.length', 4);
    });
  });
});
