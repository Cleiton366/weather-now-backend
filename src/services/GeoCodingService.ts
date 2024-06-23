import NodeGeocoder from 'node-geocoder';

export class GeoCodingService {
  async getGeoCodingData(city: string): Promise<any> {
    const geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: process.env.GOOGLE_MAPS_API_KEY
    });

    const cityData = await geocoder.geocode(city);
    return cityData;
  }
}