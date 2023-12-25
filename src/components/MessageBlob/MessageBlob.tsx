import { Flex, Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

type MessageBlobProps = {
  justify: 'flex-start' | 'flex-end';
  message: string;
  date: string;
  sender: string;
};

const MessageBlob: React.FC<MessageBlobProps> = ({
  justify,
  sender,
  message,
  date,
}) => {
  const messageDate = new Date(date);
  return (
    <Flex
      align={justify}
      vertical
      style={{
        paddingRight: '15px',
        marginTop: '15px',
        maxWidth: '100%',
        width: '45%',
        alignSelf: justify,
        backgroundColor: '#e5e5e5',
        border: '1px solid #d9d9d9',
        padding: '12px',
        borderRadius: '8px',
      }}
    >
      <Avatar icon={<UserOutlined />} />
      <Flex
        vertical
        align={justify}
      >
        <Typography.Text
          strong
          style={{ textAlign: justify === 'flex-start' ? 'start' : 'end' }}
        >
          {sender}
        </Typography.Text>
        <Space
          direction='vertical'
          align={justify === 'flex-start' ? 'start' : 'end'}
        >
          <Typography.Text>{message}</Typography.Text>
          <Typography.Text type='secondary'>
            {messageDate.toDateString()}
          </Typography.Text>
        </Space>
      </Flex>
    </Flex>
  );
};
export default MessageBlob;
