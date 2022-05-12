# Roman-Movie

...

## Movie sources

From LokLok App.  
Documentation API: [https://documenter.getpostman.com/view/18986031/UVXdNeFD](https://documenter.getpostman.com/view/18986031/UVXdNeFD)

## Main technology used

- React, Typescript, Tailwind
- Zustand (State management)
- SWR (Data fetching)
- Firebase (authentication, comment)
- Swiper (slider)
- react-infinite-scroll-component (Infinite loading)

## Features

- Full HD movies with subtitles in many languages
- Suggested movies
- Top searches
- Search by name
- Filter by region, categories, periods
- Discovery feature (Short videos like tiktok)
- Watch history
- Comments (require authentication using google)

## Installation

- Clone the Project
- Run `npm install`
- Create your own firebase project and add _The JSON stringified_ config to `VITE_FIREBASE_CONFIG` environment variable

- Example .env file:

```env
VITE_FIREBASE_CONFIG={"apiKey":"","authDomain":"","projectId":"","storageBucket":"","messagingSenderId":"","appId":""}
```
