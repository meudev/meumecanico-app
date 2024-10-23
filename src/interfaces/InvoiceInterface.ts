import { InvoiceProductsCreateInterface, InvoiceProductsInterface } from "./InvoiceProductsInterface";

export interface InvoiceInterface {
    id: string,
    idVehicle: string;
    idUser: string,
    name: string,
    cnpj: string,
    street: string,
    number: string,
    district: string,
    city: string,
    state: string,
    zipCode: string,
    telephone: string,
    date: string,
    discount: number,
    products: InvoiceProductsInterface[],
    createdAt: string,
    updatedAt: string,
    itHasBeenDeleted?: boolean
}

export interface InvoiceCreateInterface {
    idVehicle: string;
    idUser: string,
    name: string,
    cnpj: string,
    street: string,
    number: string,
    district: string,
    city: string,
    state: string,
    zipCode: string,
    telephone: string,
    date: string,
    discount: number,
    products: InvoiceProductsCreateInterface[],
}