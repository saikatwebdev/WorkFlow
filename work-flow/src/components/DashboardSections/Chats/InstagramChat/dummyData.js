// Sample contacts data
export const contacts = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    status: 'active',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'Can we reschedule our meeting?',
    time: '9:15 AM',
    status: 'pending',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastMessage: 'I\'ve sent the proposal',
    time: 'Yesterday',
    status: 'assigned',
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 4,
    name: 'Emma Davis',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    lastMessage: 'Thanks for your help!',
    time: 'Yesterday',
    status: 'closed',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    lastMessage: 'Let me check and get back to you',
    time: '7/20/23',
    status: 'pending',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    lastMessage: 'The project is due next week',
    time: '7/19/23',
    status: 'assigned',
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 7,
    name: 'James Anderson',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    lastMessage: 'Can you send me the files?',
    time: '7/18/23',
    status: 'active',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 8,
    name: 'Sophia Brown',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    lastMessage: 'Meeting at 2 PM tomorrow',
    time: '7/17/23',
    status: 'closed',
    isOnline: false,
    unreadCount: 0
  }
];

// Sample messages data
export const messages = {
  1: [
    {
      id: 101,
      text: 'Hey there! How are you doing?',
      sender: 'them',
      timestamp: '2023-07-23T09:30:00Z',
      status: 'read'
    },
    {
      id: 102,
      text: 'I\'m good, thanks for asking! How about you?',
      sender: 'me',
      timestamp: '2023-07-23T09:32:00Z',
      status: 'read'
    },
    {
      id: 103,
      text: 'I was wondering if you had time to discuss the project?',
      sender: 'them',
      timestamp: '2023-07-23T09:33:00Z',
      status: 'read'
    }
  ],
  2: [
    {
      id: 201,
      text: 'Hi Sarah, about our meeting tomorrow...',
      sender: 'me',
      timestamp: '2023-07-23T08:15:00Z',
      status: 'read'
    },
    {
      id: 202,
      text: 'Can we reschedule? Something came up.',
      sender: 'them',
      timestamp: '2023-07-23T09:15:00Z',
      status: 'read'
    }
  ],
  3: [
    {
      id: 301,
      text: 'I\'ve sent the proposal for your review.',
      sender: 'them',
      timestamp: '2023-07-22T16:45:00Z',
      status: 'read'
    },
    {
      id: 302,
      text: 'Thanks! I\'ll take a look and get back to you.',
      sender: 'me',
      timestamp: '2023-07-22T17:30:00Z',
      status: 'read'
    }
  ]
};

// Quick replies for the chat
export const quickReplies = [
  {
    id: 'qr1',
    text: 'Hi there! How can I help you today?',
    category: 'Greetings'
  },
  {
    id: 'qr2',
    text: 'Thanks for reaching out! Let me check that for you.',
    category: 'Acknowledgment'
  },
  {
    id: 'qr3',
    text: 'Could you please provide more details?',
    category: 'Clarification'
  },
  {
    id: 'qr4',
    text: 'I\'ll get back to you with an update soon.',
    category: 'Follow-up'
  },
  {
    id: 'qr5',
    text: 'Is there anything else I can assist you with?',
    category: 'Closing'
  }
];
