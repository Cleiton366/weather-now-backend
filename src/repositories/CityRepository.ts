import { Prisma, PrismaClient } from '@prisma/client';
import { WeatherService } from '../services/WeatherService';
import { CityDTO } from '../interfaces/CityDTO';

const prisma = new PrismaClient();
const weatherService = new WeatherService();
type City = Prisma.CityGetPayload<null>;

export class CityReposity {

  async getCitiesWeather(cities: City[]) : Promise<CityDTO[] | []> {
    try {
      const citiesWeather : CityDTO[] = await weatherService.getCitiesWeather(cities);
      return citiesWeather;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  async getCity(id : string) : Promise<City | null> {
    try {
      const city = await prisma.city.findUnique({where: {id}});
      return city;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCities(id: string) : Promise<City[]> {
    try {
      const cities = await prisma.city.findMany({where: {
        userId: id
      }});
      return cities;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createCity(data: City) : Promise<City | null> {
    try {
      const city = await prisma.city.create({data});
      return city;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
 
  async deleteCity(id: string) : Promise<void> {
    try {
      await prisma.city.delete({where: {id}});
    } catch (error) {
      console.log(error);
    }
  }
}
