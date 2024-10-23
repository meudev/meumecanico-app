import uuid from 'react-native-uuid';

import { getRealm } from '../realm';

import { UserCreateInterface } from '../../../interfaces/UserInterface';
import { VehicleCreateInterface } from '../../../interfaces/VehicleInterface';
import { InvoiceCreateInterface, InvoiceInterface } from '../../../interfaces/InvoiceInterface';
import { InvoiceProductsCreateInterface } from '../../../interfaces/InvoiceProductsInterface';

export async function createUser(user: UserCreateInterface) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('User', { ...user, id: uuid.v4() });
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function loginUser(cpf: string, password: string) {
    try {
        const realm = await getRealm();
        let response;
        const user: any = realm.objects('User').filtered('cpf = "' + cpf + '" AND password = "' + password + '"')

        if (user[0].id) {
            response = {
                id: user[0].id,
                name: user[0].name,
                cpf: user[0].cpf,
                plan: user[0].plan,
                createdAt: user[0].createdAt,
                updatedAt: user[0].updatedAt
            }
        }

        return response
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createVehicle(vehicle: VehicleCreateInterface) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('Vehicle', { ...vehicle, id: uuid.v4() });
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function listVehicles(idUser: string) {
    try {
        const realm = await getRealm();
        const vehicles: any = realm.objects('Vehicle').filtered('idUser = "' + idUser + '"');

        return vehicles
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createInvoice(invoice: InvoiceCreateInterface) {
    try {
        const id = uuid.v4();

        const realm = await getRealm();
        realm.write(() => {
            realm.create('Invoice', { ...invoice, id: String(id) });
        });

        invoice.products.map(async (product) => {
            await createProducts({ ...product, idInvoice: String(id) })
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createProducts(product: InvoiceProductsCreateInterface) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('InvoiceProducts', { ...product, id: uuid.v4() });
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function listInvoice(idUser: string, idVehicle: string) {
    try {
        const realm = await getRealm();

        let invoices: any = realm.objects('Invoice').filtered('idUser = "' + idUser + '" AND idVehicle = "' + idVehicle + '"');

        invoices = invoices.map((invoice: InvoiceInterface) => {
            const products: any = realm.objects('InvoiceProducts').filtered('idInvoice = "' + invoice.id + '"');
            return {
                id: invoice.id,
                idUser: invoice.idUser,
                name: invoice.name,
                cnpj: invoice.cnpj,
                street: invoice.street,
                number: invoice.number,
                district: invoice.district,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode,
                telephone: invoice.telephone,
                date: invoice.date,
                discount: invoice.discount,
                products: products,
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
                itHasBeenDeleted: invoice.itHasBeenDeleted
            }
        })

        return invoices;
    } catch (error: any) {
        throw new Error(error);
    }
}