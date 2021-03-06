/* eslint-disable no-undef */

const request = require('supertest')
const { queryLogin } = require('./queries')
const app = require('../../src/app')

describe('An user', () => {
  it('should login with right credentials', () => {
    queryLogin.variables = {
      email: 'test@test.com',
      password: 'test'
    }
    return request(app)
      .post('/graphql')
      .set('recaptcha', 'test')
      .send(queryLogin)
      .expect(200)
      .expect(res => {
        expect(res.body.errors).toBeUndefined()
        expect(res.body.data.login.userId).toBeDefined()
        expect(res.body.data.login.token).toBeDefined()
        expect(res.body.data.login.tokenExpiration).toBeDefined()
      })
  })
})
