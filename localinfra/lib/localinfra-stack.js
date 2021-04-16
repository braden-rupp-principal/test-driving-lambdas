const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const apigw = require('@aws-cdk/aws-apigateway');
const dynamodb = require('@aws-cdk/aws-dynamodb');
const {AwsCustomResource, AwsSdkCall, AwsCustomResourcePolicy,} = require('@aws-cdk/custom-resources');
const path = require('path');


class LocalinfraStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const exchangeRateTable = new dynamodb.Table(this, 'ExchangeRateDatabase', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },

    });

    const lambdaHandler = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib')),  // code loaded from "lambda" directory
      handler: 'lambda.handler',
      environment: {
        TABLE_NAME: exchangeRateTable.tableName
      }
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: lambdaHandler,
    });

    exchangeRateTable.grantReadData(lambdaHandler);

  }
}

module.exports = { LocalinfraStack }
