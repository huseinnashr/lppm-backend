# LPPM Backend

[![nvdhunter](https://circleci.com/gh/nvdhunter/lppm-backend.svg?style=svg&circle-token=c91ce6c4daad663013c2a9113823c29f55f8e155)](https://circleci.com/gh/nvdhunter/lppm-backend)
[![nvdhunter](https://codecov.io/gh/nvdhunter/lppm-backend/branch/master/graph/badge.svg)](https://codecov.io/gh/nvdhunter/lppm-backend)

## I. What is this?

I made this practice project to try to adopt latest technologies and practices as a backend engineers. I started with past experiences and had in mind about what to avoid and what to do. Along the journey I’ve discovered more about the techs, practices and tradeoffs that have to be made in the whole software lifecycle. There’s a few things that I hadn't implemented but I’ve decided to move on to another project (see : What I wanna do next)

## II. What does it cover

### II.A. Test driven development

In this project, I wrote the integration test first, and then developed the code afterwards. I mainly did this because I could test code changes across all specification automatically rather than manually checking them, e.g. with cURL. I used jest and superagent for the the test, and codecov to see the test coverage.

### II.B. Integrating GitHub with CircleCI and Codecov

I did this just to try things out. The way I configured it was everytime I push changes to github, CircleCI will automatically run test and send the coverage to codecov. Both CircleCI and Codecov then return all results back to Github. On Github, I could specify that only successfully tested code can be merge, but I didn’t, since I pushed code directly to master branch anyway 🙈

### II.C. HATEOAS API (sort of).

I’ve made API’s before, and I’ve learned that you need to include app state in your response. If you don’t than you’ll need to copy the business logic to frontend, which is bad. Through this project, I've discovered that what I was trying to achieve is called Hateoas. Although I sort of implemented it in this project, it is a little bit different than the popular implementation. I used states instead of links because I didn’t know Hateoas at that time.

## III. Repo Files

- ./lppm.sql : contain sql for table creation and mock data for test
- ./index.js : where the app starts
- ./test/\* : contain all the integration test
- ./controllers/\* : contain all code that talk to database and do business logic
- ./artifacts/\* : contain development documents

## IV. How to run

1. Clone this repo.
2. run “npm install”
3. Add the following environment variables to your system
   MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE (database name),
4. Sign up to CircleCI and Codecov with GitHub, these 3rd party tools will detect and do their work when you push your changes to GitHub

## V. What this is not

I didn't do full requirement gathering and system design, but I do document the usecase, database design, some business process. The API Specification was written as a integration test.

## VI. What I want to do next

### VI.A. Proper Hateoas API in laravel

Through this project, I discovered that it was really hard to make good Hateoas backend without a framework. Sadly, NodeJS doesn’t have any frameworks that have features and ease of development as good as PHP/Java (NodeJS is great if you aren’t building CRUD heavy system). So I planned to make Hateoas with laravel in my next project.

### VI.B. Scaling out ACID database and backend

I wanted to try replication, sharding and other mechanism to scale out database. And i also wanted to try backend replication, doing load balancer with session and other things to scale out the backend.

### VI.C. API Documentation and other development artifact
