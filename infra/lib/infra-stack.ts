import * as apigw from '@aws-cdk/aws-apigateway';
import { ApiKeySourceType } from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { Construct, StackProps } from "@aws-cdk/core";
import * as path from 'path';

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
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib', 'src')),
      handler: 'lambda.handler',

      environment: {
        TABLE_NAME: exchangeRateTable.tableName
      }
    });

    const apigateway = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: lambdaHandler,
      proxy: false
    });

    const resource = apigateway.root.addResource('convert');
    resource.addMethod('GET');

    const currencyPath = resource.addResource('{currency}');
    currencyPath.addMethod('GET');

    exchangeRateTable.grantReadWriteData(lambdaHandler);
  }
}