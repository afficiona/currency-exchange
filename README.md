Currency Exchange pocket app
===========

> An online exchange app built on React
Link: https://afficiona21.github.io/currency-exchange/

## Installation and run
You need node.js and npm/yarn to run the project locally.

## Setup
Install dependencies
```sh
yarn install
OR npm i
```

### Development
Start the local server
```sh
yarn start
OR yarn start
```

### Test
```sh
yarn test
OR npm test
```

### Production
Generate the production build(in build folder of the project)
```sh
yarn run deploy
```
This command also deploys the project directly to github pages.

Once build is generated, run any local server(Python, etc) inside the build directory, and open the localhost url on the browser.

```sh
 yarn global add serve
 serve -s build
```
