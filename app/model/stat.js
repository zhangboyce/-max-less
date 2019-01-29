'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StatSchema = new Schema({
      shopId: { type: String },
      date: { type: String },
      salesVolume: { type: Number },
      salesNumber: { type: Number },
      firstOrderTime: { type: Date },
      lastOrderTime: { type: Date },
      weather_highestTemperature: { type: Number },
      weather_minimumTemperature: { type: Number },
      weather_weather: { type: String },
      weather_windDirection: { type: String },
      weather_windPower: { type: String },
      createDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Stat', StatSchema, null, { cache: false });
};
