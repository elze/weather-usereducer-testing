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
	
	// Do not call PUT here, this is only for the purpose to demonstrate a spy on axios.put in unit tests. 
	// This is not a good practice, because (a) reducer functions should not perform side effects, 
	// and (b) axios.put should be called with "await", but that would require making this function async, 
	// and it would make it tricky to call it from a reducer
	axios.put(`/api/tempUnit`, { temperatureUnit: tempUnit });
	return convertedForecast;	
  }
};

export default utils;