// @flow

import React from 'react'
import styled from "styled-components";

const alert_message = styled.div`
  .message {
  margin: 0;
}
`;
type AlertProps = {
  show: boolean,
  message: string,
}


const Alert = ({ show, message }: AlertProps) => {
  return  <>{
  show && (
    <p role="alert" data-testid="Alert" className={alert_message}>
      {message}
    </p>)
    }
</>
}

export default Alert
