# ignews

![ignews image preview](https://github.com/hstrada/ignite-reactjs/blob/master/.github/03-ignews.png?raw=true)

---
## 👨‍💻️ Technologies Used

This project was developed using the technologies bellow:
  
### FrontEnd

  - [ReactJS](https://pt-br.reactjs.org/)
  - [Next.js](https://nextjs.org/)
  
### Dependencies

  - [Typescript](https://www.typescriptlang.org/)
  - [axios](https://axios-http.com/docs/intro)
  - [faunadb](https://fauna.com/)
  - [prismic.io](https://prismic.io/)
  - [stripe](https://dashboard.stripe.com/login)

### IDE

  - [Visual Studio Code](https://code.visualstudio.com/)

---

## 📦️ How to install the project

> [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) are required

To clone the project, use the commands bellow:

```bash
  # Clone the repository
  ❯ git clone ${url_repository}

  # Enter directory
  ❯ cd ${folder}
  
  # install
  ❯ yarn

  # run
  ❯ yarn dev
```

---

> access localhost:3000

---

## Stripe

> stripe listen --forward-to localhost:3000/api/webhooks

ctrl+c -> ctrl+v

`STRIPE_WEBOOK_SECRET=`

## Prismic.io

### Node Compatible Version

> nvm install 16.3.0

> nvm use 16.3.0

### Install

> npx @slicemachine/init

> yarn run slicemachine

Running on http://localhost:9999

---
