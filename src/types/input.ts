import { Masks, createNumberMask } from 'react-native-mask-input';

export const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
export const CNPJ_MASK = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
export const CAR_PLATE = Masks.BRL_CAR_PLATE;
export const CURRENCY_MASK = createNumberMask({ delimiter: '.', separator: ',', precision: 2 });
export const DATE_MASK = Masks.DATE_DDMMYYYY;
export const PHONE_MASK = Masks.BRL_PHONE;