import Realm from 'realm';

export class UserSchema extends Realm.Object {
    static schema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'string',
            name: 'string',
            cpf: 'string',
            password: 'string',
            plan: { type: 'int', default: 0 },
            createdAt: { type: 'date', default: new Date() },
            updatedAt: { type: 'date', default: new Date() },
            itHasBeenDeleted: { type: 'bool', default: false },
        }
    };
}