import { exec } from 'child_process';
import axios from 'axios';

jest.setTimeout(30000);

let lambdaId = '';
const findId = (output) => {
  const match = /https:\/\/(.*).execute-api/.exec(output);
  return match[1];
}

let endpoint = () => {
  return `http://localstack:4566/restapis/${lambdaId}/prod/_user_request_/`;
}
// create infrastructure we need for the application
beforeAll(() => {
  return new Promise(resolve => {
    exec(`npm run deploy`, (err, so, se) => {
      console.log('ERROR: ', err);
      console.log('STDOUT: ', so);
      console.log('STDERR: ', se);
      lambdaId = findId(se);
      resolve('');
    });
  });
});
// clean up and destroy the infrastructure
afterAll(() => {
  return new Promise(resolve => {
    exec(`npm run teardown`, (err, so, se) => {
      console.log('ERROR: ', err);
      console.log('STDOUT: ', so);
      console.log('STDERR: ', se);
      resolve('');
    });
  });
});

test('testing', async () => {

  const url = endpoint();
  try {
    const response = await axios.get(url);
    expect(response.data).toEqual('Hello, CDK!');
  } catch (e) {
    console.error(e)
    fail();
  }

});
