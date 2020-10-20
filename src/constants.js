// ENV VARS
const env = {
  port: 3000,
}

// Routes
// TODO: convert these to use /api where appropriate
const routes = {
  api: {
    links: '/api/links',
    linksId: '/api/links/:id',
    // user stuff
    users: '/api/users',
    me: '/api/users/me',
    meAvatar: '/api/users/me/avatar',
    usersAvatar: '/api/users/:id/avatar',
    login: '/api/users/login',
    logout: '/api/users/logout',
    logoutAll: '/api/users/logoutAll',
  },
  web: {
    links: '/links',
    linksId: '/links/:id',
    // user stuff
    users: '/users',
    usersMe: '/users/me',
    login: '/users/login',
  },
}

constants = {}

// Exports
module.exports = {
  env,
  routes,
}
