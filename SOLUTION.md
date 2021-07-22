### Launching the project

Please run `yarn` in the root of the project. This command will attempt to install all the dependencies and run the instances of a database, server and ui in parallel. If for some reason it doesn't work in your operating system, please run these three pieces manually:

1. `docker-compose up -d`
2. `cd server && yarn && yarn start`
3. `cd ui && yarn && yarn start`

This should start the client on http://localhost:3000/ and the server on http://localhost:8080

### Comments regarding the design choices I've made

#### 1. Server

NestJs has been picked as the main framework because it's an MVC, Angular-like ecosystem, which offers many cool features out of the box. Of course, for such a simple project like this one, a small NodeJs app would do, but in my view, NestJs apps offer better code readability, modal structure, and writing SQL queries in JS files doesn't feel right.

The back-end offers three API endpoints:

1. `HTTP GET /jobs/{status}` where `{status}` can be new, accepted or declined (the front-end doesn't need the third one, but it's been created for testing purposes).
2. `HTTP PUT /jobs/accept/id` where `{id}` is the id of a job to be accepted
3. `HTTP PUT /jobs/decline/id` where `{id}` is the id of a job to be declined

The job entity has been divided into two sub-entities because new and accepted jobs have different fields for security purposes. The key difference is in contact information fields (phone, email, full name). If we sent all of them to the front-end in the new-job response, than anybody who is good at Postman or Google Network tab would start cheating and getting in touch with tradies without clicking "Accept".

Another thing that is worth mentioning is flattening the response of 'getJobsByStatus'. The front-end doesn't care about `category_id` and `suburb_id`, so there is no reason to include these fields in the response. Another part of the issue is that the response structure may become nested with suburb and category entities. To solve this, I take advantage of `setJoinedFields` and the `@AfterLoad` decorator to map the fields after were loaded. An alternative would be to use a query builder and construct a string-based select statement, which looks a bit ugly, and I almost always favor code readability, except when performance becomes a serious issue.

As for the PUT API endpoints, I decided to make `id` as a router parameter instead of keeping it in the body because sending a single parameter in the body might not be convenient for API users. Putting parameters in the body would make more sense if we had full update of the job entity and sent other fields. On top of this, PUT still makes it a bit more difficult to update data compared to GET, which can be performed in a browser address bar , so I don't see any problem with having id as a router parameter here.

Finally, the back-end has some unit tests, prettier and linter to ensure code quality. Please run `yarn test` and `yarn lint` respectively.

##### Things that can be improved on the back-end side

1. Searching records would usually mean that we need pagination because there can be thousands of items. Implementing pagination on the back-end wouldn't be much of a challenge, but finding a good UX approach to show pages in tabs on the front-end would require some thinking to make it clear and useful.
2. More thorough unit-testing.
3. Storing error logs caught in the filter, so devs can trace them later.

#### 2. UI client

I believe there is no necessity to explain why I've chosen ReactJs, but I'd like to advocate installing `styled-components` and `react-query`. Usually, I try to add as few production dependencies as possible, but these two really make things easier. `styled-components` make styled JSX much more structured and readable while `react-query` allows us to cache data and get a bunch of useful tools. Moreover, neither of these libraries require as much setup effort as Redux, for example, so I believe these libs are useful even for such a small project as this test task.

The active tab has been linked to a query param, and a loader together with snackbar messaging have been added for better UX.

I'm a bit of a Figma user, so I didn't install any icon-library. Instead, I've made some prototypes of svg icons, which I hope suffices for this test task.

Also, I've added the `Show more` and `Show less` buttons to long description fields because otherwise, a job card would become huge and difficult to use on small devices.

The ui has linting, prettier, stylelint and unit tests. The stylelint has been divided into two commands because linting TSX and simple CSS requires different configurations.
Bellow are the commands to run these:

1. `yarn test`
2. `yarn lint`
3. `yarn stylelint-tsx`
4. `yarn stylelint-css`

Finally, I've taken advantage of CSS variables because they are cool and make it simple to change colors or fonts if change requests come up. Obviously, there is little use of these in such a small app, but it also doesn't take much more effort to utilise them.

##### Things that can be improved on the front-end side

1. Error boundaries to catch and log errors.
2. More sophisticated unit testing.
3. Better responsiveness for mobile and tablet devices. I did my best to make the app mobile-friendly but there still might be small UI issues.

Thanks for checking out my repository!
