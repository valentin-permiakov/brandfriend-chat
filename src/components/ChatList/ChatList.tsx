import { UserOutlined } from '@ant-design/icons';
import { Avatar, Grid, List } from 'antd';
import React from 'react';

type ChatListProps = {};

const chats = [
  { sender: 'Alice', text: 'Lorem ipsum...' },
  { sender: 'Alex', text: 'Lorem ipsum...' },
];
const ChatList: React.FC<ChatListProps> = () => {
  const { sm } = Grid.useBreakpoint();
  return (
    <List
      itemLayout='horizontal'
      dataSource={chats}
      renderItem={(item) => (
        <List.Item
          style={{
            borderBottom: '1px solid #e8e8e8',
            padding: '5px',
            backgroundColor: '#f7f7f7',
            alignItems: 'center',
          }}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={<a href='#'>{item.sender}</a>}
            description={sm ? item.text : ''}
          />
        </List.Item>
      )}
    />
  );
};
export default ChatList;
