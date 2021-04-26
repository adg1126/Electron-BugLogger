import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AddLogItem from './AddLogItem';
import LogItem from './LogItem';

const App = () => {
  const [logs, setLogs] = useState([
    {
      _id: 1,
      text: 'This is log one',
      priority: 'low',
      user: 'Diane',
      created: new Date().toString()
    },
    {
      _id: 2,
      text: 'This is log two',
      priority: 'moderate',
      user: 'John',
      created: new Date().toString()
    },
    {
      _id: 3,
      text: 'This is log three',
      priority: 'high',
      user: 'Kate',
      created: new Date().toString()
    }
  ]);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  const addItem = item => {
    if (!!item.text && !!item.user && !!item.priority) {
      setLogs([...logs, item]);
      showAlert('Log added');
    } else {
      showAlert('Please enter all fields', 'danger');
    }
  };

  const deleteItem = _id => {
    setLogs(logs.filter(item => item._id !== _id));
    showAlert('Log Removed');
  };

  function showAlert(message, variant = 'success', seconds = 3000) {
    setAlert({
      show: true,
      message,
      variant
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        variant: 'success'
      });
    }, seconds);
  }

  return (
    <Container>
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <LogItem log={log} key={log._id} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
