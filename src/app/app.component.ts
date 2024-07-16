import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather';
  city: string = '';
  weatherData: any = [];
  weatherForecast: any = [];
  showForecast: boolean = false;
  showWeatherData: boolean = false;
  name: string = '';
  description: string = '';
  temperature: any;
  wind: any;
  humidity: any;
  forecastDescription: any
  forecast: any;

  constructor(private service: CommonService) {

  }
  ngOnInit(): void {
  }

  searchWeather() {
    this.service.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.showForecast = true;
      this.name = this.weatherData?.name;
      this.description = this.weatherData?.weather[0]?.description;
      this.temperature = this.weatherData?.main.temp;
      this.wind = this.weatherData?.wind.speed;
      this.humidity = this.weatherData?.main.humidity;
      this.showWeatherData = true;

    }, error => {
      // Handle errors
      console.error('Error fetching weather data:', error);
      this.showWeatherData = false;
    });

    this.service.getWeatherForecast(this.city).subscribe(data => {
      this.weatherForecast = data;
      console.log(this.weatherForecast);
      // this.forecastDescription = this.forecast.weather[0].description
    });
  }
  
  getCurrentDateTime(): string {
    const currentDateTime = new Date();
    return currentDateTime.toDateString() + ' ' + currentDateTime.toLocaleTimeString();
  }

  getNextFiveDaysForecast(): any[] {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Filter out today's forecast and take the next 5 days
    return this.weatherForecast.filter((forecast: { dt_txt: string | number | Date; }) => {
      const forecastDate = new Date(forecast.dt_txt);
      return forecastDate > currentDate;
    }).slice(1, 6);
  }
  // getCurrentLocationWeather(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         this.service.getWeatherByCoordinates(latitude, longitude).subscribe(
  //           (data) => {
  //             this.handleWeatherResponse(data);
  //           },
  //           (error) => {
  //             console.error('Error fetching current location weather:', error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.error('Error getting current location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by your browser.');
  //   }
  // }
}
