import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AddLogItem from './AddLogItem';
import LogItem from './LogItem';
import { ipcRenderer } from 'electron';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  useEffect(() => {
    ipcRenderer.send('logs:load');
    ipcRenderer.on('logs:get', (e, logs) => {
      setLogs(JSON.parse(logs));
    });
    ipcRenderer.on('logs:clear', () => {
      setLogs([]);
      showAlert('Logs Cleared');
    });
  }, []);

  const addItem = item => {
    if (!!!item.text || !!!item.user || !!!item.priority) {
      showAlert('Please enter all fields', 'danger');
      return false;
    }

    // setLogs([...logs, item]);
    ipcRenderer.send('logs:add', item);
    showAlert('Log added');
  };

  const deleteItem = _id => {
    // setLogs(logs.filter(item => item._id !== _id));
    ipcRenderer.send('logs:delete', _id);
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
