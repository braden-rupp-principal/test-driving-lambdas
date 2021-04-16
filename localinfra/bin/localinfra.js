#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { LocalinfraStack } = require('../lib/localinfra-stack');

const app = new cdk.App();
new LocalinfraStack(app, 'LocalinfraStack');
