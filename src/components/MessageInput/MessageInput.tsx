import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState, KeyboardEvent, useContext } from 'react';
import { ChatMessage, UpdateMessageContext } from '../../App';
import { scrollToBottom } from '../../utils/scrollToBottom';

type MessageInputProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const MessageInput: React.FC<MessageInputProps> = ({ containerRef }) => {
  const [message, setMessage] = useState('');
  const updateMessageContext = useContext(UpdateMessageContext);

  const handleSubmit = () => {
    const newMessage: ChatMessage = {
      name: 'Bob',
      message: message.trim(),
      createdAt: new Date().toJSON(),
    };
    updateMessageContext?.setShownMessages((prevState) => {
      const newState = [...prevState, newMessage];
      return newState;
    });

    setMessage('');
    scrollToBottom(containerRef);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter' && message.trim().length !== 0) {
      handleSubmit();
    }
  };

  return (
    <Form
      layout='inline'
      style={{
        alignItems: 'center',
        padding: '5px',
        flexWrap: 'nowrap',
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        rules={[{ required: true }, { message: 'Please enter your message!' }]}
        style={{ flex: '1 1 90%' }}
      >
        <TextArea
          placeholder='Type your message here...'
          autoSize={{ minRows: 3, maxRows: 6 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          disabled={message.trim().length === 0}
          htmlType='submit'
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};
export default MessageInput;
