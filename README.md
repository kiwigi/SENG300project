# SENG300project

## Overview

The following is a scholarship web application with user authentication, primarily to be used by students to apply to various scholarships.

There are four different types of accounts with different permissions:

+ `Student`
    - Can apply to scholarships if they have the eligible degree / GPA
+ `Professor`
    - Can nominate students for scholarships
+ `Coordinator`
    - Can view statistics on scholarships and review scholarship applications
+ `Admin`
    - Can manage the database and add new scholarships

## Database

[Firebase](https://firebase.google.com/) is used to host our NoSQL database and cloud storage.

Our database is set up in the following order:

+ `Applications`
    - Contains scholarship applications with each key being a unique ID
+ `Degrees`
    - Essentially an enum for University degrees
+ `Scholarships`
    - Contains scholarships and scholarship nominations with each key being a unique ID
+ `Users`
    - Contains the four categories for users, `Student`, `Professor`, `Coordinator`, and `Admin`
    - Each user has their own properties (e.g. `Student` has the property `GPA`) and unique ID

Cloud storage is used to host student's documents, which are uploaded as an attachment to their applications. Coordinators are able to download these documents when reviewing the applications.

In order to connect to database, download `config.js` (provided on Discord / D2L) and place in root directory of project.
