import { v4 as uuidv4 } from 'uuid';

const eventsReducer = (state, action) => {
  let availability;
  if (action.eventId) {
    availability = state.find((e) => e.id === action.eventId).availability;
  }

  let todos;
  if (action.eventId) {
    todos = state.find((e) => e.id === action.eventId).todos;
  }

  switch (action.type) {
    case 'toggleTodo':
      // gets event todos from state
      // creates a new updatedTodos array to toggle status
      const updatedTodos = todos.map((todo) =>
        todo.id === action.todoClicked
          ? { ...todo, status: !todo.status }
          : todo
      );
      return state.map((e) =>
        action.eventId === e.id ? { ...e, todos: updatedTodos } : e
      );

    case 'deleteTodo':
      const deletedTodos = todos.filter((todo) => todo.id !== action.todoId);
      return state.map((e) =>
        action.eventId === e.id ? { ...e, todos: deletedTodos } : e
      );

    case 'addTodo':
      const newTask = {
        id: uuidv4(),
        prio: action.prio === '' ? 'high' : action.prio,
        name: action.name,
        status: false,
        assignees: action.assignee,
      };

      todos.push(newTask);

      return state.map((e) => (e.id === action.eventId ? { ...e, todos } : e));

    case 'addNewEvent':
      const newEvent = {
        id: uuidv4(),
        name: action.name,
        desc: action.desc,
        start: null,
        end: null,
        timezone: null,
        selected: false,
        creator: action.creator,
        todos: [],
        availability: [],
      };
      return [...state, newEvent];
    case 'selectEvent':
      return state.map((e) =>
        action.eventId === e.id
          ? { ...e, selected: true }
          : { ...e, selected: false }
      );
    case 'setNewDate':
      const { newDate } = action;
      return state.map((e) =>
        action.eventId === e.id ? { ...e, [action.setting]: newDate } : e
      );
    case 'addSchedule':
      const newSchedule = {
        username: action.userName,
        schedules: action.schedule,
      };
      availability.push(newSchedule);
      return state.map((e) =>
        e.id === action.eventId ? { ...e, availability } : e
      );
    case 'deleteSchedule':
      const deletedAvailability = availability.filter(
        (a) => a.username !== action.userName
      );
      return state.map((e) =>
        action.eventId === e.id
          ? { ...e, availability: deletedAvailability }
          : e
      );
    case 'setTimezone':
      const { timezone } = action;
      return state.map((e) =>
        action.eventId === e.id ? { ...e, timezone } : e
      );

    case 'changeTaskName':
      const nameChangedTodos = todos.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );

      return state.map((e) =>
        e.id === action.eventId ? { ...e, todos: nameChangedTodos } : e
      );

    case 'changeAssigneeName':
      const assigneeChangedTodos = todos.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );

      return state.map((e) =>
        e.id === action.eventId ? { ...e, todos: assigneeChangedTodos } : e
      );

    case 'changePrio':
      const changedPrioTodos = todos.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );

      return state.map((e) =>
        e.id === action.eventId ? { ...e, todos: changedPrioTodos } : e
      );

    case 'addGoogleEventId':
      return state.map((e) =>
        e.id === action.eventId
          ? {
              ...e,
              googleEventId: action.googleEventId,
              googleEventLink: action.googleEventLink,
            }
          : e
      );

    case 'editEvent':
      return state.map((e) =>
        e.id === action.eventId
          ? { ...e, name: action.name, desc: action.desc }
          : e
      );

    case 'deleteEvent':
      return state.filter((e) => e.id !== action.eventId);
    default:
      return state;
  }
};

export default eventsReducer;
