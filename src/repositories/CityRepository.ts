import { Prisma, PrismaClient } from '@prisma/client';
import { WeatherService } from '../services/WeatherService';
import { CityDTO } from '../interfaces/CityDTO';
import { GeoCodingService } from '../services/GeoCodingService';

const prisma = new PrismaClient();
const weatherService = new WeatherService();
const geoCodingService = new GeoCodingService();
type City = Prisma.CityGetPayload<null>;

export class CityReposity {

  async getCitiesWeather(cities: City[]): Promise<CityDTO[] | []> {
    try {
      const citiesWeather: CityDTO[] = await weatherService.getCitiesWeather(cities);
      return citiesWeather;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCity(id: string): Promise<City | null> {
    try {
      const city = await prisma.city.findUnique({ where: { id } });
      return city;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCities(id: string): Promise<City[]> {
    try {
      const cities = await prisma.city.findMany({
        where: {
          userId: id
        }
      });
      return cities;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createCity(data: City): Promise<City | null> {
    try {
      const cityData = await geoCodingService.getGeoCodingData(data.name);
      const city = await prisma.city.create({
        data: {
          name: data.name,
          country: cityData[0].country,
          lat: cityData[0].latitude,
          lon: cityData[0].longitude,
          userId: data.userId
        }
      });
      return city;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteCity(id: string): Promise<void> {
    try {
      const city = await prisma.city.findUnique({ where: { id } });
      await prisma.city.delete({ where: { id } });

      if (city) {
        const cities = await prisma.city.findMany({ where: { userId: city.userId } });
        if (cities.length === 0) {
          await prisma.city.create({
            data: {
              name: 'London',
              country: 'United Kingdom',
              lat: 51.507218,
              lon: -0.127586,
              userId: city.userId
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
