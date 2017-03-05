import Promise from 'bluebird';
import { colorConsole as logger } from 'tracer';
import NHTSAService from '../services/nhtsa';

export default function vehicle(year, manufacture, model, rating) {
  const nhtsa = new NHTSAService(year, manufacture, model);
  const vehicleResults = nhtsa.find();

  if (rating) {
    return vehicleResults.then((vehicles) => {
      // for each vehicle found, findCrashRating
      return Promise.map(vehicles.Results, nhtsa.findRating).then((mappedVehicles) => {
        logger.info(mappedVehicles);
        return vehicles; // we send the entire response instead of just mappedVehicles
      });
    });
  }
  return vehicleResults;
}
