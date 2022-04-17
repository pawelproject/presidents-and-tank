export interface TankListItem {
  id: string;
  nr: string;
}

export interface Tank extends TankListItem {
  producer: string;
  model: string;
  version: string;
  tankYear: number | string;
  releaseDate: string;
  mileage: number | string;
  ammo: number | string;
  armor: number | string;
  ownerId?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
