import { getStatusByFullName } from "../repository/statusRepository";
export const getStatus = (firstName, lastName) => {
    const fullName = `${firstName.toUpperCase()}_${lastName.toUpperCase()}`;
    return getStatusByFullName(fullName);
};
//# sourceMappingURL=accountStatusService.js.map