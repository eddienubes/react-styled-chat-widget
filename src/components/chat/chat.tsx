import React, {FC, RefObject} from 'react';
import ChatButton from "../chat-button";
import Draggable, {DraggableEventHandler} from 'react-draggable';
import ChatMainContent from "../chat-main-content";
import {Message, MessageSendHandler} from "../../types/chat";
import './chat.css';

interface IProps {
  open: boolean,
  dragging: boolean,
  onStop: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  position: { x: number, y: number },
  chatPosition: { x: number, y: number },
  width: number,
  chatContainerRef: RefObject<HTMLDivElement>,
  onSendClick: (message: string) => void,
  onMessageSend?: MessageSendHandler
  messages: Message[],
  loading?: boolean,
  size: number,
  minSize: number,
  setInitialChatPosition: Function,
  height: number,
  isDraggable: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  spinner?: JSX.Element,
  onStartHandler: DraggableEventHandler,
  placeholder?: string,
  greeting?: string,
  sendButton?: JSX.Element
}

const Chat: FC<IProps> = (
  {
    size,
    minSize,
    open,
    dragging,
    onStop,
    position,
    onDrag,
    chatPosition,
    width,
    chatContainerRef,
    onSendClick,
    onMessageSend,
    messages,
    loading,
    setInitialChatPosition,
    height,
    isDraggable,
    setOpen,
    children,
    spinner,
    onStartHandler,
    placeholder,
    greeting,
    sendButton
  }) => {
  const draggableRef = React.useRef<HTMLDivElement>(null);


  return (
    <>
      <Draggable
        position={position}
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        grid={[1, 1]}
        scale={1}
        onStop={onStop}
        nodeRef={draggableRef}
        onDrag={onDrag}
        onStart={onStartHandler}
      >
        <div onClick={() => !isDraggable ? setOpen(!open) : null} ref={draggableRef} className="chat-button-wrapper handle" style={{
          transition: !dragging ? '.3s ease-in-out' : 'none',
          width: size + 'vw',
          height: size + 'vw',
          minWidth: minSize + 'px',
          minHeight: minSize + 'px',
        }}>
          <ChatButton open={open} dragging={dragging}/>
        </div>
      </Draggable>
      <ChatMainContent
        sendButton={sendButton}
        placeholder={placeholder}
        greeting={greeting}
        spinner={spinner}
        height={height}
        messages={messages}
        loading={loading}
        onMessageSend={onMessageSend}
        onSendClick={onSendClick}
        chatContainerRef={chatContainerRef}
        open={open}
        top={chatPosition.y}
        left={chatPosition.x}
        width={width}
        setInitialChatPosition={setInitialChatPosition}
      >
        {children}
      </ChatMainContent>
    </>
  );
}

export default Chat;