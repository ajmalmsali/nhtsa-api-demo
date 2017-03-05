import request from 'requestretry';
import Promise from 'bluebird';
import { nhtsa as config } from '../config.json';

class NHTSAService {
  constructor(year, manufacture, model) {
    this.year = year;
    this.manufacture = manufacture;
    this.model = model;
  }

  find() {
    const url = config.apiUrl +
              '/modelyear/' + this.year +
              '/make/' + this.manufacture +
              '/model/' + this.model +
              '?format=json';

    return request({
      url,
      json: true,
      fullResponse: false,
    }).then((response) => {
      if(response && response.Results) {
        return Promise.map(response.Results, (vehicle) => {
          //rename VehicleDescription to Description
          vehicle.Description = vehicle.VehicleDescription;
          delete vehicle.VehicleDescription
          return vehicle;
        }).then(() => {
          delete response.Message;
          return response; // we send the whole response back.
        })
      }
      return Promise.resolve({
        Count: 0,
        Results: []
      });
    });
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

}

export default NHTSAService;
