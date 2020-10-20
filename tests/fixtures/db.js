const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')
const Link = require('../../src/models/link')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: '56what!!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Jess',
  email: 'jess@example.com',
  password: '56what!!',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
}

const linkOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'First link',
  url: 'https://curtisbridges.com/blog/2019/github-access-behind-firewall/',
  owner: userOne._id,
}

const linkTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Second link',
  url: 'https://curtisbridges.com/blog/2019/jekyll-and-docker/',
  owner: userOne._id,
}

const linkThree = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Third link',
  url: 'https://curtisbridges.com/blog/2019/macos-shell-trash/',
  owner: userTwo._id,
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Link.deleteMany()

  await new User(userOne).save()
  await new User(userTwo).save()

  await new Link(linkOne).save()
  await new Link(linkTwo).save()
  await new Link(linkThree).save()
}

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  linkOne,
  linkTwo,
  linkThree,
  setupDatabase,
}
