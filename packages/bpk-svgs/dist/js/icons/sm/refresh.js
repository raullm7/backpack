import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.5 8.5l-1.2-4.4c-.1-.5-.8-.7-1.2-.3l-.9.9C11.1 3.6 9.6 3 8 3s-3.1.6-4.2 1.8C2.6 5.9 2 7.4 2 9s.6 3.1 1.8 4.2C4.9 14.4 6.4 15 8 15s3.1-.6 4.2-1.8c.4-.4.4-1 0-1.4s-1-.4-1.4 0c-1.5 1.5-4.1 1.5-5.7 0C4.4 11.1 4 10.1 4 9s.4-2.1 1.2-2.8C5.9 5.4 6.9 5 8 5s2.1.4 2.8 1.2l-.9.9c-.4.4-.2 1 .3 1.2l4.4 1.2c.5 0 1-.4.9-1z" /></svg>;
  }

}