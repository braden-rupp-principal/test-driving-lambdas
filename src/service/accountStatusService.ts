import { getStatusByFullName, Status } from "../repository/statusRepository"

export const getStatus = (firstName: string, lastName: string): Status => {

    const fullName = `${firstName.toUpperCase()}_${lastName.toUpperCase()}`
    return getStatusByFullName(fullName);
}
