import { Aws } from 'aws-cli-js';

const aws = new Aws();

export const ENDPOINT = `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}`;

export const getSubcriptionForFunctionName = async (functionName: string): Promise<string> => {
    const response = await aws.command(`sns list-subscriptions \
        --query "Subscriptions[?contains(Endpoint,\'${functionName}\')][TopicArn]" \
         --endpoint-url ${ENDPOINT}`)
    return response.object[0][0];
}

export const getLambdaEndpointRoot = async (): Promise<string> => {
    console.log("HELLO WORLD!")
    const response = await aws.command(`apigateway get-rest-apis  \
         --endpoint-url ${ENDPOINT}`);
    const id = response.object.items[0].id;
    return `${ENDPOINT}/restapis/${id}/prod/_user_request_/`
}