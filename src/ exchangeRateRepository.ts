
import { DynamoDB } from 'aws-sdk';

const tableName = process.env.TABLE_NAME || '';
const dynamo = new DynamoDB.DocumentClient();

class ExchangeRateRepository {

    async getExchangeRate() {
        const scanResult = await dynamo.scan({
            TableName: tableName
        }).promise();
        return scanResult;
    }

};


export const exchangeRateRepository = new ExchangeRateRepository();