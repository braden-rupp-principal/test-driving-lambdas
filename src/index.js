
export const handler = async (event) => {

    const { lastName, name } = getParameters(event);

    if (lastName && lastName.match(/\d/g)) {
        return {
            statusCode: 400,
            body: { errorMessage: 'lastName may not contain numbers' }
        }
    }

    const message = getMessage(name, lastName);

    return {
        statusCode: 200,
        body: { message }
    }

}

const getMessage = (name, lastName) => {

    if (name && lastName) {
        return `Hello World ${name} ${lastName}`
    }


    if (name) {
        return `Hello World ${name}`
    }

    return 'Hello World'
}

const getParameters = (event) => {
    const { queryStringParameters, pathParameters } = event;

    const name = pathParameters && pathParameters.name;
    const lastName = queryStringParameters && queryStringParameters.lastName;
    
    return { lastName, name };
}
