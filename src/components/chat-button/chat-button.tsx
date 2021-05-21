import React, {FC, useEffect, useState} from 'react';
import {IconContainer, Wrapper, Circle} from "./chat-button.styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faTimes} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  open: boolean,
  dragging: boolean
}

const ChatButton: FC<IProps> = ({open, dragging}) => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(!animate);
  }, [open]);

  return (
    <Wrapper open={open} animate={animate}>
      <Circle open={open} dragging={dragging}/>
      <IconContainer>
        <FontAwesomeIcon onAnimationEnd={() => setAnimate(!animate)} className="icon" icon={open ? faTimes : faEnvelope}/>
      </IconContainer>
    </Wrapper>
  )
}

export default ChatButton;