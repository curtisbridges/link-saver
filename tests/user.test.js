const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

const { routes } = require('../src/constants')

beforeEach(setupDatabase)

// afterEach(() => {
//     console.log('afterEach')
// })

test('Should signup a new user', async () => {
  const response = await request(app)
    .post(routes.api.users)
    .send({
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'MyPass777!',
    })
    .expect(201)

  // assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // assertions about the response
  // expect(response.body.user.name).toBe('Andrew')
  expect(response.body).toMatchObject({
    user: {
      name: 'Andrew',
      email: 'andrew@example.com',
    },
    token: user.tokens[0].token,
  })
  expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing user', async () => {
  const response = await request(app)
    .post(routes.api.login)
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)

  // assert that the database was changed correctly
  const user = await User.findById(userOneId)
  expect(user).not.toBeNull()

  // assert that the token in response matches user's second token
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
  await request(app)
    .post(routes.api.login)
    .send({
      email: 'curtis@example.com',
      password: 'somerandom',
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get(routes.api.me)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get(routes.api.me).send().expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete(routes.api.me)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // assert that the database was changed correctly
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app).delete(routes.api.me).send().expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post(routes.api.meAvatar)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch(routes.api.me)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Curtis',
    })
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.name).toBe('Curtis')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch(routes.api.me)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Nashua',
    })
    .expect(400)
})
