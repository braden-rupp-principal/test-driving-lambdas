import { getStatus } from './service/accountStatusService';
export const handler = async (event) => {
    const { firstName, lastName } = getParameters(event);
    const status = getStatus(firstName, lastName);
    return {
        statusCode: 200,
        body: JSON.stringify({ status })
    };
};
const getParameters = (event) => {
    var _a, _b;
    const firstName = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.name;
    const lastName = (_b = event.queryStringParameters) === null || _b === void 0 ? void 0 : _b.lastName;
    return { lastName, firstName };
};
//# sourceMappingURL=index.js.map