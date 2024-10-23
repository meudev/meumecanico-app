export function validateName(name: string) {
    const fullName = /[A-z][ ][A-z]/;
    return fullName.test(name);
}

export function validateCpf(cpf: string) {
    let soma = 0;
    let resto;

    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

export function validateCnpj(cnpj: string) {
    // const validateDigit = (arr: number[], position: number): boolean => {
    //     let weights: number[];
    //     let arrayItems: number;
    //     let sum = 0;
    
    //     if (position === 1) {
    //         weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    //         arrayItems = 12;
    //     } else {
    //         weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    //         arrayItems = 13;
    //     }
    
    //     for (let i = 0; i < arrayItems; i += 1) {
    //         const calc = weights[i] * arr[i];
    //         sum += calc;
    //     }
    
    //     const division = Math.floor(sum % 11);
    //     let verifyingDigit = 0;
    
    //     if (division >= 2) {
    //         verifyingDigit = 11 - division;
    //     }
    
    //     if (arr[arrayItems] !== verifyingDigit) {
    //         return false;
    //     }
    
    //     return true;
    // };

    // if (typeof cnpj !== 'string' && typeof cnpj !== 'number') {
    //     return false;
    // }

    // let filteredCNPJ = String(cnpj);
    // filteredCNPJ = filteredCNPJ.replace(/\.|-|\//g, '');

    // if (filteredCNPJ.length !== 14) {
    //     return false;
    // }

    // const arrCNPJ: number[] = Array.from(filteredCNPJ, Number);

    // const repeatedNumbers: boolean = arrCNPJ.every((num, i, arr) => num === arr[0]);
    // if (repeatedNumbers) {
    //     return false;
    // }

    // const firstDigit = validateDigit(arrCNPJ, 1);
    // const secondDigit = validateDigit(arrCNPJ, 2);
    // if (!firstDigit || !secondDigit) {
    //     return false;
    // }

    return true;
}

export function validatePlate(plate: string) {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    return regex.match(plate);
}