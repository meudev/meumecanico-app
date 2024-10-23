export interface InvoiceProductsInterface {
    id: string,
    idInvoice: string;
    name: string,
    quantity: number,
    value: number,
    discount: number,
    total: number,
    nextExchange: string,
    nextExchangeType: string,
    createdAt: string,
    updatedAt: string,
    itHasBeenDeleted?: boolean,
}

export interface InvoiceProductsCreateInterface {
    idInvoice?: string;
    name: string,
    quantity: number,
    value: number,
    discount: number,
    total: number,
    nextExchange: string,
    nextExchangeType: 'km' | 'date' | '',
}