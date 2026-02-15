import { categories } from './categories';

export const getCO2ByCategory = (categoryId) => {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.co2PerItem : 10;
};

export const co2ToTrees = (co2Kg) => Math.round(co2Kg / 22); // ~22kg CO2 per tree per year

export const co2ToFlights = (co2Kg) => Math.round(co2Kg / 286); // ~286kg per domestic flight

export const co2ToCarMiles = (co2Kg) => Math.round(co2Kg / 0.21 * 0.621); // convert to miles
