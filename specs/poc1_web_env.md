# POC 1

Chosen components
- svelte
- https://mdsvex.com/  (markdown in svelte)
- create some components using tailwindcss and use inside mdsvex
- https://inertiajs.com/ but inside a nodejs server (e.g. based on https://github.com/eidellev/inertiajs-adonisjs, there are others)
- gunjs in nodejs and example in the website
- client to our substrate and stellar inside nodejs

## develop poc use case

- mini website (use some tailwind components + markdown pages)
- mini api, so we can remotely trigger the server to do something, do rather random, data creation (some json), store on filesystem or so

## deployment

- deployment
    -    packaged nodejs server
    -    redis server
- check https://github.com/evanw/esbuild
    - see if we can build for Ubuntu and deploy on other machine
    - size of bundle
    - performance to build
- memory usage
    - install caprover (8GB)
    - create vlang deploy script (use docker primitives, expand where needed) to deploy containers with the nodejs solution in constrained mem space
    - mem to test: 30MB, 40, 60, 80
    - through Vlang use threads, stress test the nodejs servers, each nodejs server only 1 user  = put in driver container
    - see what performance is
    - check the performance tools as part of caprover so we see what is going on

## remarks

- try to avoid having to use sveltekit or alternative for now, normally the inertiajs should be able to deal with it

## questions

- can we use https://deno.land/ ??? how much work would it be to port certain required libraries
- adonisjs might be too much? yes or no, mem impact?
- there are probably some configuration params we can set to run better (less mem), our usecase is very different compared to std, we run only 1 client

