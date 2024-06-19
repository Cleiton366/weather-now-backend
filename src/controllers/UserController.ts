import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

export class UserController {

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.getUser(id);
      res.status(200).json(user);
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = await userRepository.createUser(data);
      res.status(201).json(user);
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.deleteUser(id);
      res.status(204).json(user);
    } catch (error : any) {
      res.status(500).json({ message: error.message });
    }
  }
}