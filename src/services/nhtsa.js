import request from 'requestretry';
import { nhtsa as config } from '../config.json';

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
