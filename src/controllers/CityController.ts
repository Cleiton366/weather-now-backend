import { CityReposity } from "../repositories/CityRepository";
import { Request, Response } from 'express';

const cityRepository = new CityReposity();

export class CityController {

  async getCitiesWeather(req: Request, res: Response) {
    try {
      const { cities } = req.body;      
      const citiesWeather = await cityRepository.getCitiesWeather(cities);
      return res.status(200).json(citiesWeather);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getCity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const city = await cityRepository.getCity(id);
      res.status(200).json(city);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getCities(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const cities = await cityRepository.getCities(id);
      res.status(200).json(cities);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createCity(req: Request, res: Response) {
    try {
      const data = req.body;
      const city = await cityRepository.createCity(data);
      res.status(201).json(city);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteCity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await cityRepository.deleteCity(id);
      res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  
}
