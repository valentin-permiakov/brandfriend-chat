import { Flex } from 'antd';
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../App';
import MessageBlob from '../MessageBlob/MessageBlob';
import MessageInput from '../MessageInput/MessageInput';
import { scrollToBottom } from '../../utils/scrollToBottom';

type ChatContainerProps = {
  shownMessages: ChatMessage[];
  addMessages: (startIndex: number) => void;
  isLoadPossible: boolean;
  setLastIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ChatContainer: React.FC<ChatContainerProps> = ({
  shownMessages,
  addMessages,
  isLoadPossible,
  setLastIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom(containerRef);
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop === 0) {
        const scrollPosition = scrollHeight - clientHeight;

        if (!isLoadPossible) return;

        setLastIndex((prevIndex) => {
          const newIndex = prevIndex + 20;
          addMessages(newIndex);
          return newIndex;
        });

        if (containerRef.current) {
          containerRef.current.scrollTop =
            containerRef.current.scrollHeight - scrollPosition;
        }
      }
    }
  };
  return (
    <Flex
      vertical
      style={{ height: '100dvh' }}
    >
      <Flex
        vertical
        style={{
          overflowY: 'scroll',
          paddingRight: '15px',
          paddingLeft: '5px',
        }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {shownMessages.map((message) => (
          <MessageBlob
            key={message.createdAt}
            justify={message.name === 'Bob' ? 'flex-end' : 'flex-start'}
            sender={message.name === 'Bob' ? 'You' : message.name}
            message={message.message}
            date={message.createdAt}
          />
        ))}
      </Flex>
      <MessageInput containerRef={containerRef} />
    </Flex>
  );
};
export default ChatContainer;
