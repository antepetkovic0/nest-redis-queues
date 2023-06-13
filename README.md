# Nest Queues

Sample for learning basics of queues based on Redis in Nest

## Problem description

Implement queues for 3 types of jobs: import data, export data and notify completion.
Specific job is called based on `/invoke` route body parameters.

_Route parameters_

- `withData`: boolean
- `withDelay?`: boolean

```
if (withData) {
  if (withDelay) {
    // start delayed import data job
  } else {
    // start notify completion job
  }
} else {
  // do some calculations
  if (withDelay) {
    // start delayed import data job
  } else if (lastPage) {
    // start notify completion job
  }
}
```

**Notify completion**

Enqueue and fire as soon as possible job

**Import data**

Enqueue with specific delay job

Job receives parameter `isForNotifyCompletion`

If `isForNotifyCompletion` import data job should call notify completion job after import data is finished

**Export data**

Enqueue and fire as soon as possible job

## Todos

- [x] invoke route and belonging service
- [x] register 3 separate queues for each job
- [x] implement consumers and producers for each of queues

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
