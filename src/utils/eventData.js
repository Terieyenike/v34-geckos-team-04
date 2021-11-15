import { v4 as uuidv4 } from 'uuid';

const events = [
  {
    id: 'event1',
    name: 'EVENT-1',
    desc: 'Description of Event-1',
    start: '2021-10-28T09:00:00',
    end: '2021-10-29T19:00:00',
    creator: 'Emir',
    availability: [
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Emir'}
      }
    ],
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-1',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'medium',
        name: 'TODO-2',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'low',
        name: 'TODO-3',
        status: true,
        assignees: 'Jihye',
      },
    ],
  },
  {
    id: 'event2',
    name: 'EVENT-2',
    desc: 'Description of Event-2',
    start: '2021-10-29T09:00:00',
    end: '2021-10-29T19:00:00',
    creator: 'Patrik',
    availability: [
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Patrik'}
      },
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)','Tue Nov 16 2021 16:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Jihye'}
      }
    ],
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-3',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'low',
        name: 'TODO-4',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event3',
    name: 'EVENT-3',
    desc: 'Description of Event-3',
    start: '2021-10-30T09:00:00',
    end: '2021-10-30T19:00:00',
    creator: 'Teri',
    availability: [
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)','Tue Nov 16 2021 17:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Teri'}
      }
    ],
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-5',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'medium',
        name: 'TODO-6',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event4',
    name: 'EVENT-4',
    desc: 'Description of Event-4',
    start: '2021-10-31T09:00:00',
    end: '2021-10-31T19:00:00',
    creator: 'Aya',
    availability: [
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)','Thu Nov 18 2021 18:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Aya'}
      }
    ],
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-7',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-8',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event5',
    name: 'EVENT-5',
    desc: 'Description of Event-5',
    start: '2021-10-01T09:00:00',
    end: '2021-10-01T19:00:00',
    creator: 'Jihye',
    availability: [
      {
        schedules: ['Mon Nov 15 2021 08:00:00 GMT+0100 (Central European Standard Time)','Thu Nov 18 2021 18:00:00 GMT+0100 (Central European Standard Time)'],
        username: {name: 'Jihye'}
      }
    ],
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-9',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event6',
    name: 'EVENT-6',
    desc: 'Description of Event-5',
    start: '2021-10-01T09:00:00',
    end: '2021-10-01T19:00:00',
    creator: 'Jihye',
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-9',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event7',
    name: 'EVENT-7',
    desc: 'Description of Event-5',
    start: '2021-10-01T09:00:00',
    end: '2021-10-01T19:00:00',
    creator: 'Jihye',
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-9',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
  {
    id: 'event8',
    name: 'EVENT-8',
    desc: 'Description of Event-5',
    start: '2021-10-01T09:00:00',
    end: '2021-10-01T19:00:00',
    creator: 'Jihye',
    todos: [
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-9',
        status: false,
        assignees: 'Emir',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
      {
        id: uuidv4(),
        prio: 'high',
        name: 'TODO-10',
        status: true,
        assignees: 'Patrik',
      },
    ],
  },
];

export default events;
