import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material';

const TaskForm = () => {

  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/api/tasks/${params.id}`);
    const data = await res.json();
    setTask(data);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const handleChange = (e) => setTask({...task, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (params.id) {
      try {
        await fetch(`http://localhost:4000/api/tasks/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch('http://localhost:4000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    navigate('/');
  };

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{
          backgroundColor: '#1e272e',
          padding: '1rem'
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            { params.id ? 'Edit Task' : 'Create Task' }
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='title'
                value={task.title}
                variant='filled'
                label='Write your title'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                name='description'
                value={task.description}
                variant='filled'
                label='Write your description'
                multiline
                rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <Button variant='contained' type='submit' disabled={
                !task.title || !task.description
              }>
                { loading ? (
                  <CircularProgress color='inherit' size={24} />
                ) : params.id ? 'Edit' : 'Create' }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
