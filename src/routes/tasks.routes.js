import { Router } from 'express';
const router = Router();

import { getAllTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/tasks.controller';

router.get('/', getAllTasks);

router.get('/:id', getTask);

router.post('/', createTask);

router.delete('/:id', deleteTask);

router.put('/:id', updateTask);

export default router;