# Project

## Scripts

For running the application you need to start a mirror proxy before, in order to bypass the CORS issue given by the REST api when requesting from localhost:

`node ./proxy.js`

And then you can serve the application through:

`npm start`

I really apologize if you have to start a new shell with the mirror proxy, usually I would have changed the npm script in order to open automatically the shell with
the proxy and then serve the applicaiton, but I did not have time in order to create it.

The other available scripts are:

1. `npm run build`
2. `npm test`
3. `npm run test-single-run`
4. `npm run test-coverage`
5. `npm run test-update-snapshots`
6. `npm run lint`

## Project Bootstrap/Generator

For bootstrapping the project with these techs, I used a generator I created which is available here:

[React Redux TypeScrip Generator](https://github.com/quirimmo/react-qbootstrap-typescript-generator)

It sets up a project based on the following template created by me, available here:

[React Redux TypeScript Template](https://github.com/quirimmo/react-qbootstrap)

## Missing Features

I was not able to add all the required features unfortunately. And even for the implemented ones, I would have stayed a bit more on them.

The time ran out when I was implementing the real time data for books. The missing features are the following:

1. Real Time Tickers Data
2. Precision
3. Bars

## REST / SOCKET

At the beginning I was having a CORS issue with the socket. I sent an email for asking if there was some kind of CORS limitation on the socket, and meanwhile I
started getting the data from the REST, because I wanted to start the test with some data.

Later, it turned out to be an issue with the `socket.io-client` which starts a first GET request when connecting to a socket. It looks like they implement their
own protocol which behaves in this way. This request was triggering the CORS issue.

I used to use this library for connecting to sockets from the browser, as I usually use `socket.io` for creating server sockets in node.js. Of course, after this issue, they lost a user.

The REST and the Socket are great, and I am sorry that I didn't have more time in order to study it properly.

For example I could not understand how to get real time tickers from the socket. I was expecting a sort of `tickers` channel which gives me back the list of tickers
for all the symbols, as the REST does, but the only way I found was to get tickers for a single pair. So I haven't been able to refresh the tickers widget with real time data.

Looking to the implementation of the socket interfacing, it should be quite easy and fast to get real time data for tickers too, once understood how to interface with the channel.

## TypeScript

When working on "wide projects", I do prefer the usage of TypeScript over plain JS or JS + flow.

It gives me a lot of good features and prevent few eventual errors. At the same time, for small projects with not a lot of data/operations to be done, it can simply make your life a bit harder and longer. This of course only my personal opinion and point of view.

In this case, considering the time countdown, most probably the usage of TypeScript was not the best choice, because it takes you a bit more time rather than plain JS.

## Components organization

Usually I do like to group and manage code as most as possible in reusable dumb/presentational components. I also like to create render props or hoc components when possible, in order to group the logic and separate it from the "template" of the component.

Even if I started to do that in some component, after a while I felt the pressure of the time, and I could not proceed doing that.

For example, the socket interaction has been implemented in the presentational/dumb component of the sockets, which is really really really awful.

## Socket implementation

Socket has been implemented in the `web-socket-proxy.service.ts`.

I used the concept of streams in order to notify the data to the app. I like to use `rxjs`, not just for async code management, but also for a more powerful concept of streams, as in this case. So every single channel is associated to a streamer, and when getting data, you notifiy the arrival of the data to the subscribers calling the
`next` method.

I didn't have time to manage properly the unsubscription and the management of errors, notifying errors through the `error` method too for example.

## REST Implementation

The REST interfacing has been implemented in the `http-proxy.service.ts` and in the `DAO` objects of the models.

As said above, I started using the REST because I was having an issue with the socket at the beginning.

## General Architecture

I do like spending time on defining architecture and make things as much reusable and scalable as possible.

For structuring the folders, I do prefer an approach of app logic, more than a global categorization as components, actions, reducers, etc...

I find it more convenient specially for wide projects, it gives you an easier way to indetify all the items related to some concept, and it helps you to extract modules if you need to reuse logic into several different applications. But that's only my personal point of view about it.

For actions implementations, I usually like to use thunks or redux-saga. I went for thunks because the generator of the project I used already sets up thunks rather than sagas, and I didn't want to spend time changing them with sagas.

I like to use DAO pattern for defining the operations performable on models.

About routers, I like to define a layer of what I call "router components", which are only responsible for taking data from route, and then display the presentational/container component of that page (a.k.a dumb/smart). Then the page component will display all the smart/dumb components which compose that page.
In this way I can separate the logic of a page content from the logic of a page route.

## Styles

There is a bit of styling implemented in the app and the widgets, with responsiveness given by `bootstrap` and a react implementation of bootstrap, the `reactstrap` library, but I could not goo too much deeper into styling as I would have liked to.

## Performances / Optimization

Your business is maybe one of the uses cases, in all the World, which requires more focus on optimization and performances for real time data.
You really have a huge amount of real time data, because of the prices change, the new activites, etc...

So I really would have loved to spend a bit more on optimization, specially on the UI side, but the time didn't allow me to do that.

## Testing

There are few unit tests inside the application but I could not proceed with them because of the time.

At work I usually use BDD/TDD approach, so I do start coding from tests. Even in side projects, the 95% of the times, I do add unit tests to all the code I develop.

I love testing for a lot of reasons, but in this case, because of the time, it was not the best choice to go for testing and I could have avoided all the tests at all.

## CI/CD

A bit of CI/CD has been setup with travis inside the travis subfolder.

At work I use jenkins, but for side projects at home I usually go for travis. It's not so good as jenkins where you can set up really cool pipelines and you do have a lot of useful features, but it gives you a quite good tool for a basic CI/CD implementation.

Currently the script installs the application, runs unit tests, runs the linting, triggers the build, and if everything is fine, you can then perform your deploy operations, like for example uploading the bundle into production, or whatever.

## Personal Approach

Even if the test was really interesting, the api and the rest are awesome, this was maybe the craziest test I've ever done in my life so far.

I am really not used to this "rush and code" approach, and I am not really a big fan of it, specially when your code will then go to some kind of "production" environment, as it could be considered sending a test for a review.

For example, just for writing a good documentation over a project, it could take hours. Same for testing, or for designing code and logic in a really good way.

Same for studying deeply an api or a socket, in order to really get the best way to use that and to understand all the concepts behind them.

Same for the coding approach, if you want to code for TDD/BDD or in general for a good testing coverage, or if you want to spend a bit more time for creating a good architecture, designing reusable components, etc...
