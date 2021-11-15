import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EventsContext } from '../contexts/EventsContext';
import ToDoItem from './ToDoItem';
import { Icon } from '@iconify/react';
import NewToDo from './NewToDo';

const ToDoList = (props) => {
  const { eventId } = useParams();
  const { eventData } = useContext(EventsContext);
  const todos = eventData.find((e) => e.id === eventId).todos;
  const [addTask, setAddTask] = useState(false);

  return (
    <React.Fragment>
      {/* Link is temporary until menu/header merged
      It adds ability to go back to event info page */}
      <Link to={`/events/${eventId}`} className=''>
        {`< Back to event info`}
      </Link>
      <ul className='mt-20'>
        {todos.map((todo) => {
          return <ToDoItem key={todo.id} eventId={eventId} todo={todo} />;
        })}
      </ul>
      <button
        className={`flex justify-center items-center w-40 ${
          addTask ? 'hidden' : 'block'
        } rounded-full hover:bg-gray-200 active:bg-gray-400`}
        onClick={() => setAddTask(true)}
      >
        <Icon icon='entypo:plus' className='w-10 h-10' />
        <span>Add new task</span>
      </button>
      {addTask && <NewToDo eventId={eventId} setAddTask={setAddTask} />}
    </React.Fragment>
  );
};
export default ToDoList;
