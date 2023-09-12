# APP SKRACH ⚡️

## INTRO

This is an app that allows users to sign up, log in, and start recording music just like they would in a professional studio. It offers the convenience of using independent channels to record multiple tracks and then blend them seamlessly.

Mixing the tracks involves adjusting their relative volumes. 

The app supports collaborative track recording, allowing multiple users (such as band members) to contribute to the same project. Each member can record their instrument and see the recordings of others reflected in the project. 

The aim is to streamline the recording process for what is commonly known as 'demos'—the initial approach to bringing a musical project to life, rather than focusing on studio-quality recordings.

---
---

![](https://odisejastudio.com/wp-content/uploads/2020/04/MIXING.gif)

---
---

## FUNCTIONAL DESCRIPTION

### USE CASES

- Create project
- Modify project
- Record track
- Delete track
- Listen project
- Set up track relative volumes
- Save project
- Delete project

### NEXT VERSION USE CASES

- Set up tracks panning
- Equalize track
- Export project mix as mp3/wav

## TECHNICAL DESCRIPTION

### DATA MODEL

User
- id (Object Id)
- name (string)
- email (string)
- password (string)
- avatar (string)
- projects (array Object Ids refering Project Id)
- description (string)

Track
- id (Object Id)
- project (Object Id refering Project id)
- date (date)
- audio (string - url)
- volume (number)
- delay (number)
- instrument (string)

Project
- id (Object Id)
- name (string)
- date (date)
- owners (array Object Ids refering User Id)
- privacy (string)
- tracks (array of Tracks - embedded model)
- image (string)
- key (string)


---
---

## PLANNING

### TASKS

#### Dashboard

https://www.notion.so/SKRACH-Project-3355f5c9f8d7480493c90527e86468aa

#### UI

- add 'new project' button on the home page
- on click paint edition component
- in edition show an empty project with: dynamic title; add track button, add member button, delete track, back
- on click add track, it creates a new track in database by means of create-track logic
- on click back, goes back to home page

#### Data

- add project data model with fields: id, name, date, owners, privacy, tracks, image, key
- add track data model with fields: id, project, date, audio, volume, delay, instrument

#### List projects

- show all the projects in which the user is a member, including name

#### Open project

- by clicking on a project, open it in the edition component
- by opening a project, show name and the already recorded tracks

### STORIES

#### Sign up

- Register new user providing name, email and password
- Log in

#### Create project

- Create a new project, select participants by email (they must be previously registered in the db)

#### Project opened

- Record on an empty channel or overwrite a used channel
- Delete a recorded track
- Set relative volume of the tracks
- Play the mix
- Autosave changes
- Change project name
- Add or remove project participants

## TESTING

![](https://firebasestorage.googleapis.com/v0/b/skrach-ee29c.appspot.com/o/Test_Coverage.png?alt=media&token=495baee5-2532-4c0c-a811-7d0b236bcf1e)