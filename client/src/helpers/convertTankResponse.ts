import { Tank } from "../types/Tank";
export const convertTankResponse = (responseData: any) => {
  const {
    id,
    nr,
    producer,
    model,
    version,
    tankYear,
    releaseDate,
    mileage,
    ammo,
    armor,
    ownerId,
  } = responseData;

  const userData: Tank = {
    id,
    nr,
    producer,
    model,
    version,
    tankYear: parseInt(tankYear),
    releaseDate: new Date(releaseDate).toISOString().split("T")[0],
    mileage,
    ammo,
    armor,
    ownerId,
  };

  return userData;
};
