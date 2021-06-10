import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppWrapper, GlobalStyles} from './App.styles';

import styled from "styled-components";
import ChatWidget from "../../lib/containers/chat-container";
import {Message, MessageSendHandler, SendClickHandler} from "../../lib";

import Spinner from "../../lib/components/spinner";

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
  const userID = useMemo<number>(() => Math.floor(Math.random() * 10000), []);

  useEffect(() => {
    setMessages((messages) => {
      return [
        {
          id: 1,
          isPrimary: false,
          message: 'What is bothering you?',
          sent: true,
          date: new Date(new Date().setHours(new Date().getMinutes() - 1)),
          author: 'Moderator'
        },
        {
          id: 2,
          isPrimary: true,
          message: 'I am tired of trying to find a decent chat widget to integrate into my brand new website :(',
          sent: true,
          date: new Date(new Date().setHours(new Date().getMinutes())),
          author: 'You'
        },
        {
          id: 3,
          isPrimary: false,
          message: 'I have just stumbled across this good looking one, it\'s called react-styled-chat-widget. Check it out!',
          sent: true,
          date: new Date(new Date().setHours(new Date().getMinutes() + 1)),
          author: 'Moderator'
        }
      ]
    });
    setLoading(false);
  }, []);


  // used to switch message delivery indicator
  const onMessageSend = useCallback<MessageSendHandler>((currentID, setDeliveryStatus) => {
    setDeliveryStatus();
  }, []);

  // called when user presses the send button
  const onSendClick = useCallback<SendClickHandler>((message: string) => {
    setMessages((messages) => {
      return [
        ...messages,
        {id: Math.floor(Math.random() * 10000), isPrimary: true, date: new Date(), sent: true, message, author: 'You'},
      ]
    })
  }, [userID]);


  return (
    <AppWrapper>
      <GlobalStyles/>
      <ChatWidget
        defaultPosition={'bottomRight'}
        messages={messages}
        loading={loading}
        onMessageSend={onMessageSend}
        onSendClick={onSendClick}
        spinner={<Spinner/>}
        mainContentHeight={70}
      >
        <Header>
          <p>Welcome to support window!!</p>
          <hr/>
          <p>Here you can chat directly with moderators. They usually answer in a few hours.</p>
        </Header>
      </ChatWidget>
    </AppWrapper>
  );
}

export default App;
