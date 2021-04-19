import { DynamoDB } from 'aws-sdk';

const tableName = process.env.TABLE_NAME || '';
const dynamo = new DynamoDB.DocumentClient({
    apiVersion: '2019.11.21',
    region: 'us-east-2',
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`
});

export default class ExchangeRateRepository {

    async scan() {
        return await dynamo.scan({ TableName: tableName }).promise();
    }

    async insert(exchange: 'CHF-USD' | 'USD-CHF', rate: string) {
        const result = await dynamo.put({
            TableName: tableName,
            Item: { id: exchange, rate: rate }
        }).promise();
        return result;
    }

    async delete(exchange: 'CHF-USD' | 'USD-CHF') {
        return await dynamo.delete({ TableName: tableName, Key: { id: exchange } }).promise();
    }

    async getExchangeRate(exchange: 'CHF-USD' | 'USD-CHF'): Promise<string> {
        const result = await dynamo.get({ TableName: tableName, Key: { id: exchange } }).promise();
        return result.Item.rate;
    }

};

export const exchangeRateRepository = new ExchangeRateRepository();

//MOCKING:
// jest.mock('./exchangeRateRepository');
// import { mocked } from 'ts-jest/utils';

// mocked(mockExchangeRateRepository.getExchangeRate).mockResolvedValue('Hello');
