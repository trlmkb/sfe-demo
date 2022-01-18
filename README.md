ðŸš¨ Be sure to update this file according to your team.

## Run the project

- To run this project you will need [Node](https://nodejs.org/en/). We strongly recommend to use [nvm](https://github.com/nvm-sh/nvm) for installing node.
- After installing nvm go to project directory and run:
  - `nvm install [version in .nvmrc file]`
  - `nvm use`
  - `npm install`
  - `npm start` - builds project for development

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs all linters and prettier and shows any warnings/errors in console.

### `npm run storybook`

Runs storybook for development.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

## Git Guidelines

New features should be developed in separate branches starting with the `feat/` prefix, for example: `feat/IDX-2_some-new-feature`. The `IDX-XX` part is an issue number from JIRA, if there's no issue for this feature, feature key can be omitted.

Start commit messages with `JIRA issue number` + `Fix`, `Add`, `Remove`, `Change`, etc. instead of `Fixed`, `Added`, `Removed`, `Changed`.

Commit messages should describe what will be done with this commit. Some examples:

- IDX-2 Add lodash to devDependencies
- IDX-2 Fix memory-leak in worker tasks
- IDX-2 Remove lodash from devDependencies
- IDX-2 Add functionality for pausing worker tasks
- IDX-2 Change the layout of the dashboard page

You may specify multiple issue number if commit is relevant for them or if using subtasks:

- IDX-2, IDX-3 Change the layout of the dashboard page

This enables to easily locate branch or related commits directly from JIRA story or lookup story when looking at commit history.
