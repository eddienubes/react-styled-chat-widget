import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppWrapper, GlobalStyles} from './App.styles';

import styled from "styled-components";
import ChatContainer from "./containers/chat-container";
import {Message, MessageSendHandler, SendClickHandler} from "./types/chat";
import socket from "./config/socket";
import Spinner from "./components/spinner";

const Header = styled.div`
  background: ${props => props.theme.primary};
  height: auto;
  color: white;
  padding: 2%;
  text-align: center;
  word-break: break-word;
  font-size: 1rem;
  box-shadow: 0 4px 10px -4px black;
  width: 100%;
  z-index: 2;
  box-sizing: border-box;
  
  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.secondary};
    width: 80%;
  }
`;

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const userID = useMemo<number>(() => Math.random() * 10000, []);

  const messageSendRequestedHandler = (data: Message) => {
    setMessages(messages => {
      return [
        ...messages,
        {...data, isPrimary: true},
      ]
    })
  }

  const messageSendSucceedHandler = useCallback((data) => {
    if (data?.userID !== userID) {
      setMessages(messages => {
        return [
          ...messages,
          {...data, isPrimary: false}
        ]
      })
    }
  }, [userID]);

  const chatHistoryHandler = useCallback((globalChat: {
    messages: [{id: number,
      userID: number,
      message: string,
      date: Date,
      sent: boolean}]
  }) => {
    setMessages(globalChat.messages.map(m => {
      return {
        ...m,
        isPrimary: m.userID === userID
      }
    }));
    setLoading(false);
  }, [userID]);

  useEffect(() => {
    socket.on('chat-history', chatHistoryHandler);
    socket.on('message-send-requested', messageSendRequestedHandler);
    socket.on('message-send-succeed', messageSendSucceedHandler);

    return () => {
      socket.off('chat-history', chatHistoryHandler);
      socket.off('message-send-requested', chatHistoryHandler);
    }
  }, [chatHistoryHandler, userID, messageSendSucceedHandler]);


  // used to switch message delivery indicator
  const onMessageSend = useCallback<MessageSendHandler>((currentID, setDeliveryStatus) => {
    socket.on('message-send-succeed', data => {
      if (data.id?.toString() === currentID?.toString()) {
        setDeliveryStatus();
      }
    });
  }, []);

  // called when user presses the send button
  const onSendClick = useCallback<SendClickHandler>((message: string) => {
    socket.emit('message-send-requested', {message, userID});
  }, [userID]);


  return (
    <AppWrapper>
      <GlobalStyles/>
      <ChatContainer
        defaultPosition={'bottomRight'}
        messages={messages}
        loading={loading}
        onMessageSend={onMessageSend}
        onSendClick={onSendClick}
        spinner={<Spinner/>}
      >
        <Header>
          <p>Welcome to support window!</p>
          <hr/>
          <p>Here you can chat directly with me. I usually answer in a few minutes.</p>
        </Header>
      </ChatContainer>
    </AppWrapper>
  );
}

export default App;
