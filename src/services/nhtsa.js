import request from 'requestretry';
import { nhtsa as config } from '../config.json';
import Promise from 'bluebird';

class NHTSAService {
  constructor(year, manufacture, model) {
    this._year = year;
    this._manufacture = manufacture;
    this._model = model
  }

  find(){
    let url = config.apiUrl +
              '/modelyear/' + this._year +
              '/make/' + this._manufacture +
              '/model/' + this._model +
              '?format=json';

    return request({
      url: url,
      json: true,
      fullResponse: false
    }).then((response) => {

      if(response && response.Results) {

        return Promise.map(response.Results, (vehicle) => {

          //rename VehicleDescription to Description
          vehicle.Description = vehicle.VehicleDescription;
          delete vehicle.VehicleDescription

          return vehicle;
        }).then(() => {

          delete response.Message;
          return response; //we send the whole response back.

        })
      } else {
        return Promise.resolve({
          Count: 0,
          Results: []
        })
      }
    })
  }

  findRating(vehicle){

    let url = config.apiUrl +
              '/VehicleId/' + vehicle.VehicleId +
              '?format=json';

    return request({
      url: url,
      json: true,
      fullResponse: false
    }).then((response) => {

      //attach crashrating to vehicle obj
      vehicle.CrashRating = response.Results[0].OverallRating;

      return vehicle;
    })

  }

}

export default NHTSAService;
