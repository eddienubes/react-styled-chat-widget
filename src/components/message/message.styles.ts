import styled from "styled-components";

interface IMessageContainer {
  author: boolean
}

const MessageHeading = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
`;

const MessageText = styled.p`
  font-size: 0.9rem;
  margin-top: 5px;
`;


const MessageContainer = styled.div<IMessageContainer>`
  background: ${props => props.author ? props.theme.primaryMessageBackground : props.theme.secondaryMessageBackground};
  width: 50%;
  border-radius: ${props => props.author ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
  word-break: break-word;
  padding: 6px 10px;
  animation: MessageContainer .35s ease-in-out;
  align-self: ${props => props.author ? 'flex-end' : 'flex-start'};
    
  div {
    margin-top: 2%;
    display: flex;
    justify-content: ${props => props.author ? 'flex-end' : 'flex-start'};
    align-items: center;
    text-overflow: ellipsis;
    flex-wrap: nowrap;
    gap: 5px;
    min-height: 20px;
    color: ${props => props.theme.infoColor};
    
    span {
      font-size: 0.65rem;
    }
    
    span:first-child {
      font-weight: lighter;
      font-style: italic;
      white-space: nowrap;
    }
  }
  
  ${MessageText} {
    color: ${props => props.author ? props.theme.primaryMessageTextColor : props.theme.secondaryAuthorNameColor};
  }
  
  ${MessageHeading} {
    color: ${props => props.author ? props.theme.primaryMessageTextColor : props.theme.secondaryMessageTextColor};
  }
  
  ${MessageText}, ${MessageHeading} {
    margin: 0;
  }
  
  @keyframes MessageContainer {
    0% {
      opacity: 0.2;
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;


export {
  MessageContainer,
  MessageHeading,
  MessageText
}