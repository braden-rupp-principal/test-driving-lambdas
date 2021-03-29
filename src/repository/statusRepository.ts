
export enum Status {
    Verified,
    Unverified
}

export const getStatusByFullName = (_name: string): Status => {
    throw new Error('Database Connection needed')
};