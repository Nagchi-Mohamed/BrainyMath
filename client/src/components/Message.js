// frontend/src/components/Message.js
import React from 'react';
import { Alert } from '@mui/material';

const Message = ({ severity = 'info', children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default Message;
