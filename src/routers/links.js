const express = require('express')
const { extract } = require('article-parser')
const fetch = require('node-fetch')
// const fs = require('fs')
// const fileType = require('file-type')

const { routes } = require('../constants')
const Link = require('../models/link')
const auth = require('../middleware/auth')

const router = new express.Router()

// CREATE
router.post(routes.api.links, auth, async (req, res) => {
  // error handling for req body
  const link = new Link({
    ...req.body,
    owner: req.user._id,
  })

  try {
    const article = await extract(link.url)
    link.title = article.title
    link.description = article.description

    if (article.image) {
      const res = await fetch(article.image)
      link.image = await res.buffer()
    }

    await link.save()
    res.status(201).send(link)
  } catch (error) {
    res.status(400).send(error)
  }
})

// READ
// query strings:
//  completed=[true|false]
//  limit=[num]&skip=[num]
//  sortBy=[createdAt|updatedAt]:[asc|desc]
router.get(routes.api.links, auth, async (req, res) => {
  const match = {}
  const sort = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    //const tasks = await Task.find({ owner: req.user._id })
    await req.user
      .populate({
        path: 'links',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.links)
  } catch (error) {
    res.status(500).send()
  }
})

router.get(routes.api.linksId, auth, async (req, res) => {
  const id = req.params.id
  const link = links.find((link) => link.id === id)
  if (link) res.send(link)
  else res.status(404).send()
})

// UPDATE
router.patch(routes.api.links, auth, async (req, res) => {
  // error handling for the req body
  const link = req.body
  // TODO: replace link in array
  res.send()
})

// DELETE
router.delete(routes.api.linksId, auth, async (req, res) => {
  // error handling for the req body
  const link = links.find((link) => link.id === id)
  if (link) res.send(link)
  else res.status(404).send()
})

// async function saveArticleImage(imageUrl) {
//   const res = await fetch(imageUrl)
//   const buffer = await res.buffer()
//   const type = await fileType.fromBuffer(buffer)
//   fs.writeFileSync(`hero.${type.ext}`, buffer)
// }

module.exports = router
