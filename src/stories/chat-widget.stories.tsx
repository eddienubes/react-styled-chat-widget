import React from "react";
import {storiesOf} from "@storybook/react";
import App from "./example-page/App";

const stories = storiesOf('App test', module);

stories.add('App', () => {
  return (<App/>);
});