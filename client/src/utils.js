import axios from 'axios';

// utils.js
const utils = {
  getForecastInCurrentUnits: (forecast, tempUnit) => {
	  //console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; forecast = ${JSON.stringify(forecast)} tempUnit = ${tempUnit} `);
	let convertedForecast;
	if (tempUnit === "C") {
		const temperature = (forecast.temperature - 32) / 9 * 5;		
		convertedForecast = {...forecast, temperature: temperature.toFixed()};
		//console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; tempUnit = ${tempUnit} returning convertedForecast = ${JSON.stringify(convertedForecast)}  `);
	}	
	else {
		const temperature = forecast.temperature / 5 * 9 + 32;		
		convertedForecast = {...forecast, temperature: temperature.toFixed()};
		//console.log(`^^^^^^^^^^^^^^ utils.getForecastInCurrentUnits ; tempUnit = ${tempUnit} returning convertedForecast = ${JSON.stringify(convertedForecast)}  `);
	}		
	axios.put(`/api/tempUnit`, { temperatureUnit: tempUnit });
	return convertedForecast;	
  }
};

export default utils;