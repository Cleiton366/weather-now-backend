import { Prisma } from "@prisma/client";
import { WeatherData } from "./WeatherData";

type City = Prisma.CityGetPayload<null>;

export interface CityDTO {
  id: string;
  lat: number;
  lon: number;
  name: string;
  userId: string;
  weather: WeatherData;
}