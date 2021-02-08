import './App.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import axios from 'axios';

import utils from './utils';

function reducer(state, action) {
	//console.log(`reducer: action.type = ${action.type}`);
  switch (action.type) {
	  case 'setTemperatureUnit': 
		if (action.unit !== state.temperatureUnit) {
			return {forecast: utils.getForecastInCurrentUnits(state.forecast, action.unit), temperatureUnit: action.unit};
		}
		return state;
	  case 'setForecast': 	  
		//let newState = {...state, forecast: getForecastInCurrentUnits(action.forecast, state.temperatureUnit) };
		let newState = {...state, forecast: action.forecast };
		return newState;
    default:
      throw new Error();
  }
}

function getButtonVariant(state, tempUnit) {
	if (state.temperatureUnit === tempUnit) 
		return 'info';
	return 'light';
}

function App({ forecastId }) {
	const initialState = {forecast: {}, temperatureUnit: "F"};
	const [state, dispatch] = React.useReducer(reducer, initialState);
  
	React.useEffect(() => {    
		async function getNewForecast(i) {
			const result = await axios.get(`/api/forecasts`);
			//console.log(`getNewForecast(${i}) result = ${JSON.stringify(result)}`);
			const forecasts = result.data;
			//console.log(`getNewForecast: i = ${i}`);
			dispatch({type: 'setForecast', forecast: forecasts[i]})
		}
		console.log(`useEffect is running`);
		getNewForecast(forecastId);

		return () => {
			console.log('Alert removed');
		};

	}, [forecastId]);
	
  return (
     <Alert variant="info" className="weather-alert">
	  <Alert.Heading className="weather-title text-center">My Austin weather alert</Alert.Heading>
	  <div className="weather-title">
	  <Button onClick={() => dispatch({type: 'setTemperatureUnit', unit: 'F'})} variant={getButtonVariant(state, "F")}>F</Button>
	  <Button onClick={() => dispatch({type: 'setTemperatureUnit', unit: 'C'})} variant={getButtonVariant(state, "C")}>C</Button>
	  </div>
		<div className="weather-title">
		<ListGroup className="weather-alert">
		  <ListGroup.Item><b>Weather</b>: <i>{state.forecast.weather}</i></ListGroup.Item>
		  <ListGroup.Item><b>Rain chance</b>: <i>{state.forecast.rainchance}</i></ListGroup.Item>
		  <ListGroup.Item><b>Temperature</b>: <i>{state.forecast.temperature}</i></ListGroup.Item>
		</ListGroup>		
		</div>
	</Alert>
  );
}

export default App;
