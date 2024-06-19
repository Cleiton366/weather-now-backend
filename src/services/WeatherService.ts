import { Prisma } from "@prisma/client";
import { WeatherData } from "../interfaces/WeatherData";
import { CityDTO } from "../interfaces/CityDTO";

type City = Prisma.CityGetPayload<null>;

export class WeatherService {

	async getCityWeather(lat: number, lon: number): Promise<any> {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
		return await response.json();
	}

	async getCitiesWeather(Cities: City[]): Promise<CityDTO[] | []> {
		var citiesWeather : CityDTO[] = [];		
		for (const city of Cities) {
			const weather : WeatherData = await this.getCityWeather(city.lat, city.lon);
			citiesWeather.push({
				id: city.id,
				lat: city.lat,
				lon: city.lon,
				name: city.name,
				userId: city.userId,
				weather
			});
		}
		return citiesWeather;
	}
}