import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import tasksRouter from './routes/tasks.routes';

const app = express();
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/tasks', tasksRouter);

app.use((err, req, res, next) => {
  res.json({
    message: err.message
  });
});

app.listen(app.set('port'), () => console.log('Server on Port', app.get('port')));