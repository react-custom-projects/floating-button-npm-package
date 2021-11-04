# The main purpose of this project is to create an NPM package from a React component then publish it

## If you want to have your own NPM package using this setup:
- Make sure to update the ***name*** of the package inside **package.json** file to a unique name
- If you want to make updates to your library make sure to update the ***version*** inside **package.json** file

## It uses 2 important libraries:

### storybook:

- It allows you to create UI components in isolation.
- Documentations link: [storybook](https://storybook.js.org/)

### rollup.js:

- It's a bundler tool similar to webpack but much easier.
- Documentations link: [rollupjs](https://rollupjs.org/guide/en/)

## Create, check, build and publish a component:

### Create:

- Add your component in **components** directory
- Add your styles in styles.scss <br><br>
***Note***: if you want to create a package with many components inside it make sure to include
 the required styles file for each one
 
### Check:
 
- Create a new story for your component in **stories** directory and follow the instructions on **storybook** site.
 
### Build:
 
- Run ***yarn build-lib*** command
 
### Publish:
  
- Sign in to your npm account:
    **npm login**
- Publish your package: 
    **npm publish**

## Available Scripts

In the project directory, you can run:

### `yarn storybook`

Runs the storybook in development mode <br>
It will open [http://localhost:6006](http://localhost:6006) automatically in the browser to see your stories.

### `yarn build-storybook`

Builds the storybook for production.

### `yarn build-lib`

Builds your npm package using rollup.
