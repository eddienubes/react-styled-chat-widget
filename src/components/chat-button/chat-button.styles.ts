import styled from "styled-components";

interface IWrapper {
  open: boolean,
  animate: boolean
}

interface ICircle {
  open: boolean
  dragging: boolean
}

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${props => props.theme.buttonTextColor};
  font-size: 1.5rem;
  transition: .2s ease-in-out;
`;

const Circle = styled.div<ICircle>`
  position: absolute;
  visibility: ${props => props.dragging ? 'visible' : 'hidden'};
  animation: ${props => props.dragging ? 'Circle 1.4s infinite ease-in-out' : 'none'};
  border: 1px solid white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  @keyframes Circle {
    0% {
      width: 0;
      height: 0;
    }
    80% {
      opacity: .6;
    }
    100% {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;

const Wrapper = styled.div<IWrapper>`
  --hover-transform-value: -5%;
  --hover-font-size: 1.8rem;
  background: ${props => props.theme.buttonBackground};
  width: 100%;
  height: 100%;
  transition: .2s ease-in-out;
  border-radius: 50%;
  overflow: hidden;

  &:hover ${IconContainer} {
    font-size: var(--hover-font-size);
  }

  ${IconContainer} {
    ${props => props.open ? `font-size: var(--hover-font-size);` : null};

    .icon {
      animation: ${props => props.animate ? 'IconContainer .2s ease-in-out' : 'none'};

      @keyframes IconContainer {
        0% {
          transform: scale(0) rotate(-90deg);
        }
        100% {
          transform: scale(1) rotate(0);
        }
      }
    }
  }
`;

export {
  Wrapper,
  IconContainer,
  Circle
}