const request = require('supertest')
const app = require('../src/app')
const Link = require('../src/models/link')
const User = require('../src/models/user')
const {
  userOneId,
  userOne,
  userTwo,
  linkOne,
  linkTwo,
  linkThree,
  setupDatabase,
} = require('./fixtures/db')

const { routes } = require('../src/constants')

beforeEach(setupDatabase)

test('Should create a new link', async () => {
  const response = await request(app)
    .post(routes.api.links)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      url: 'https://nodejs.org',
    })
    .expect(201)

  // assert that the database was changed correctly
  const link = await Link.findById(response.body._id)
  expect(link).not.toBeNull()

  // assertions about the response
  // expect(response.body.user.name).toBe('Andrew')
  expect(response.body.url).toBe(link.url)
  expect(response.body.owner).toBe(link.owner._id.toString())
})

test('Fetch user links', async () => {
  const response = await request(app)
    .get(routes.api.links)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(response.body.length).toEqual(2)
})

test('Only link owner should be able to delete a task', async () => {
  const deleteLinkOne = `${routes.api.linksId}/${linkOne._id}`
  await request(app)
    .delete(deleteLinkOne)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  const link = Link.findById(linkOne._id)
  expect(link).not.toBeNull()
})
