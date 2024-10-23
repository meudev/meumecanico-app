export interface UserInterface {
    id: string,
    name: string,
    cpf: string,
    password?: string,
    plan: number,
    createdAt: string,
    updatedAt: string,
    itHasBeenDeleted?: boolean
}

export interface UserCreateInterface {
    name: string,
    cpf: string,
    password: string,
}