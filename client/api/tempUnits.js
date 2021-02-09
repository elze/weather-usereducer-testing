module.exports = (req, res) => {
	console.log(`tempUnits.body: req.body = ${JSON.stringify(req.body)}`);	
	console.log(`tempUnits.temperatureUnit: req.temperatureUnit = ${JSON.stringify(req.temperatureUnit)}`);	
	const tempUnit = req.body.temperatureUnit;
    res.send({ temperatureUnit: tempUnit });
}
