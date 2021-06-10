import React, {
  ChangeEventHandler,
  FC,
  FormEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback, useEffect, useRef, useState,
} from 'react';

import {
  ChatContainer,
  DefaultMessage,
  InputContainer,
  MainContentWrapper,
  MessagesContainer,
  MessagesReverseContainer,
  PlaceHolderButton
} from "./chat-main-content.styles";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Message as IMessage, MessageSendHandler} from '../../types/chat.types';
import Message from "../message";

interface IProps {
  open: boolean,
  top: number,
  left: number,
  width: number,
  chatContainerRef: RefObject<HTMLDivElement>,
  onSendClick: (message: string) => void,
  onMessageSend?: MessageSendHandler
  messages: IMessage[],
  loading?: boolean,
  setInitialChatPosition: Function,
  height: number,
  spinner?: JSX.Element,
  placeholder?: string,
  greeting?: string,
  sendButton?: JSX.Element,
  backgroundClassName?: string,
  inputContainerClassName?: string,
}

const ChatMainContent: FC<IProps> = (
  {
    open,
    top,
    left,
    width,
    chatContainerRef,
    onSendClick,
    onMessageSend,
    messages,
    loading = false,
    setInitialChatPosition,
    height,
    children,
    spinner,
    greeting,
    placeholder,
    sendButton,
    backgroundClassName,
    inputContainerClassName
  }) => {
  const [message, setMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSubmitHandler = useCallback((e: Event | FormEvent) => {
    e.preventDefault();
    onSendClick(message);
    setMessage('');
    console.log('SUBMIT!');
  }, [message, onSendClick]);

  const onKeyDownHandler = useCallback<KeyboardEventHandler<HTMLFormElement>>((e) => {
    if (e.key === 'Enter' && !e.shiftKey && message) {
      console.log('submit');
      e.preventDefault();
      e.currentTarget.dispatchEvent(new Event('submit', {cancelable: true}));
    } else if (e.key === 'Enter' && !e.shiftKey) {
      console.log('submit');
      e.preventDefault();
      formRef.current?.reportValidity();
      return;
    }
  }, [message]);

  useEffect(() => {
    const node = scrollRef.current;
    node?.scrollTo(0, node.scrollHeight);
    console.log(node!.scrollHeight);
  }, [messages]);

  useEffect(() => {
    setInitialChatPosition();
  }, [setInitialChatPosition]);

  useEffect(() => {
    if (!formRef.current) return;
    const formNode = formRef.current;
    formNode!.addEventListener('submit', onSubmitHandler);
    return () => {
      formNode!.removeEventListener('submit', onSubmitHandler);
    }
  }, [formRef, onSubmitHandler]);

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  }


  return (
    <ChatContainer top={top} left={left} width={width} ref={chatContainerRef} open={open} height={height}>
      <MainContentWrapper>
        {children}
        <MessagesReverseContainer>
          <MessagesContainer empty={messages.length === 0} ref={scrollRef} className={backgroundClassName}>
            {loading && spinner}
            {messages.length === 0 && !loading ?
              <DefaultMessage>{greeting || 'Feel free to ask anything you want to!'}</DefaultMessage> : null}
            {
              messages.map(m => {
                return <Message
                  author={m.author}
                  sent={m.sent}
                  onMessageSend={onMessageSend}
                  key={m.id}
                  isPrimary={m.isPrimary}
                  message={m.message}
                  date={m.date}
                  id={m.id}/>
              })
            }
          </MessagesContainer>
        </MessagesReverseContainer>
        {
          !loading &&
          <InputContainer className={inputContainerClassName}>
              <form ref={formRef} onSubmit={onSubmitHandler} onKeyDown={onKeyDownHandler}>
                  <textarea
                      name="message"
                      required={true}
                      onChange={onChangeHandler}
                      value={message}
                      placeholder={placeholder || "What can I help you with?"}
                  />

                {sendButton || <PlaceHolderButton type="submit"><FontAwesomeIcon icon={faPaperPlane}/></PlaceHolderButton>}
              </form>
          </InputContainer>
        }
      </MainContentWrapper>
    </ChatContainer>
  );
}

export default ChatMainContent;