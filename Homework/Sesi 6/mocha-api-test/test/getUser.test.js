import fetch from 'node-fetch';
import { expect } from 'chai';
import Ajv from 'ajv';
import fs from 'fs';

describe('GET User API Test', () => {
  it('Berhasil mengambil data user dan valid schema', async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    const body = await response.json();

    expect(response.status).to.equal(200);

    const schema = JSON.parse(
      fs.readFileSync('./schemas/getUser.schema.json', 'utf8')
    );

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    expect(validate(body)).to.equal(true);
  });
});
