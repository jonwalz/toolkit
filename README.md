# Writer's Toolkit

## Installation

To install the project, you need to have Node.js and npm (or yarn) installed on your machine. Then, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/toolkit.git
cd toolkit
npm install
```

## Usage

To start the server, run:

```bash
npm run start
```

The server will start on `http://localhost:3000`.

If you want to contribute to the project, here's how you can do it:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

The project uses vitest

```bash
npm run test
```

This project uses Next.js's built-in ESLint support for linting. To run linting, use:

```bash
npm run lint
```

## Building

To build the application for production, use:

```bash
npm run build
```

## Middleware

The middleware is responsible for handling requests and responses. You can find the middleware code in `src/middleware.ts`.

## Hooks

The project uses React hooks for managing state and side effects. You can find the hooks in `src/hooks`.

## UI Components

The UI components are built with React. You can find the components in `src/components`.

## Database

Database is managed by Supabase:
DB management https://supabase.com/dashboard/project/ivyetfewzyvpkmjdtyiy

To run a supabase DB instance locally, first install docker.

`brew install supabase/tap/supabase`

Then you'll need to install the [supabase CLI](https://supabase.com/docs/guides/cli) and run

```bash
# If you've never initialized supabase:
supabase init

# This will setup the supabase docker container and start the database:
supabase start
```

To get the local studio url, run:

```
supabase status
```

## License

This project is licensed under the MIT License.
