import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import Chat from "../../components/chat";
import {DraggableData, DraggableEventHandler} from "react-draggable";
import {Coordinates, Corners, DefaultPosition, IChatWidget, Distances} from "../../types/chat";
import {ThemeProvider, DefaultTheme} from "styled-components";

const ChatContainer: FC<IChatWidget> = (
  {
    indent = window.innerWidth * 0.015,
    size = 3,
    minSize = 60,
    mainContentWidth = 25,
    mainContentHeight = 60,
    chatOffset = 10,
    messages,
    loading,
    onMessageSend,
    onSendClick,
    defaultPosition = 'bottomRight',
    isDraggable = true,
    children,
    spinner,
    placeHolder,
    greeting,
    sendButton
  }
) => {
  const currentButtonSize = useMemo(() => {
    const width = window.innerWidth * size / 100;
    return width <= minSize ? minSize : width;
  }, [size, minSize]);


  const corners = useMemo<DefaultPosition>(() => {
    return {
      topLeft: {y: indent, x: indent},
      topRight: {y: indent, x: document.documentElement.clientWidth - currentButtonSize - indent},
      bottomLeft: {y: document.documentElement.clientHeight - currentButtonSize - indent, x: indent},
      bottomRight: {
        y: document.documentElement.clientHeight - currentButtonSize - indent,
        x: document.documentElement.clientWidth - currentButtonSize - indent
      }
    }
  }, [indent, currentButtonSize]);


  const calculateChatPosition = useCallback((defaultPosition: Corners): Coordinates => {
    const chatOffsets = {
      topLeft: {y: corners.topLeft.y + currentButtonSize + chatOffset, x: indent},
      topRight: {
        y: corners.topRight.y + currentButtonSize + chatOffset,
        x: corners.topRight.x + currentButtonSize - chatContainerRef.current!.clientWidth
      },
      bottomLeft: {y: corners.bottomLeft.y - chatContainerRef.current!.clientHeight - indent, x: indent},
      bottomRight: {
        y: corners.bottomLeft.y - chatContainerRef.current!.clientHeight - indent,
        x: corners.topRight.x + currentButtonSize - chatContainerRef.current!.clientWidth
      }
    }
    return chatOffsets[defaultPosition];
  }, [chatOffset, currentButtonSize, corners, indent]);


  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Coordinates>(corners[defaultPosition]);
  const [chatPosition, setChatPosition] = useState<Coordinates>({x: 0, y: 0});
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [theme] = useState<DefaultTheme>({
    primary: 'hsl(289, 100%, 20%)',
    textHoverSize: '1.2rem',
    secondary: '#e3e3e3',
    primaryMessageTextColor: 'white',
    secondaryMessageTextColor: 'black',
    primaryAuthorNameColor: 'white',
    secondaryAuthorNameColor: 'black',
    primaryMessageBackground: 'hsl(289, 100%, 20%)',
    secondaryMessageBackground: 'white',
    buttonBackground: 'hsl(289, 100%, 20%)',
    buttonTextColor: 'white',
    infoColor: '#bfbfbf'
  });

  const getDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  const getClosestCorner = useCallback((data: DraggableData): Corners => {
    const center = {
      x: data.x + (data.node.clientWidth / 2),
      y: data.y + (data.node.clientHeight / 2)
    }

    const distances: Distances = {
      topLeft: {
        distance: getDistance(corners.topLeft.x, corners.topLeft.y, center.x, center.y),
        coordinates: corners.topLeft
      },
      topRight: {
        distance: getDistance(corners.topRight.x, corners.topRight.y, center.x, center.y),
        coordinates: corners.topRight
      },
      bottomLeft: {
        distance: getDistance(corners.bottomLeft.x, corners.bottomLeft.y, center.x, center.y),
        coordinates: corners.bottomLeft
      },
      bottomRight: {
        distance: getDistance(corners.bottomRight.x, corners.bottomRight.y, center.x, center.y),
        coordinates: corners.bottomRight
      }
    }

    const sorted = Object.keys(distances).sort((a, b) => distances[a].distance - distances[b].distance);
    return sorted[0] as Corners;
  }, [corners]);

  const onStopHandler: DraggableEventHandler = (event, data) => {
    const nearestSide = getClosestCorner(data);

    setDragging(false);

    if (!dragging) {
      setOpen(!open);
    }
    if (dragging) {
      if (window.innerWidth <= 400) {
        setChatPosition({x: 0, y: (window.innerWidth / 2)});
      } else {
        setChatPosition(calculateChatPosition(nearestSide as Corners));
      }
      setPosition(corners[nearestSide]);
    }
  }

  const onDragHandler: DraggableEventHandler = (event, data) => {
      setDragging(true);
  }

  const setInitialChatPosition = useCallback(
    () => setChatPosition(window.innerWidth <= 400 ? {x: 0, y: (window.innerWidth / 2)} : calculateChatPosition(defaultPosition)),
    [calculateChatPosition, defaultPosition]);

  const onStartHandler: DraggableEventHandler = (event, data) => {
    if (!isDraggable) return false;
  }

  return (
    <ThemeProvider theme={theme}>
      <Chat
        sendButton={sendButton}
        greeting={greeting}
        placeholder={placeHolder}
        onStartHandler={onStartHandler}
        spinner={spinner}
        height={mainContentHeight}
        messages={messages}
        loading={loading}
        onMessageSend={onMessageSend}
        onSendClick={onSendClick}
        open={open}
        onDrag={onDragHandler}
        onStop={onStopHandler}
        position={position}
        dragging={dragging}
        chatPosition={chatPosition}
        width={mainContentWidth}
        chatContainerRef={chatContainerRef}
        size={size}
        minSize={minSize}
        setInitialChatPosition={setInitialChatPosition}
        isDraggable={isDraggable}
        setOpen={setOpen}
      >
        {children}
      </Chat>
    </ThemeProvider>
  )
}

export default ChatContainer;