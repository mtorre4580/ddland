# DDLand

Create landings pages quickly and easily

[Website](https://ddland.vercel.app/)

- Create your landings by dragging blocks
- See your changes in real time
- Share your creations

<div style="display: flex; justify-content:center">
    <img style="max-width:100%; border-radius: 10px" src="https://raw.githubusercontent.com/mtorre4580/ddland/main/docs/images/basic.png" alt="DDLand">
</div>

## Getting Started

First, run the development server:

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
- Internationalized Routing with Next.js
- Avoid collision css with CSS in modules
- Integration Next.js with [TypeScript](https://www.typescriptlang.org/)
- Tooling: Eslint, [Prettier](https://prettier.io/), [Conventionoal Commits](https://www.conventionalcommits.org/en/v1.0.0/), [Husky](https://www.npmjs.com/package/husky)

## Changelog

Last features https://github.com/mtorre4580/ddland/blob/main/CHANGELOG.md

## Author

[Matias Daniel Torre](https://www.linkedin.com/in/mtorre4580)
