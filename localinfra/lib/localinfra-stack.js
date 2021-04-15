const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const apigw = require('@aws-cdk/aws-apigateway');
const path = require('path');


class LocalinfraStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,    // execution environment
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lib')),  // code loaded from "lambda" directory
      handler: 'lambda.handler'                // file is "hello", function is "handler"
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}

module.exports = { LocalinfraStack }
