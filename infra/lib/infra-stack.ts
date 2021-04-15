import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // defines an AWS Lambda resource
     const lambdaHandler = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,    // execution environment
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib')),  // code loaded from "lambda" directory
      handler: 'lambda.handler'                // file is "hello", function is "handler"
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: lambdaHandler
    });

    
  }
}
