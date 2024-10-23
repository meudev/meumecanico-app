
import Realm from 'realm';

export class VehicleSchema extends Realm.Object {
    static schema = {
        name: 'Vehicle',
        primaryKey: 'id',
        properties: {
            id: 'string',
            idUser: 'string',
            plate: 'string',
            brand: 'string',
            model: 'string',
            color: 'string',
            km: 'string',
            year: 'string',
            fuel: 'string',
            createdAt: { type: 'date', default: new Date() },
            updatedAt: { type: 'date', default: new Date() },
            itHasBeenDeleted: { type: 'bool', default: false },
        }
    };
}