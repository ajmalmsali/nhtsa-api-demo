import NHTSAService from '../services/nhtsa'
import Promise from 'bluebird'

export function vehicle (year, manufacture, model, rating){

  let nhtsa = new NHTSAService(year, manufacture, model);
  let vehicleResults = nhtsa.find();

  if(rating){

    return vehicleResults
            .then((vehicles) => {
              //for each vehicle found, findCrashRating
              return Promise.map(vehicles.Results, nhtsa.findRating)
            });
  }
  else{
    return vehicleResults;
  }

};
