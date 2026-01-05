import { defineEventHandler } from "h3";
import cities from "../data/ir.json";

interface City {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
}

export default defineEventHandler((): City[] => {
  return cities;
});
