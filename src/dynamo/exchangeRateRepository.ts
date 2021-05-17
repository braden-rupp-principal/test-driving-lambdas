import { DynamoDB } from 'aws-sdk';

const tableName = process.env.TABLE_NAME || 'ExchangeRateTable';
const dynamo = new DynamoDB.DocumentClient({
    apiVersion: '2019.11.21',
    region: 'us-east-2',
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}`
});

export type ExchangeRateKey = 'CHF-USD' | 'USD-CHF';

export default class ExchangeRateRepository {

    async scan() {
        return await dynamo.scan({ TableName: tableName }).promise();
    }

    async insert(exchangeRateKey: ExchangeRateKey, rate: number) {
        const result = await dynamo.put({
            TableName: tableName,
            Item: { id: exchangeRateKey, rate: rate.toString() }
        }).promise();
        return result;
    }

    async delete(exchangeRateKey: ExchangeRateKey) {
        return await dynamo.delete({ TableName: tableName, Key: { id: exchangeRateKey } }).promise();
    }

    async getExchangeRate(exchangeRateKey: ExchangeRateKey): Promise<number> {
        const result = await dynamo.get({ TableName: tableName, Key: { id: exchangeRateKey } }).promise();
        return +result.Item.rate;
    }

};

export const exchangeRateRepository = new ExchangeRateRepository();

// MOCKING:
// jest.mock('./exchangeRateRepository');
// import { mocked } from 'ts-jest/utils';

// mocked(mockExchangeRateRepository.getExchangeRate).mockResolvedValue('2');

// export default () => console.log
