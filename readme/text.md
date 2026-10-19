You are a senior full-stack TypeScript architect.

I want you to initialize and configure a production-style full-stack web application monorepo named:

project04

IMPORTANT:
- Use pnpm as package manager.
- Use Turborepo for monorepo management.
- Use Next.js for the frontend.
- Use TypeScript everywhere.
- Use Tailwind CSS.
- Use React.
- Use TanStack Query v5 for all client-side server-state management.
- Use tRPC for type-safe communication between frontend and backend.
- Use MongoDB as database.
- Use Zod for validation.
- Use ESLint and strict TypeScript.
- Do NOT use gRPC. Use tRPC.
- Use the latest stable compatible versions of dependencies.
- Do NOT use outdated APIs.
- Follow the current official documentation for Next.js, tRPC and TanStack Query.

==================================================
1. REQUIRED FOLDER STRUCTURE
==================================================

Create exactly this monorepo architecture:

project05/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── providers/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   └── ...
│   │
│   └── api/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   │
│   ├── client/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── trpc.ts
│   │   │   ├── query-client.ts
│   │   │   └── provider.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── server/
│       ├── src/
│       │   ├── index.ts
│       │   ├── trpc.ts
│       │   ├── context.ts
│       │   ├── db/
│       │   │   ├── client.ts
│       │   │   └── index.ts
│       │   ├── routers/
│       │   │   └── index.ts
│       │   ├── modules/
│       │   ├── schemas/
│       │   └── utils/
│       ├── package.json
│       └── tsconfig.json
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── .gitignore
├── .env.example
└── README.md


==================================================
2. ARCHITECTURE
==================================================

The application must follow this architecture:

User
  ↓
Next.js
  ↓
TanStack Query
  ↓
tRPC Client
  ↓
tRPC API
  ↓
packages/server
  ↓
MongoDB
  ↓
tRPC Response
  ↓
TanStack Query Cache
  ↓
Next.js UI


Responsibilities:

apps/web
----------------
- Next.js frontend
- UI
- pages
- layouts
- forms
- client components
- loading states
- error states
- TanStack Query usage
- calls shared client package

apps/api
----------------
- HTTP entry point for tRPC
- Run separate API server
- Default port: 4000
- Should NOT contain business logic
- Should delegate API logic to packages/server

packages/client
----------------
- Shared tRPC client
- TanStack Query configuration
- QueryClient
- tRPC client configuration
- Provider
- Frontend-facing API utilities

packages/server
----------------
- tRPC initialization
- routers
- procedures
- Zod schemas
- MongoDB connection
- database operations
- business logic
- server-side validation
- shared AppRouter type


==================================================
3. PNPM WORKSPACE
==================================================

Create:

pnpm-workspace.yaml

with:

packages:
  - "apps/*"
  - "packages/*"

Do NOT create unnecessary nested workspaces.

The root project must control the workspace.


==================================================
4. ROOT PACKAGE.JSON
==================================================

Create a private root package.json.

It should contain only root-level monorepo tooling.

Example responsibilities:

- turbo dev
- turbo build
- turbo lint
- turbo typecheck

IMPORTANT:

Avoid Turbo recursive-script loops.

Only the root package should contain:

"dev": "turbo dev"

apps/web must use:

"dev": "next dev"

apps/api must use:

"dev": "tsx watch src/index.ts"

Never put:

"dev": "turbo dev"

inside workspace packages.


==================================================
5. TURBOREPO
==================================================

Configure turbo.json.

Tasks should include:

dev
build
lint
typecheck

The dev task should support persistent development processes.

Build dependencies should respect workspace dependencies.

Example concept:

build:
  dependsOn:
    - "^build"

dev:
  persistent: true
  cache: false

Configure this according to the current Turborepo schema.


==================================================
6. NEXT.JS WEB APPLICATION
==================================================

apps/web must be a modern Next.js application.

Use:

- Next.js
- App Router
- TypeScript
- React
- Tailwind CSS
- ESLint
- React Compiler if supported by the selected stable Next.js setup

Do NOT use Pages Router.

Do NOT create unnecessary API routes inside Next.js.

The backend API will be handled by apps/api.


==================================================
7. NEXT.JS WEB PACKAGE DEPENDENCIES
==================================================

Install only required frontend dependencies.

Expected important dependencies:

- next
- react
- react-dom
- @tanstack/react-query
- @tanstack/react-query-devtools
- @trpc/client
- zod

Use the current tRPC TanStack React Query integration recommended by the official tRPC documentation.

Do not blindly use outdated tRPC APIs.

If the current recommended integration requires additional tRPC packages, install them.


==================================================
8. TANSTACK QUERY
==================================================

TanStack Query is a CORE part of this project.

Use the current TanStack Query v5 API.

The architecture must support:

1. useQuery
2. useMutation
3. useQueryClient
4. query invalidation
5. query refetching
6. query caching
7. staleTime
8. gcTime
9. enabled
10. select
11. placeholderData
12. initialData
13. prefetchQuery
14. fetchQuery
15. setQueryData
16. getQueryData
17. removeQueries
18. resetQueries
19. cancelQueries
20. optimistic updates
21. rollback
22. mutation lifecycle
23. mutation pending state
24. mutation error state
25. mutation success state
26. mutation variables
27. mutation context
28. dependent queries
29. parallel queries
30. pagination
31. infinite queries
32. query key management
33. cache management
34. background refetching
35. retry configuration
36. error handling
37. loading states
38. stale/fresh state

Do NOT implement every feature in the first UI.

Instead:
- configure the architecture so all these features can be added cleanly
- demonstrate the important ones with the Task CRUD feature
- teach/implement the others progressively later.


==================================================
9. TANSTACK QUERY CLIENT
==================================================

Create a reusable QueryClient configuration.

Example responsibilities:

packages/client/src/query-client.ts

Configure:

- default staleTime
- gcTime
- retry
- mutation retry policy
- refetchOnWindowFocus where appropriate

Avoid creating a new QueryClient on every render.

For browser usage, create the QueryClient safely.

For Next.js App Router, correctly handle client/server boundaries.

Do not create a shared global browser QueryClient that can leak state between users.


==================================================
10. tRPC
==================================================

Use tRPC as the API layer.

The server should contain:

initTRPC
router
publicProcedure
context
AppRouter

Example architecture:

packages/server/src/trpc.ts
packages/server/src/context.ts
packages/server/src/routers/index.ts
packages/server/src/index.ts


The final server should expose:

appRouter

and:

export type AppRouter = typeof appRouter;


The client package should consume AppRouter as a TYPE ONLY.

Never import server runtime code into the browser.


==================================================
11. tRPC API SERVER
==================================================

apps/api is the HTTP server.

Default:

http://localhost:4000

The API server should expose the tRPC router.

Use a lightweight HTTP server/runtime appropriate for the current tRPC setup.

Do NOT put business logic inside:

apps/api/src/index.ts

Instead:

apps/api
    ↓
packages/server
    ↓
routers
    ↓
business logic
    ↓
MongoDB


==================================================
12. MONGODB
==================================================

Use MongoDB.

Use the official MongoDB Node.js driver unless there is a strong architectural reason to use another approach.

Database:

task_manager

Initial collection:

tasks


Create:

packages/server/src/db/client.ts

The MongoDB connection should be reusable and safe for development.

Use environment variable:

MONGODB_URI

Example:

MONGODB_URI=mongodb://127.0.0.1:27017


Create:

.env.example

Never commit real secrets.

Do not hardcode MongoDB credentials.


==================================================
13. DATABASE MODEL
==================================================

Initial Task model:

Task:

{
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
}


MongoDB may internally use ObjectId.

BUT:

Do not expose raw MongoDB ObjectId objects to the client.

Convert database IDs into safe string IDs before returning API responses.


==================================================
14. ZOD VALIDATION
==================================================

Use Zod for all important API input validation.

Example:

CreateTaskInput

{
  title: string
}

Rules:

- title must be a string
- minimum length 1
- trim whitespace
- reasonable maximum length

Create schemas inside:

packages/server/src/schemas/


Validate all tRPC inputs on the server.

Never trust client input.


==================================================
15. INITIAL TASK ROUTER
==================================================

Create:

packages/server/src/routers/task.ts

Task router must eventually support:

getAll
getById
create
update
toggle
delete
deleteAll


Use tRPC:

query
mutation


Example architecture:

task.getAll
task.getById
task.create
task.update
task.toggle
task.delete
task.deleteAll


==================================================
16. INITIAL CRUD FLOW
==================================================

Implement this first:

GET ALL TASKS

Frontend:

TanStack Query
      ↓
tRPC
      ↓
task.getAll
      ↓
MongoDB
      ↓
tasks
      ↓
response
      ↓
TanStack Query cache
      ↓
UI


CREATE TASK

User enters title
      ↓
useMutation
      ↓
tRPC task.create
      ↓
Zod validation
      ↓
MongoDB insert
      ↓
response
      ↓
invalidate task.getAll
      ↓
refetch
      ↓
UI updated


UPDATE TASK

useMutation
      ↓
tRPC task.update
      ↓
MongoDB
      ↓
invalidate/update cache
      ↓
UI


DELETE TASK

useMutation
      ↓
tRPC task.delete
      ↓
MongoDB
      ↓
invalidate task.getAll
      ↓
UI


==================================================
17. TANSTACK QUERY MUTATION PATTERN
==================================================

Use modern TanStack Query v5 mutation patterns.

Every important mutation should correctly handle:

isPending
isError
error
isSuccess
data
variables
onMutate
onError
onSuccess
onSettled

Where appropriate implement:

queryClient.invalidateQueries()

For example:

create task
    ↓
successful mutation
    ↓
invalidate tasks query
    ↓
background refetch
    ↓
updated UI


For update/delete, demonstrate both:

1. invalidateQueries approach
2. setQueryData approach

For optimistic updates demonstrate:

onMutate
    ↓
cancelQueries
    ↓
snapshot previous data
    ↓
optimistically update cache
    ↓
onError rollback
    ↓
onSettled invalidate


Do not use optimistic updates everywhere unnecessarily.


==================================================
18. QUERY KEY ARCHITECTURE
==================================================

Use a clean query key strategy.

Do not randomly create query keys throughout components.

Create reusable query option/key helpers where appropriate.

Example conceptual structure:

tasks
tasks.list
tasks.detail
tasks.detail(id)


The architecture should make cache invalidation predictable.


==================================================
19. CLIENT PROVIDERS
==================================================

Create:

packages/client/src/provider.tsx

It should correctly provide:

- QueryClientProvider
- tRPC provider/integration required by the current tRPC version
- TanStack Query

Then expose the provider to:

apps/web


Next.js:

app/layout.tsx

must use the provider correctly through a client boundary.

Do not make the entire application unnecessarily client-only.


==================================================
20. DEVELOPMENT TOOLS
==================================================

Install/configure:

@tanstack/react-query-devtools

Make Devtools available during development.

This should allow inspection of:

- queries
- query keys
- cached data
- stale state
- fetching state
- mutations
- mutation status


==================================================
21. WEB UI
==================================================

Create a clean initial TaskFlow interface.

Home page should contain:

TaskFlow

"Full-stack Task Manager"

Features:

- Add Task form
- Task list
- Complete task
- Update task
- Delete task
- Delete all tasks
- Loading state
- Empty state
- Error state
- Success feedback

Use Tailwind CSS.

Keep UI responsive.

Do not over-design initially.


==================================================
22. ENVIRONMENT
==================================================

Create:

.env.example

with:

MONGODB_URI=mongodb://127.0.0.1:27017

For frontend/API URL use environment variables where appropriate.

Example:

NEXT_PUBLIC_API_URL=http://localhost:4000

Do not expose MongoDB credentials to the browser.


==================================================
23. TYPESCRIPT
==================================================

Use strict TypeScript.

tsconfig must have:

"strict": true

Avoid:

any

unless absolutely unavoidable.

Prefer:

unknown

with proper type narrowing.

Use type-only imports where appropriate.

Make workspace package imports strongly typed.


==================================================
24. WORKSPACE PACKAGE NAMES
==================================================

Use clear package names:

@repo/web
@repo/api
@repo/client
@repo/server


The frontend should import:

@repo/client

The client package should consume:

AppRouter

from:

@repo/server

using type-only imports where appropriate.


==================================================
25. PACKAGE RESPONSIBILITIES
==================================================

@repo/web
----------------
Only frontend/UI responsibilities.

@repo/api
----------------
Only HTTP/API entrypoint.

@repo/client
----------------
tRPC client + TanStack Query integration.

@repo/server
----------------
tRPC router + validation + database + business logic.


Do not mix these responsibilities.


==================================================
26. SCRIPTS
==================================================

Root:

pnpm dev
pnpm build
pnpm lint
pnpm typecheck


Web:

pnpm dev
pnpm build
pnpm lint


API:

pnpm dev
pnpm build


Avoid recursive Turbo scripts.

Correct:

root:
"dev": "turbo dev"

web:
"dev": "next dev"

api:
"dev": "tsx watch src/index.ts"


==================================================
27. ROOT COMMANDS
==================================================

The project must support:

pnpm install

pnpm dev

pnpm build

pnpm lint

pnpm typecheck


Running:

pnpm dev

from project04 root should start:

Next.js
→ localhost:3000

API
→ localhost:4000


Do not require manually starting each workspace unless necessary.


==================================================
28. ERROR HANDLING
==================================================

Create a clean error-handling strategy.

Handle:

- validation errors
- database errors
- API errors
- network errors
- query errors
- mutation errors

Frontend should display user-friendly messages.

Never expose sensitive database errors to the browser.


==================================================
29. CODE ORGANIZATION
==================================================

Do not put everything in one file.

Separate:

routes
schemas
database
business logic
client configuration
providers
components
hooks
types


Use feature-based organization where useful.

Keep components small and reusable.


==================================================
30. FUTURE FEATURES
==================================================

Design the architecture so these can be added later without restructuring the whole project:

Authentication
- Register
- Login
- Logout
- Session
- Protected routes

Users
- User profile

Tasks
- Pagination
- Search
- Filtering
- Sorting
- Categories
- Priority
- Due dates

TanStack Query
- Infinite Query
- Prefetching
- Optimistic updates
- Query persistence
- Advanced cache management

Application
- Dashboard
- Notifications
- File upload
- Admin panel


DO NOT implement all future features now.

Only prepare clean architecture for them.


==================================================
31. SECURITY
==================================================

Follow basic production security practices.

- Validate every API input.
- Never trust frontend validation.
- Never expose MONGODB_URI.
- Never return database internals unnecessarily.
- Avoid raw error leakage.
- Use secure authentication architecture when authentication is added.
- Keep secrets in environment variables.


==================================================
32. GIT
==================================================

Create a proper .gitignore.

Ignore:

node_modules
.next
.env
.env.local
.turbo
dist
build
coverage


Create a README.md explaining:

- project architecture
- folder structure
- installation
- environment variables
- development commands
- build commands
- API architecture
- TanStack Query architecture
- tRPC architecture
- MongoDB setup


==================================================
33. INITIAL INSTALLATION
==================================================

Initialize the monorepo first.

Install dependencies in the correct workspace.

Do not randomly install every package in the root.

Use workspace-specific dependencies.

Use pnpm workspace commands correctly.

Example conceptual commands:

pnpm install

pnpm --filter @repo/web add ...
pnpm --filter @repo/api add ...
pnpm --filter @repo/client add ...
pnpm --filter @repo/server add ...


Use the latest stable compatible versions.

Do not hardcode outdated versions.


==================================================
34. IMPORTANT CURRENT API REQUIREMENT
==================================================

Before generating tRPC code:

Check the current tRPC v11 documentation.

Use the current recommended TanStack React Query integration.

Do NOT blindly use old:

createTRPCReact()

patterns if the current recommended integration has changed.

Similarly:

Before generating TanStack Query code:

Use TanStack Query v5 syntax.

Do NOT use React Query v3/v4 syntax.


==================================================
35. DO NOT DO THESE THINGS
==================================================

Do NOT:

- use gRPC
- use REST as the main API layer
- use Prisma unless specifically requested
- use Redux for server state
- use Axios unless actually needed
- put database logic in Next.js components
- put database logic in apps/api
- put business logic in apps/web
- put secrets in frontend code
- use any unnecessarily
- create duplicate QueryClients
- create recursive Turbo scripts
- use outdated TanStack Query APIs
- use outdated tRPC APIs
- create unnecessary folders
- create unnecessary dependencies


==================================================
36. INITIAL PROJECT FEATURE
==================================================

After initialization, make the application actually work.

The first complete feature must be:

TASK CRUD

Flow:

Next.js
↓
TanStack Query
↓
tRPC
↓
apps/api
↓
packages/server
↓
MongoDB


User should be able to:

1. Create task
2. See task list
3. Mark task completed
4. Edit task
5. Delete task
6. Delete all tasks


Every operation must demonstrate proper:

Query
Mutation
Cache
Invalidation
Loading
Error
Success


==================================================
37. VALIDATION CHECK
==================================================

After creating everything, verify:

1. pnpm install
2. pnpm dev
3. web starts on 3000
4. api starts on 4000
5. MongoDB connection works
6. task.getAll works
7. task.create works
8. task.update works
9. task.toggle works
10. task.delete works
11. TanStack Query cache works
12. mutation invalidation works
13. TypeScript passes
14. ESLint passes
15. production build passes


Run:

pnpm typecheck
pnpm lint
pnpm build


Fix all errors before declaring initialization complete.


==================================================
38. HOW TO WORK
==================================================

Do NOT blindly overwrite existing files.

First inspect the current project.

If project04 already exists:

1. inspect current folder structure
2. inspect package.json files
3. inspect pnpm-workspace.yaml
4. inspect turbo.json
5. inspect existing Next.js setup
6. inspect installed dependencies
7. preserve correct existing configuration
8. modify only what is necessary


If something is already correctly configured, do not recreate it.

If there is a conflict, explain the conflict and fix it safely.


==================================================
39. FINAL OUTPUT
==================================================

After initialization, provide:

A. Final folder tree

B. All installed dependencies grouped by workspace

C. Important configuration files

D. Development commands

E. Environment variables

F. Architecture explanation

G. Request/data flow explanation

H. TanStack Query architecture

I. tRPC architecture

J. MongoDB architecture

K. What was implemented

L. What should be implemented next


IMPORTANT:

Do not just create empty folders.

Create a working foundation.

The project must be ready for me to continue building a real production-style full-stack website on top of it.

Start by inspecting the existing project04 folder and then initialize/fix the complete architecture.