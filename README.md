# Online Book Finder

Online Book Finder project  allows users to search for books and retrieve detailed information about them.

## Demo Link

**[Online Book Finder](https://online-book-finder.vercel.app/)**
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Tools Used](#tools-used)
- [Future Considerations](#future-considerations)


## Pages

- **Catalogue**: Enter the book you want to find in input box and it would list the search results with pagination support
- **Book Details**: Shows details of any book including its authors, publication date, ratings, and more.

## Getting Started

### Prerequisites

To get started with the development environment, you will need:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Priyesha/online-book-finder.git
```

2. Navigate to the project directory:

```bash
cd online-book-finder
npm install
# or yarn install
```

### Running the App

```bash
npm start
```

To run tests, you can run

```bash
npm test
```

## Tools Used

- **React CRA**: Used create-react-app standard react template that provides the basic barebone react app with needed scripts.
  
- **TypeScript**: Is used to provide type safe and maintainable code.
  
- **React Material-UI**: MUI provides components that implement Google's Material Design and can be customized using theme variables and styled components

- **react-router-dom**: Used to register various routes.

- **jest and react-testing-library**: To write unit tests for the components to check their behaviour

- **Vercel**: Used to quickly deploy and spin up a basic CI/CD pipeline that deploys the code when you push to main branch

## Future Considerations

- **Server Side rendering** : This app can be converted into a Next.js app that gives server side rendering capabilities. That would help in SEO of app. For the same reason search queries are included in query params to help the web crawlers rank the results (for eg: search for "harry potter books" can rank our page of https://online-book-finder.vercel.app/?query=harry+potter)

- **End to end tests** : Can be written using cypress to check the behaviour of app stays same with new changes pushed.
