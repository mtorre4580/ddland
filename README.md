# DDLand

[![Build Status](https://travis-ci.com/mtorre4580/ddland.svg?branch=main)](https://travis-ci.com/mtorre4580/ddland)
[![Deployment Status](https://img.shields.io/endpoint?url=https://ddland.app/api/deployment)](https://ddland.app)
[![version](https://img.shields.io/badge/version-0.18-brightgreen)](https://github.com/mtorre4580/ddland/blob/main/CHANGELOG.md)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Dependabot status](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/mtorre4580/ddland/badge.svg)](https://snyk.io/test/github/mtorre4580/ddland)

Create landings pages quickly and easily

[Website](https://ddland.app)

- Create your landings by dragging blocks
- See your changes in real time
- Share your creations

<div style="display: flex; justify-content:center">
    <a href="https://ddland.app">
    <img style="max-width:100%; border-radius: 10px" src="https://raw.githubusercontent.com/mtorre4580/ddland/main/docs/images/basic.png" alt="DDLand">
    </a>
</div>

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

You can use the `.env.local.example` to replace with your connection to use this App

## Stack

This applications has built with Next.js 10

- Handle users passwords via [bcryptjs](https://www.npmjs.com/package/bcryptjs) to generate hash
- UI Components by [react-bootstrap](https://react-bootstrap.github.io/)
- Validate schema via [joi](https://joi.dev/api/)
- Store users and landings with [mongodb](https://www.npmjs.com/package/mongodb) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Handle user session with [next-iron-session](https://github.com/vvo/next-iron-session)
- Drag and Drop features with [react-dnd](https://react-dnd.github.io/react-dnd/)
- Internationalized Routing with [Next.js](https://nextjs.org/docs/advanced-features/i18n-routing)
- Avoid collision css with CSS in modules
- Built with hooks (useReducer, useRef, useContext, useCallback)
- Apply [reinspect](https://github.com/troch/reinspect#readme) to show reducers, debug mode with Redux DevTools
- Integration Next.js with [TypeScript](https://www.typescriptlang.org/)
- Travis CI configuration
- Deployment status via [deployment-badge](https://github.com/FelixMohr/deployment-badge) integration with Vercel and Github
- Tooling: [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), [Husky](https://www.npmjs.com/package/husky)

## Changelog

Last features https://github.com/mtorre4580/ddland/blob/main/CHANGELOG.md

## Author

[Matias Daniel Torre](https://www.linkedin.com/in/mtorre4580)
