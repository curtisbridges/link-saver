# Link Saver

## Description

This project is designed to capture links of interest from around the web. This will be a hosted website, which will include a front-end webapp and a backend REST API server.

Eventually, I'd like to include browser extensions that will interact with the website/API directly.

## TODO

### Backend
- [ ] Define the link data structure (title, url, created date, updated date, read date)
- [ ] test scripts using REST client plugin (VS Code)
- [ ] REST API CRUD for links
  - [ ] list all links
  - [ ] list all links with a filter (read/unread)
  - [ ] submit a link
  - [ ] delete a link
  - [ ] update a link
- [ ] MongoDB backend
- [ ] Users and user auth
  - [ ] sign-up
  - [ ] login / logout
  - [ ] login with apple/google, etc.
- [ ] External link sharing
  - [ ] metrics related to sharing (url hits, etc.)
- [ ] Convert to typescript????
- [ ] URL shortener?
- [ ] Auto-tagging (also used when filtering)
- [ ] Statistical analysis

### Frontend
- [ ] Front-end (SPA? EJS?)
  - [ ] login page
  - [ ] sign-up page
  - [ ] dashboard (show/search links)
  - [ ] sharing ui
- [ ] thumbnails for links / videos
