import Realm from 'realm';

export class InvoiceSchema extends Realm.Object {
    static schema = {
        name: 'Invoice',
        primaryKey: 'id',
        properties: {
            id: 'string',
            idVehicle: 'string',
            idUser: 'string',
            name: 'string',
            cnpj: 'string',
            street: 'string',
            number: 'string',
            district: 'string',
            city: 'string',
            state: 'string',
            zipCode: 'string',
            telephone: 'string',
            date: 'string',
            discount: 'int',
            createdAt: { type: 'date', default: new Date() },
            updatedAt: { type: 'date', default: new Date() },
            itHasBeenDeleted: { type: 'bool', default: false },
        }
    };
}