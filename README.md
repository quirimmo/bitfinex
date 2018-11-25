# Project

**NOTES:**

After the expiration of the test, I created a quite better documentation for the project which is available in the new readme.
I thought that at least adding a bit of documentation could have been something allowed after the expiration of the time, because during the test I did not have time to write documentation, just this "awful readme".

I kept also this old README in order to show that all the features which were not implemented they are still not implemented, and all the code has
not been refactored or touched at all.

If this could be accepted, the new readme is available here:

[New Readme](./NEWREADME.md)

otherwise this is the old readme deployed when the test expired.

## OLD README

I did use a generator I've created for React with Redux and TypeScript.

The generator is available at this link:

[React Typescript Generator](https://github.com/quirimmo/react-qbootstrap-typescript-generator)

And the description and the code of the generated bootstrap project is available at this link:

[React Typescript Bootstrap Project](https://github.com/quirimmo/react-qbootstrap)

## Scripts

You do need to start a mirror proxy in order to bypass the CORS issue with the REST api.

Inside the root of the project you can execute the following script:

`node ./proxy.js`

After that you can execute the app through:

`npm start`

Unit tests in watch:

`npm test`

Unit tests coverage:

`npm run test-coverage`

Unit tests single run:

`npm run test-single-run`

Linting:

`npm run lint`

Build:

`npm build`

## Description

That's maybe the craziest test I've ever done so far. The assessment itself was great and really interesting, the api and the REST are really awesome, but the countdown of 8 hours is really a pain.

I definitely ran out of time and I could not do a lot of things that I wanted to do, and refactor/refine the stuff I've done so far.

I didn't have time to playground with the api and the socket, and to spy well the live demo.

I didn't have time to work on the precision and on the bars and even for the implemented feature, I would have liked to stay a bit more on them.

There are two routes in the application: in the main one, you can select the symbols and then in the symbols page you have the widgets.

I started using the REST api because at the beginning I was having a CORS issue with the socket, but turned out to be an issue with socket.io-client library that I usually use for interfacing with sockets.

Live data through socket can be turned on with the buttons at the top. I didn't understand the tickers channel of the socket, because I didn't find a way to get all the tickers for all the symbols through the web socket.

I usually like to use TypeScript, but maybe in this case was not the best choice because it takes you a bit more time rather than plain JS. I usually also like to structure code and create a "quite architecture" and I started to do that, but again, maybe that was not the best thing to do in this case cause of the time.

Same for components, I love to create reusable and generic ones and group all the groupable code and I started trying to create them, but again the time was running out.

Unit tests are just partials and currently I don't even know if they are still passing.

There is a bit of CI/CD set up with travis inside the travis subfolder.

I would have worked more on the styles and on the responsiveness for mobile.
