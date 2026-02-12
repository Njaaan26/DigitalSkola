import fetch from 'node-fetch';
import { expect } from 'chai';
import Ajv from 'ajv';
import fs from 'fs';

describe('POST Create User API Test', () => {
  it('Berhasil membuat user dan valid schema', async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Test',
          body: 'Mocha API',
          userId: 1
        })
      }
    );

    const body = await response.json();

    expect(response.status).to.equal(201);

    const schema = JSON.parse(
      fs.readFileSync('./schemas/createUser.schema.json', 'utf8')
    );

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    expect(validate(body)).to.equal(true);
  });
});
