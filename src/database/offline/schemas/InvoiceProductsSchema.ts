import Realm from 'realm';

export class InvoiceProductsSchema extends Realm.Object {
    static schema = {
        name: 'InvoiceProducts',
        primaryKey: 'id',
        properties: {
            id: 'string',
            idInvoice: 'string',
            name: 'string',
            quantity: 'int',
            value: 'int',
            discount: 'int',
            total: 'int',
            nextExchange: 'string',
            nextExchangeType: 'string',
            createdAt: { type: 'date', default: new Date() },
            updatedAt: { type: 'date', default: new Date() },
            itHasBeenDeleted: { type: 'bool', default: false },
        }
    };
}