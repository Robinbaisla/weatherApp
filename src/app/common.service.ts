import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  // getWeatherData(city: string) {
  //   return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=76c425f83d3dd4a696721e5d4d4cc3fe&units=metric');
  // }

   // getWeather(city: string): Observable<any> {
  //   const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //   return this.http.get(url);
  // }

  // getWeatherForecast(city: string): Observable<any> {
  //   const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //   return this.http.get(url);
  // }

  private apiKey: string = '76c425f83d3dd4a696721e5d4d4cc3fe'; // Replace with your actual API key
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';

 

  getWeather(city: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=76c425f83d3dd4a696721e5d4d4cc3fe&units=metric');
  }
  // getWeatherForecast( city:string){
  //   return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' +city+ '&appid=76c425f83d3dd4a696721e5d4d4cc3fe&units=metric');
  // }


  // getWeatherForecast(city: string): Observable<any[]> {
  //   const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
  //   return this.http.get(url).pipe(
  //     map((data: any) => this.extract5DayForecast(data))
  //   );
  // }
  getWeatherForecast(city: string): Observable<any[]> {
    const url = this.forecastUrl + '?q=' + city + '&appid=' + this.apiKey + '&units=metric';
    return this.http.get(url).pipe(
      map((data: any) => this.extract5DayForecast(data))
    );
  }
  

  private extract5DayForecast(data: any): any[] {
    const forecastList = data.list.filter((item: any, index: number, array: any[]) => {
      const currentDate = new Date(item.dt_txt).getDate();
      const previousDate = index > 0 ? new Date(array[index - 1].dt_txt).getDate() : null;
      return currentDate !== previousDate;
    });

    return forecastList;
  }

//  // current location function both
//   getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
//     // const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
//     // return this.http.get(url);
//     // Add reverse geocoding to get the city name
//     const reverseGeocodingUrl = `https://api.opencagedata.com/geocode/v1/json?key=${this.apiKey}&q=${lat}+${lon}&pretty=1`;
//     return this.http.get(reverseGeocodingUrl);
//   }

//   get5DayForecastByCoordinates(lat: number, lon: number): Observable<any[]> {
//     const url = `${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
//     return this.http.get(url).pipe(
//       map((data: any) => this.extract5DayForecast(data))
//     );
//   }
}
