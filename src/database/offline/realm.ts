import Realm from 'realm';

import { UserSchema } from './schemas/UserSchema';
import { VehicleSchema } from './schemas/VehicleSchema';
import { InvoiceSchema } from './schemas/InvoiceSchema';
import { InvoiceProductsSchema } from './schemas/InvoiceProductsSchema';

export const getRealm = async () => await Realm.open({
    path: 'meumecanico-app',
    schema: [
        UserSchema,
        VehicleSchema,
        InvoiceSchema,
        InvoiceProductsSchema
    ],
    schemaVersion: 1
})