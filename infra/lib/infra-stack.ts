import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as path from 'path';
import { Construct, StackProps } from "@aws-cdk/core";
import { BatchInsertCustomResourceConstruct } from "./batchInsertConstruct";

export class InfraStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const tableName = 'ExchangeRateTable';
    const exchangeRateTable = new dynamodb.Table(this, 'ExchangeRateDatabase', {
      tableName: tableName,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });

    const lambdaHandler = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib')),
      handler: 'lambda.handler',
      environment: {
        TABLE_NAME: exchangeRateTable.tableName
      }
    });

    new apigw.LambdaRestApi(this, 'Endpoint', { handler: lambdaHandler });

    exchangeRateTable.grantReadData(lambdaHandler);

    const batchInsertCustomResourceConstruct = new BatchInsertCustomResourceConstruct(this, 'batchInsertCustomResourceConstruct', {
      tableName: tableName,
      tableArn: exchangeRateTable.tableArn
    });
    batchInsertCustomResourceConstruct.node.addDependency(exchangeRateTable);
  }
}