import { Aws } from 'aws-cli-js';

const aws = new Aws();

export const getSubcriptionForFunctionName = async (functionName: string): Promise<string> => {
    let topic;
    try {
        const response = await aws.command(`sns list-subscriptions \
        --query "Subscriptions[?contains(Endpoint,\'${functionName}\')][TopicArn]" \
         --endpoint-url http://localhost:4566`)
        topic = response.object[0][0];
    } catch (e) {
        console.error(e);
    }
    return topic;
}