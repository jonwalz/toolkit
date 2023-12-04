# Writer's Toolkit

DB management https://supabase.com/dashboard/project/ivyetfewzyvpkmjdtyiy

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

A testing framework is yet to be added.

This project uses Next.js's built-in ESLint support for linting. To run linting, use:

```bash
npm run lint
```

## Building

To build the application for production, use:

```bash
npm run build
```

## API

The server API is built with tRPC. You can find the API code in `src/server/api/trpc.ts`. If you want to modify the request context or create a new middleware or type of procedure, you can edit this file.

## Middleware

The middleware is responsible for handling requests and responses. You can find the middleware code in `src/middleware.ts`.

## Hooks

The project uses React hooks for managing state and side effects. You can find the hooks in `src/hooks`.

## UI Components

The UI components are built with React. You can find the components in `src/components`.

## License

This project is licensed under the MIT License.
