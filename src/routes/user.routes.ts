import { Router } from 'express';
import AppDataSource from '../database';
import { User } from '../entities/User';

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
  res.send('List of users');
});

userRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const savedUser = await userRepository.save({ name, email, password });

  res.json({ savedUser });
});

userRoutes.put('/:id', (req, res) => {
  res.send('Update user');
});

userRoutes.delete('/:id', (req, res) => {
  res.send('Delete user');
});

export default userRoutes;
