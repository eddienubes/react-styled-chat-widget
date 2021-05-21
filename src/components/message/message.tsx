import React, {FC, useEffect, useState} from 'react';
import {MessageContainer, MessageHeading, MessageText} from "./message.styles";
import {Message as IMessage, MessageSendHandler} from "../../types/chat";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckDouble} from "@fortawesome/free-solid-svg-icons";
import indicator from '../../assets/images/message.svg';

interface IProps extends IMessage {
  onMessageSend?: MessageSendHandler
}

const Message: FC<IProps> = ({id, isPrimary, message, date, onMessageSend, sent}) => {
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
      <MessageHeading>{isPrimary ? 'You' : 'Cherries By'}</MessageHeading>
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