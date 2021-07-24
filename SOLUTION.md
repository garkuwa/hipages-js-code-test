### Launching the project

Please run `yarn` in the root of the project, which should start everything with a click of a button. This command attempts to install all the dependencies and run the server, ui and Docker-contained database in parallel. If for some reason it doesn't work in your operating system, please run these three pieces manually:

1. `docker-compose up -d`
2. `cd server && yarn && yarn start`
3. `cd ui && yarn && yarn start`

This should start the client on http://localhost:3000/, the server on http://localhost:8080, and the database on http://localhost:3306

### Comments regarding the design choices I've made

For both the UI and server I've used TypeScript because it's good for static typing.

#### 1. Server

- NestJs has been picked as the main framework because it's an MVC, Angular-like ecosystem, which offers many cool features out of the box. For such a simple project, a small NodeJs app would be enough, but I think NestJs offers better code readability and modular structure. Also, writing string-based SQL queries in JS files doesn't feel right to me.

- The back-end consists of three API endpoints:

1. `HTTP GET /jobs/{status}` where `{status}` can be `new`, `accepted` or `declined` (the front-end doesn't need the third one, but it's been created for testing purposes).
2. `HTTP PUT /jobs/accept/{id}` where `{id}` is the id of a job to be accepted
3. `HTTP PUT /jobs/decline/{id}` where `{id}` is the id of a job to be declined

- The job entity has been divided into two sub-entities for security purposes, so new and accepted jobs have different fields, such as phone, email and full name. Were we to send all of these fields to the front-end in a get-new-jobs response, anybody who is good at Postman or Chrome DevTools Network panel might start cheating and getting in touch with tradies without clicking "Accept". This would negatively affect the business.

- Another thing that is worth mentioning is flattening the response of `HTTP GET /jobs/{status}`. At the moment, the front-end doesn't care about `category_id` and `suburb_id`, so there is no reason to include these fields in a response. Also, according to the best practices of REST API design, suburb and category entities shouldn't create nesting inside the job entity. To solve this, I take advantage of the `@AfterLoad` decorator to map the fields after they were loaded. An alternative would be to use an SQL query builder and construct a string-based select statement, which looks a bit ugly, and I almost always favor code readability, except when performance becomes a serious issue.

- As for the HTTP PUT API endpoints, I decided to make `id` as a router parameter instead of keeping it in a request body because sending a single parameter in the body might not be convenient for API users. Putting parameters in the body would make more sense if we had full update of the job entity, which would include other fields. Even though we don't have any body params in these requests, we still stick to the best practices of REST because PUT makes it a bit more difficult to update data compared to GET, which can be performed in a browser address bar.

- Finally, the back-end has some unit tests, prettier and linter to ensure code quality and make it safe to add new features. Please run `yarn test` and `yarn lint` respectively.

##### Things that can be improved on the back-end side

1. Searching records would usually mean that we need pagination because there can be thousands of items. Implementing pagination on the back-end wouldn't be much of a challenge, but finding a good UX approach to show pages in tabs on the front-end would require some thinking to make it clear and useful. I don't think paginated tabs would be a good UX approach.
2. More thorough unit-testing.
3. Storing error logs that have been caught in the exception filter, so developers can trace them later.
4. HTTPS. Personally identifiable information, such as a phone number, shouldn't be transferred without SSL

#### 2. UI client

- Usually I'd use NextJs for big React apps, but in this small project, I've gone with Create React App to keep it simple and have fewer files.

- I believe there is no necessity to explain why I've chosen ReactJs, but I'd like to elaborate on why I've installed `styled-components` and `react-query`. As a rule, I try to add as few production dependencies as possible, but these two are really useful. `styled-components` make styled JSX much more structured and readable while `react-query` allows us to cache data and get a bunch of useful properties, such as `isLoading` and `isError`, without writing extra lines of code. Moreover, neither of these libraries require as much setup effort as Redux, for example.

- As for the `Tabs` components, I've made a decision to implement it myself for two reasons. The first is that many UI libraries, such as Material UI, are pretty big, and adding extra 100 KBs to a production bundle is unacceptable for such small apps. The second is that implementing the `Tabs` component is pretty easy, and it adds more flexibility to the app.

- For better user experience, a loader together with snackbar messaging have been added, and the active tab has been linked to a query param.

- I'm a bit of a Figma user, so I didn't install any icon library. Instead, I've made some simple svg icons, which I hope are sufficient for this test task.

- Also, I've added the `Show more` and `Show less` buttons to description fields because these fields can be really long; otherwise, a job card would become huge and difficult to scroll on small devices.

- I've decided to implement a confirmation message for declining a job because a user might hit the Decline button accidentally and never see this job again.

- The ui part has linting, prettier, stylelint and unit tests. The stylelint has been divided into two commands because linting TSX and CSS requires different configurations.
  Bellow are the commands to run:

1. `yarn test`
2. `yarn lint`
3. `yarn stylelint-tsx`
4. `yarn stylelint-css`

- Finally, I've set up CSS variables because they add flexibility and make it simple to change colors or fonts if change requests come up. Obviously, there is little use of them in such a small app, but it also doesn't take much effort to start using them.

##### Things that can be improved on the front-end side

1. More sophisticated unit testing.
2. UI for a confirmation dialog. Standard JS confirm looks ugly.
3. Better responsiveness for mobile and tablet devices. I did my best to make the app mobile-friendly, but there still might be small UI issues.

Thanks for checking out my repository!
