import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

const TaskList = () => {
  
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetch('http://localhost:4000/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      { tasks.map(task => (
        <Card
          style={{
            marginBottom: '.7rem',
            backgroundColor: '#1e272e',
            color: 'white'
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Typography>{ task.title }</Typography>
              <Typography>{ task.description }</Typography>
            </div>
            <div>
              <Button
                variant='contained'
                color='success'
                onClick={() => navigate(`/task/${task.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant='contained'
                color='error'
                style={{ marginLeft: '.5rem' }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
};

export default TaskList;
