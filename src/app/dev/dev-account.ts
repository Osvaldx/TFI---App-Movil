export interface DevAccount {
    id: number,
    email: string,
    password: string
}

export const DEV_ACOUNTS: ReadonlyArray<DevAccount> = [
    {id: 1, email: "cuenta1@gmail.com", password: "cuenta1"},
    {id: 2, email: "cuenta2@gmail.com", password: "cuenta2"},
    {id: 3, email: "cuenta3@gmail.com", password: "cuenta3"}
]