import { beforeEach, afterEach, it, describe } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Models from '../database/models';
import app from '../index';

const { User } = Models;

const fakeUser = {
  name: 'test test',
  email: 'user@gmail.com',
  password: '123abc',
};

describe('User related Tests', () => {
  // it('Should crate a user', async () => {
  //   const res = await request(app).post('/users').send(fakeUser);
  //   expect(res.status).to.be.equal(201);
  //   expect(res.body).to.be.a('object');
  //   expect(res.body).to.have.property('message', 'User created successfully');
  // });

  it('Should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message', 'Got all users successfully');
  });
});
