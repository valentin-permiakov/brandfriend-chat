import { Layout, Grid } from 'antd';
import { useRef, useState } from 'react';
import './App.css';
import data from './chat.json';
import ChatContainer from './components/ChatContainer/ChatContainer';
import ChatList from './components/ChatList/ChatList';
import React from 'react';
import { RightOutlined } from '@ant-design/icons';

export type ChatMessage = {
  name: string;
  message: string;
  createdAt: string;
};

type UpdateMessageContextValue = {
  setShownMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

export const UpdateMessageContext = React.createContext<
  UpdateMessageContextValue | undefined
>(undefined);

function App() {
  // сортирую json, чтобы сообщения были в нужно порядке по дате отправки
  const chatHistory: ChatMessage[] = data.sort((a, b) => {
    const dateA = a.createdAt.toLowerCase();
    const dateB = b.createdAt.toLowerCase();
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });

  const { md, sm } = Grid.useBreakpoint();

  const [lastIndex, setLastIndex] = useState(0);
  const [shownMessages, setShownMessages] = useState<ChatMessage[]>(
    chatHistory.slice(0, 20).reverse()
  );
  const [isLoadPossible, setIsLoadPossible] = useState(true);
  const iconRef = useRef<HTMLSpanElement>(null);

  const addMessages = (startIndex: number) => {
    if (startIndex >= chatHistory.length) {
      setIsLoadPossible(false);
      return;
    }

    const newMessages = chatHistory
      .slice(startIndex, startIndex + 20)
      .reverse();

    const updatedMessages = [...newMessages, ...shownMessages];
    setShownMessages(updatedMessages);
  };

  return (
    <main>
      <Layout>
        <Layout.Sider
          theme='light'
          width={md ? 300 : sm ? 150 : 100}
          breakpoint='sm'
          collapsedWidth={0}
          trigger={<RightOutlined ref={iconRef} />}
          zeroWidthTriggerStyle={{
            top: 0,
            border: '2px solid #d9d9d9',
          }}
          onCollapse={(collapsed, collapseType) => {
            if (iconRef.current) {
              if (collapseType === 'clickTrigger' && !collapsed)
                iconRef.current.style.transform = 'rotateY(180deg)';
              else iconRef.current.style.transform = '';
            }
          }}
        >
          <ChatList />
        </Layout.Sider>
        <Layout.Content>
          <UpdateMessageContext.Provider value={{ setShownMessages }}>
            <ChatContainer
              shownMessages={shownMessages}
              addMessages={addMessages}
              isLoadPossible={isLoadPossible}
              setLastIndex={setLastIndex}
            />
          </UpdateMessageContext.Provider>
        </Layout.Content>
      </Layout>
    </main>
  );
}

export default App;
