import Promise from 'bluebird';
import { colorConsole } from 'tracer';
import NHTSAService from '../services/nhtsa';

const logger = colorConsole();

export default function vehicle(year, manufacture, model, withRating) {
  const nhtsa = new NHTSAService(year, manufacture, model);
  const vehicleResults = nhtsa.find();

  if (withRating) {
    const mapRating = (vehicles) => {
      logger.debug(vehicles);
      // for each vehicle found, findCrashRating
      return Promise.map(vehicles.Results, nhtsa.findRating).then((mappedVehicles) => {
        logger.debug(mappedVehicles);
        return vehicles; // we send the entire response instead of just mappedVehicles
      });
    };
    return vehicleResults.then(mapRating);
  }
  return vehicleResults;
}
