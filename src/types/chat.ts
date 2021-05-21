import React, {SetStateAction} from "react";

export type Corners = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type Coordinates = { x: number, y: number };

export type DefaultPosition = {
  [key in Corners]: Coordinates
}

export type Distances = {
  [key: string]: { distance: number, coordinates: { x: number, y: number } }
}

export type Message = {
  id: number | string,
  isPrimary: boolean,
  message: string,
  date: Date | string,
  sent: boolean
}

export type MessageSendHandler = (
  currentID: number | string,
  setDeliveryStatus: () => void) => void;

export type SendClickHandler = (message: string) => void


export interface IChatWidget {
  indent?: number,
  size?: number,
  minSize?: number,
  mainContentWidth?: number,
  chatOffset?: number,
  messages: Message[],
  loading?: boolean,
  onMessageSend: MessageSendHandler
  onSendClick: SendClickHandler,
  primaryColor?: string,
  secondaryColor?: string,
  defaultPosition?: Corners,
  mainContentHeight?: number,
  isDraggable?: boolean,
  spinner: JSX.Element,
  primary?: string,
  textHoverSize?: string,
  secondary?: string,
  primaryAuthorNameColor?: string,
  secondaryAuthorNameColor?: string
  primaryMessageBackground?: string,
  secondaryMessageBackground?: string,
  primaryMessageTextColor?: string,
  secondaryMessageTextColor?: string,
  buttonBackground?: string,
  buttonTextColor?: string
  placeHolder?: string
  greeting?: string,
  sendButton?: JSX.Element,

}
