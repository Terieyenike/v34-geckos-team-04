import { useContext, useState, useEffect } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import { Icon } from '@iconify/react';
import PrioSelector from './PrioSelector';

const ToDoItem = (props) => {
  const { todo, eventId } = props;
  const { dispatch } = useContext(EventsContext);

  const [name, setName] = useState(todo.name);
  const [assignees, setAssignees] = useState(todo.assignees);
  const [prio, setPrio] = useState(todo.prio);
  const [nameInput, setNameInput] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState(false);
  const [prioSelector, setPrioSelector] = useState(false);

  const handleNameChange = () => {
    if (name.length > 0 && name !== todo.name) {
      dispatch({
        type: 'changeTaskName',
        eventId,
        todo: {
          ...todo,
          name,
        },
      });
    } else setName(todo.name);

    setNameInput(false);
  };

  useEffect(() => {
    if (prio !== todo.prio) {
      dispatch({
        type: 'changePrio',
        eventId,
        todo: {
          ...todo,
          prio,
        },
      });
    }
  }, [prio, dispatch, eventId, todo]);

  const handleAssignChange = () => {
    if (assignees.length > 0 && assignees !== todo.assignees) {
      dispatch({
        type: 'changeAssigneeName',
        eventId,
        todo: {
          ...todo,
          assignees,
        },
      });
    } else setAssignees(todo.assignees);

    setAssigneeInput(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleAssignChange();
        handleNameChange();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [name, assignees]);

  return (
    <li
      className={`flex flex-row items-center mb-8 w-full relative ${
        props.index >= 5 && 'hidden'
      }`}
    >
      <span
        className={`w-2.5 h-16 ${
          todo?.prio === 'high'
            ? 'bg-prioHigh'
            : todo?.prio === 'medium'
            ? 'bg-prioMedium'
            : 'bg-prioLow'
        } ${props.prio === 'hidden' && 'hidden'}`}
        onClick={() => setPrioSelector(!prioSelector)}
      ></span>
      {prioSelector && (
        <PrioSelector
          setPrio={setPrio}
          setPrioSelector={setPrioSelector}
          edit={true}
        />
      )}
      <input
        type='checkbox'
        id={todo.id}
        className='form-checkbox rounded-full w-12 h-12 ml-2 text-blue-400 focus:ring-0'
        onChange={() => {
          dispatch({ type: 'toggleTodo', eventId, todoClicked: todo.id });
        }}
        checked={todo.status}
      />
      <div
        htmlFor={todo.id}
        className='ml-3 flex flex-row justify-between w-full'
      >
        {!nameInput && <p onClick={() => setNameInput(true)}>{todo.name}</p>}
        {nameInput && (
          <input
            type='text'
            className='form-input border h-8 max-w-[40%] ml-3 rounded-full flex-shrink'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameChange}
            autoFocus
          />
        )}
        {!assigneeInput && (
          <p onClick={() => setAssigneeInput(true)}>{todo.assignees}</p>
        )}
        {assigneeInput && (
          <input
            type='text'
            className='form-input border h-8 max-w-[40%] rounded-full flex-shrink'
            value={assignees}
            onChange={(e) => setAssignees(e.target.value)}
            onBlur={handleAssignChange}
            autoFocus
          />
        )}
      </div>
      <Icon
        icon='entypo:cross'
        className={`ml-4 w-10 h-10 ${
          props.prio === 'hidden' && 'hidden'
        } rounded-full hover:text-red-500 transition duration-200 cursor-pointer`}
        onClick={() =>
          dispatch({ type: 'deleteTodo', eventId, todoId: todo.id })
        }
      />
    </li>
  );
};
export default ToDoItem;
