import { Prisma } from "@prisma/client";
import { WeatherData } from "../interfaces/WeatherData";
import { CityDTO } from "../interfaces/CityDTO";
import { UserRepository } from "../repositories/UserRepository";

type City = Prisma.CityGetPayload<null>;
const userRepository = new UserRepository();

export class WeatherService {

	async getCityWeather(lat: number, lon: number, userUnit : string): Promise<any> {
		const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=${userUnit}`);
		return await response.json();
	}

	async getCitiesWeather(cities: City[]): Promise<CityDTO[] | []> {
		const userUnit = await userRepository.getUserUnit(cities[0].userId) || 'metric';
		var citiesWeather : CityDTO[] = [];		
		for (const city of cities) {
			const weather : WeatherData = await this.getCityWeather(city.lat, city.lon, userUnit);
			citiesWeather.push({
				id: city.id,
				lat: city.lat,
				lon: city.lon,
				name: city.name,
				country: city.country,
				userId: city.userId,
				weather
			});
		}
		return citiesWeather;
	}
}