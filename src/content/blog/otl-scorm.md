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

#### Step 2 - Can SCORM workw

There was no way I was going to build pure HTML courses, at the very least I wanted to build a React app. So I spun up a Vite app to get started quickly
