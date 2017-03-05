import request from 'requestretry';
import Promise from 'bluebird';
import { nhtsa as config } from '../config.json';

class NHTSAService {
  constructor(year, manufacture, model) {
    this.year = year;
    this.manufacture = manufacture;
    this.model = model;
  }

  static findRating(vehicle) {
    const url = `${config.apiUrl}/VehicleId/${vehicle.VehicleId}?format=json`;

    return request({
      url,
      json: true,
      fullResponse: false,
    }).then((response) => {
      // attach crashrating to vehicle obj
      const vehicleObj = vehicle;
      vehicleObj.CrashRating = response.Results[0].OverallRating;
      return vehicleObj;
    });
  }

  find() {
    const url = `${config.apiUrl}/modelyear/${this.year}/make/${this.manufacture}/model/${this.model}?format=json`;

    return request({
      url,
      json: true,
      fullResponse: false,
    }).then((response) => {
      if (response && response.Results) {
        return Promise.map(response.Results, (vehicle) => {
          // rename VehicleDescription to Description
          const vehicleObj = vehicle;
          vehicleObj.Description = vehicle.VehicleDescription;
          delete vehicleObj.VehicleDescription;
          return vehicleObj;
        }).then(() => {
          const newResponse = response;
          delete newResponse.Message;
          return newResponse; // we send the whole response back.
        });
      }
      return Promise.resolve({
        Count: 0,
        Results: [],
      });
    });
  }
}

export default NHTSAService;
