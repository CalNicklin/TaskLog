---
title: 'OTL-Scorm'
description: 'Implementing SCORM packaging & interfacing to AI generated courses'
pubDate: 'Feb 03 2024'
# heroImage: '/placeholder-hero.jpg'
---

### Approaching SCORM

Late last year James and I built a successful proof of concept that showed AI's viabililty for creating in-context, story driven learning courses.
Now, we're taking that into production and the first milestone is exporting courses that are SCORM compliant, kinda like an eLearning API spec that makes courses compatible with most LMS'

### Task

Architect + build the process that transforms a course JSON into a standalone SCORM compliant learning webapp.

#### Step 1 - Understand SCORM

I read *all* of the docs. That's over 500 pages of 20year olddocs! 

#### Step 2 - Can SCORM work with a modern SPA?

There was no way I was going to build pure HTML courses, at the very least I wanted to build a React app. So I spun up a Vite app to get started quickly and focus on SCORM interfacing. I found the Scorm Provider API that used context and higer order components to implement SCORM interfacing, but it was pretty old school and just didn't really reliably in my case. Because LMS' open SCORM courses in an iFrame, the next error I had was CORS issues with a purely client side app. So, I overcame this by implementing the React build as a SSR app. Next I kept searching for modern SCORM implementations and came across the awesome useScorm library by Bloc Digital. Finally! A modern typescript library for implementing Scorm in React and with an MIT Licence! Perfect. I used this code and re-packaged it into a library with stricter typing, additional testing and API documenting. Now can boot up a SCORM app in an LMS and initialise with suspend data.

#### Step 3 - Architecting the webapp.

I built this as a monorepo in two parts: SCORM library, and webapp where the learner would take a course. The webapp would only ever reference the SCORM dist/ files and it was treated as a dependency, with a view that when ready the SCORM part would be a private package and the submodule. The webapp itself is pretty simple: a landing page and a lesson template. The webapp references a JSON file in the root directory which gets built into the app forming the pages. The most interesting challenge here was in defining two rollups: 1. the regular webapp, and 2. an offline ready app that can be run locally as a 'preview' build, so a learning designer could take the course without an LMS. 

Two things were required for the latter. Implementing 'mode' variables for Vite so it could specify a fully inlined build for previews, and adding some conditional rendering in the app to handle offline situations. 
- Conditional #1: Use a HashRouter instead of BrowserRouter when SCORM is undefined (offline), so navigation is possible.
- Conditional #2: Initialise the app state with a simulation of the SCORM suspended data of SCORM is unavailable.

After building, we use simple-scorm-packager to zip the whole thing up with the required manifests and XML.

#### Step 4 - Building the export server.

With the library, app and build config ready, last step is to automate the process. I had to learn how to execute the various command line steps from within a node server. ChatGPT pointed me in the direction of Child Processes and I found out about exec, execSync, spawn etc. I built a simple Express server, wrapped the monorepo in it, hosted it on Render. The server has only ephemeral storage, and dispatches a built app from the dist folder which is overwritten with each request. It receives the course JSON, initialises a build under a child_process, zips it up and sends it back directly into the client's downloads folder.
