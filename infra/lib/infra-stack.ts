import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as cdk from '@aws-cdk/core';
import { Construct, StackProps } from "@aws-cdk/core";
import * as path from 'path';

const TABLE_NAME = 'ExchangeRateTable';

export class InfraStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const exchangeRateTable = this.createDynamoDbTable();
    const restApi = this.createRestApi();
    const subscriptionHandler = this.createSubscriptionHandler();

    exchangeRateTable.grantReadWriteData(restApi);
    exchangeRateTable.grantReadWriteData(subscriptionHandler);
  }

  private createDynamoDbTable() {
    return new dynamodb.Table(this, 'ExchangeRateDatabase', {
      tableName: TABLE_NAME,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });
  }

  private createSubscriptionHandler() {

    const topic = new sns.Topic(this, 'Topic', {
      displayName: 'Exchange Rate Topic'
    });

    const subscriptionHandler = new lambda.Function(this, 'SubscriptionHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'test-subscription',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib', 'src')),
      handler: 'subscription.handler',
      environment: { TABLE_NAME: TABLE_NAME }
    });

    topic.addSubscription(new subs.LambdaSubscription(subscriptionHandler));

    return subscriptionHandler;
  }

  private createRestApi() {

    const apiHandler = new lambda.Function(this, 'ExchangeRateHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib', 'src')),
      handler: 'api.handler',
      environment: { TABLE_NAME: TABLE_NAME }
    });

    const apigateway = new apigw.LambdaRestApi(this, 'Endpoint', { handler: apiHandler, proxy: false });

    const resource = apigateway.root.addResource('convert');
    resource.addMethod('GET');

    const currencyPath = resource.addResource('{currency}');
    currencyPath.addMethod('GET');

    return apiHandler;
  }
}