import styled from "styled-components";

interface IChatContainer {
  top: number,
  left: number,
  width: number,
  open: boolean,
  height: number
}

const ChatContainer = styled.div<IChatContainer>`
  position: fixed;
  transform: translate(${props => props.left + 'px'}, ${props => props.top + 'px'}) ${props => props.open ? 'scale(1)' : 'scale(0.7)'};
  display: flex;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  opacity: ${props => props.open ? 1 : 0};
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;
  width: ${props => props.width}vw;
  height: ${props => props.height}vh;
  transition: .2s ease-in-out;
  
  @media (max-width: 400px) {
    & {
      width: 100%;
      min-width: 100%;
    }
  }
`;


const MainContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.secondary};
  border-radius: 17px;
  justify-content: flex-start;
  overflow: hidden;
  height: 100%;
`;

interface IMessagesContainer {
  empty: boolean
}

const MessagesContainer = styled.div<IMessagesContainer>`
  width: 100%;
  height: 100%;
  padding: 2% 1%;
  display: flex;
  flex-direction: ${props => props.empty ? 'column': 'column'};
  align-items: center;
  gap: 10px;
  overflow-x: hidden;
  box-sizing: border-box;
  flex-wrap: nowrap;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 4.5px;
    padding: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 30px;
  }
`;

const MessagesReverseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: nowrap;
  min-height: 30vh;
`;

const PlaceHolderButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  transition: .2s ease-in-out;
  cursor: pointer;
  background: none;
  line-height: 10px;
  vertical-align: middle;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.8);
  }
`;

const InputContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${props => props.theme.primary};
  height: auto;
  box-shadow: 0 -3px 10px -5px black;
  z-index: 2;
  
  form {
    padding: 3%;
    width: 100%;
    display: flex;
    gap: 2%;
    height: auto;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
    width: 100%;
    padding: 0;
    min-height: 40px;
    height: auto;
    margin: 0;
    border: none;
    background: ${props => props.theme.secondary};
    
    &::-webkit-scrollbar {
      width: 5px;
      cursor: pointer;
    }

    ::-webkit-scrollbar-track {
      background-color: ${props => props.theme.secondary};
      width: 1px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background-color: #a5a5a5;
      width: 2px;
    }

    &:focus-visible {
      border: none;
      outline: none;
    }
  }

  @keyframes InputContainer {
    0% {
      opacity: 0.1;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const DefaultMessage = styled.p`
  text-align: center;
  color: #878787;
  letter-spacing: 1.5px;
  font-size: 0.6rem;
  font-style: italic;
`

export {
  ChatContainer,
  InputContainer,
  MessagesContainer,
  MainContentWrapper,
  DefaultMessage,
  MessagesReverseContainer,
  PlaceHolderButton
}