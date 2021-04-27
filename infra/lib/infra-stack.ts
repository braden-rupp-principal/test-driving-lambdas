import * as apigw from '@aws-cdk/aws-apigateway';
import { ApiKeySourceType } from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { Construct, StackProps } from "@aws-cdk/core";
import * as path from 'path';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sns from '@aws-cdk/aws-sns';


export class InfraStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createRestApi();
    this.createSnsSubscription();
  }

  private createSnsSubscription() {

    const topic = new sns.Topic(this, 'Topic', {
      displayName: 'Exchange Rate Topic'
    });

    const subscriptionHandler = new lambda.Function(this, 'SubscriptionHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib', 'src', 'subscription')),
      handler: 'lambda.handler'
    });

    topic.addSubscription(new subs.LambdaSubscription(subscriptionHandler));

  }

  private createRestApi() {
    const tableName = 'ExchangeRateTable';
    const exchangeRateTable = new dynamodb.Table(this, 'ExchangeRateDatabase', {
      tableName: tableName,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });

    const apiHandler = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib', 'src', 'api')),
      handler: 'lambda.handler',

      environment: {
        TABLE_NAME: exchangeRateTable.tableName
      }
    });

    const apigateway = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: apiHandler,
      proxy: false
    });

    const resource = apigateway.root.addResource('convert');
    resource.addMethod('GET');

    const currencyPath = resource.addResource('{currency}');
    currencyPath.addMethod('GET');

    exchangeRateTable.grantReadWriteData(apiHandler);
  }
}