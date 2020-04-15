# SENG300project

## Overview

The following is a scholarship web application, primarily to be used by students to apply to various scholarships.

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

In order to connect to database, download `config.js` (provided on Discord) and place in root directory of project.
