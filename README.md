# readyevent

## Overview
Friends can put in when they are available for a meetup/party (Basically like when2meet). They can also have a shared grocery list that is for BBQ/Birthday party.
Furthermore, everyone can enter who buys/brings what, so you don't end up with too much or too little stuff.

LIVE LINK: https://readyevent.herokuapp.com/

## Tech/framework used
Technology: React, Tailwind CSS, Material UI<br>
API: Google API<br>
Design: Figma<br>
Project Management: Github Projects

## Features

### Login
Login authentication using Google API.
![image](https://user-images.githubusercontent.com/82935527/142176642-a4dce064-a15a-45cd-8b6b-31664e39507c.png)

### Events Page
After logging in, the user will be redirected to the Events Page. Clicking on each event will display the details of the event.
![events page](https://user-images.githubusercontent.com/82935527/142185944-fec7381c-3dda-4842-8557-8b9bf024478c.png)

### Editing Events Info
Edit events from the "edit" icon. 
![edit events](https://user-images.githubusercontent.com/82935527/142187487-040a8893-d66a-4307-8276-7dcf15229aba.png)

### Adding New Events
You can add new events by clicking on "New Event" on the menu bar.
![add new events](https://user-images.githubusercontent.com/82935527/142186133-d5a3af40-b87b-48f5-9031-6d3f77ce2862.png)

### Todo Lists
A part of the todo list are shown in the events details. Click on "..." on the todo list on the event page to view more todos, add, edit, delete todos.
![todo icon](https://user-images.githubusercontent.com/82935527/142186446-2befa378-8fb4-4a6f-a651-66f2ba6280a2.png)
![todo list](https://user-images.githubusercontent.com/82935527/142186464-7e9ec10d-2dbf-4119-b1eb-8c12ae741f92.png)

### Availability Vote and Setting Date
Check participants' available time on this page. Enter your available time and view the voting results. Also set the final time here based on everyone's availability. 
![availability](https://user-images.githubusercontent.com/82935527/142187105-f3fa1c65-e6da-4c9e-adff-753c993cd06c.png)

### Share Event Info on Google Calendar
You can share event info from by clicking on the share icon on the event details page.
![share event info](https://user-images.githubusercontent.com/82935527/142186710-80d81d01-7c16-4182-8a95-d91ca32052af.png)

### Google Calendar
Click on "Google Calendar" on the menu bar to open your Google Calendar. 

## Installation
1. Clone this project locally
2. Run `npm install`
3. Get your own Google API and create an `.env.local` based on `.env.example`
4. Run `npm start` to start the server on http://localhost:3000
5. View the Chingu meeting app

## Deployment
[Heroku](https://dashboard.heroku.com/)

## Contributors
[Teri Eyenike](https://github.com/terieyenike)

[Emir Al](https://github.com/themythia)

[Jihye Kang](https://github.com/bonniekang)

[Aya Takamura](https://github.com/ayarmkt)

[Patrik Glanemann](https://github.com/patrikglanemann)
