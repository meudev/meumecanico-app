export function formattedAmount(value: number) {
    if (typeof value !== 'number') return 0
    let formattedAmount = (value < 10) ? '00' + value : (value < 100) ? '0' + value : value + '';
    formattedAmount = formattedAmount.replace(/([0-9]{2})$/g, ",$1");
    if (formattedAmount.length > 6)
        formattedAmount = formattedAmount.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return formattedAmount;
}

export function formattedCnpj(cnpj: string) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}