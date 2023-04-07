<p align="center">
  <a href="https://pokedex71596.gatsbyjs.io/">
    <img alt="Gatsby" src="./static/favicon.ico" width="60" />
  </a>
</p>
<h1 align="center">
  Pokédex
</h1>

## ✨ Deployed website

The website is publicly deployed on Gatsby Cloud at this address: https://pokedex71596.gatsbyjs.io/

## 🚀 Quick start

1.  **Run on localhost**

    All you have to do to have the project up and running on your machine is to run the following command on terminal. The only requirement is having Docker installed.

    ```shell
    git clone git@github.com:malunem/pokedex.git && cd pokedex && docker-compose up develop
    ```

    At the end, you will be promped to view the website at http://localhost:8000

    After the first run, you can restart it with:

    ```bash
    docker-compose up develop
    ```

2.  **Run tests**

    Navigate into the project root directory and run the command:

    ```shell
    npm test
    ```

    This will execute:

    - prettier (with pretty-quick) - to check style and indentation consistency
    - tsc (strict mode) - to verify that typescript compiles correctly
    - eslint (with AirBnb configs and some custom rules) - to ensure best practices and code quality
    - jest (with coverage report) - for unit tests on components
    - cypress (running headlessly) - for end to end tests on pages

    End to end tests could also be run with Cypress opened:

    ```bash
    npm run cy:open
    ```

    Please note that Cypress will report some accessibility issues checked with a11y: they are relative to ChakraUI Toast components and there is an [issue](https://github.com/chakra-ui/chakra-ui/issues/7324) open on their repo.

3.  **Build for production**

    You can start a production build by running the following command. This will build the project for production after running all the tests, only if they pass.

    ```bash
    npm run build
    ```

4.  **Deploy**

    The project is automatically deployed when the `main` branch is updated.

## 📘 About

The website is built with a mobile-first approach, with responsiveness for all devices. It uses `ChakraUI` components, that support accessibility.

Images are handled with lazy loading and a blurred version is showed during loading.

Internationalization is managed with `i18next` plugin for English, French and Italian.

It's possibile to search Pokémons by name. Index and research engine are provided by the plugin `gatsby-plugin-flexsearch`. It is configured to allow searching by Pokémon translated names (in French a lot of names are different).

All Pokémon data is fetched at build time with REST APIs by the custom plugin `pokemon-plugin` which can be found in `/plugins/`.

All pages are created at build time. The project contains 200 Pokémons.

If Pokémon REST APIs return errors or there is some network issue, the plugin retries to fetch data recursively with increasing delay, to ensure the website is never built without data.
