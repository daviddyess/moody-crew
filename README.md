# MoodyCrew.us

A clan website for the Moody Crew and Counter-Strike:Source

## GraphQL

This project uses `graphql-hooks` for inline queries in functional components. See the tagged 1.0.0 version an older project that used `react-redux` and a REST API.

A complementary GraphQL API is offered [here](https://github.com/daviddyess/steam-graphql).

## .env Variables

- This project has changed the PORT environment variable to `3006`.
- REACT_APP_HTML_TITLE sets the HTML `<title>` tag (using Helmet).
  - Note: In development mode (`npm start`), the server has to be restarted for this to take effect.
- See [here](https://create-react-app.dev/docs/advanced-configuration) and [here](https://create-react-app.dev/docs/adding-custom-environment-variables) for more details regarding .env variables and usage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
