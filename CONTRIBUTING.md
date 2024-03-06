# Contributing

### What you will need

1. Download and install [Node.js](https://nodejs.org) latest LTS version


2. Clone the repository

```bash
$ git clone https://github.com/funtini/weather-app-chall.git
```
3. Install required dependencies

```bash
$ npm install
```

## Run

### Development server

To run the project in development mode run:

```sh
$ npm start
```


### Technologies

#### Main

- [React 17](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux-toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [RTK Query](https://redux-toolkit.js.org/) - An optional addon included in the Redux Toolkit package, which is a powerful data fetching and caching tool

#### Development

- [PostCSS](https://postcss.org/) - JavaScript tool for transforming styles with JS plugins
- [ESLint](http://eslint.org/) - Linting utility for JavaScript
- [Babel](https://babeljs.io/) - JavaScript compiler
- [Webpack](https://webpack.js.org/) - Module bundler

#### Contribution

- Commits should follow [Conventional Commits](https://conventionalcommits.org/) message conventions

#### API

- Using [OpenWeather API](https://openweathermap.org/api) 
-- 3 endpoints

```sh
[ A ] /data/2.5/onecall - CURRENT WEATHER AND FORECAST by Coordinates

[ B ] /data/2.5/weather - CURRENT WEATHER by Query

[ C ] /geo/1.0/reverse - GEOLOCATION INFO by Coordinates
```
The use of free OpenWeatherMap API key does not allow us to obtain all information through a single endpoint,
so we are forced to triangulate information between them.

- Issues
  
[A] - It is not able to be called with query parameter and has no info about location (name and country)

[B] - It can be called with query parameter but the response has no info about FORECAST data.

[C] - It is just a geolocation endpoint.

- Solution

**CASE 1 - Fetching user current location / default location in first render** 

Flow:
 
    [ A ] WEATHER and FORECAST -----> [ C ] LOCATION missing info 


**CASE 2 - Fetching weather by search term**

Flow:

    [ B ] WEATHER  -----> [ A ] FORECAST missing info

- API key

You can find/change API key on .env file persisted as REACT_APP_WEATHER_API_KEY

