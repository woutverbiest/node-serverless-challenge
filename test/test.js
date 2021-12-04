const assert = require('assert');
const axios = require('axios').default;

const endpoint = 'http://localhost:3000';

describe('GET all users', () => {
  it('should get all users', async () => {
    const response = await axios.get(endpoint + '/users');

    assert.equal(200, response.status);
  });

  it('should get a user by first name', async () => {
    let first_name = 'Cristina';
    const response = await axios.get(
      endpoint + '/users?first_name=' + first_name
    );

    assert.equal(200, response.status);
    assert.equal(first_name, response.data[0].first_name);
  });
});

describe('GET a user', () => {
  it('should get a user', async () => {
    let id = '5';
    const response = await axios.get(endpoint + '/user/' + id);

    assert.equal(200, response.status);
    assert.equal(id, response.data.rowid);
  });

  it('not found when non existent userid', async () => {
    let id = 'lol';
    try {
      await axios.get(endpoint + '/user/' + id);
    } catch (err) {
      assert.equal(404, err.response.status);
    }
  });
});

describe('POST a user', () => {
  it('should create a user', async () => {
    const body = {
      gender: 'male',
      first_name: 'Wout',
      last_name: 'Verbiest',
      email: 'hello@woutverbiest.be',
      phone_number: '+32498181447',
      date_of_birth: '2000-11-14',
      language: 'nl',
    };

    const response = await axios.post(endpoint + '/user', body);

    assert.equal(201, response.status);
  });

  it('should throw 4000 error when creatibg a user', async () => {
    const body = {
      gender: 'male',
      first_name: 'Wout',
      last_name: 'Verbiest',
      email: 'hello@woutverbiest.be',
      phone_number: '+32498181447',
      date_of_birth: '2000-11-14',
    };

    try {
      await axios.post(endpoint + '/user', body);
    } catch (err) {
      assert.equal(400, err.response.status);
    }
  });
});
