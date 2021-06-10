import React, {FC, useEffect, useState} from 'react';
import {MessageContainer, MessageHeading, MessageText} from "./message.styles";
import {Message as IMessage, MessageSendHandler} from "../../types/chat.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import indicator from '../../assets/images/message.svg';
import {faCheckDouble} from "@fortawesome/free-solid-svg-icons";


interface IProps extends IMessage {
  onMessageSend?: MessageSendHandler,
  author: string
}

const Message: FC<IProps> = ({id, isPrimary, message, date, onMessageSend, sent, author}) => {
  const [isSent, setSent] = useState<boolean>(sent);

  useEffect(() => {
    if (onMessageSend) {
      onMessageSend(id, () => setSent(true));
    }
    else {
      setSent(true);
    }
  }, [onMessageSend, id]);

  return (
    <MessageContainer author={isPrimary}>
      <MessageHeading>{isPrimary ? 'You' : author}</MessageHeading>
      <MessageText>{message}</MessageText>
      <div>
        <span>{new Date(date).toDateString() + ' ' + new Date(date).toLocaleTimeString()}
        </span>
        {
          isPrimary ?
            <span>
              {
                isSent ? <FontAwesomeIcon icon={faCheckDouble}/> : <img src={indicator} alt="message-indicator"/>
              }
            </span> : null
        }
      </div>
    </MessageContainer>
  )
}

export default Message;