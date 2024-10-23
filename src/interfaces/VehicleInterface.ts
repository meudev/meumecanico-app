export interface VehicleInterface {
    id: string,
    idUser: string,
    plate: string,
    brand: string,
    model: string,
    color: string,
    km: number,
    year: number,
    fuel: string,
    createdAt: string,
    updatedAt: string,
    itHasBeenDeleted?: boolean,
}


export interface VehicleCreateInterface {
    idUser: string,
    plate: string,
    brand: string,
    model: string,
    color: string,
    km: string,
    year: string,
    fuel: string,
}