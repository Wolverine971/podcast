---
title: Basic Interviewing Advice (Part 1)
description: For people just getting into software engineering

---
# Background for this interviewing writeup
I recently conducted some interviews with a few soon to be [Sabio](https://sabio.la/) alums. They were all great to talk to because I had been in the same boat as them when I first started getting into tech and looking back at where they are at now makes me appreciate how far I have come. It also makes me excited to see them early in their journeys and try to help them out. I have interviewed a decent amount myself and have helped other people with interviewing and I want to start documenting some tips and advice. This is specific to the interviews I just conducted this past week in December 14-17 2022 but I am sure others can benefit from this too.

## The "tell me about yourself question"
For this question you should be well rehearsed. There should be a certain rhythm and flow to your answer. And most importantly there should be a story arch or a common thread to your answer. Your answer should be something like: 

> I have done X Y Z and I have learned Q R S and gotten T U V experience and it has led me to getting into software engineering where I have found that I really enjoy solving problems/ figuring things out/ building things.
- Gracefully transition between job experiences. Each experience should ideally build on top of the last one
- End on a strong/ upbeat note

There should be a common thread of being “technical”
- Talk about other complex things you have worked on in different jobs/ domains. This shows you can handle complex situations and problems which is what software engineering is all about
- Mention different responsibilities you have been given in different roles. Be given tasks and be trusted to figure out solutions. 

There are many generic questions like this that you should be prepared for. You should practice all these “soft skill” questions beforehand such as:
- What is your biggest strength?
  - Don't overstate your strength, say something like:
    -  > I gravitate towards X or I really enjoy doing X and over time I have become comfortable or proficient in it 
  - You can say something technical and something soft skill related like: 
    - > I am good at working in teams, collaborating, communicating, learning things on the fly, thinking through edge cases...
- What is your biggest weakness?
  - Be honest with your weakness, it shows self awareness. But also at the end you can talk about how you compensate or mitigate your weakness. You cannot work on your weaknesses if you don't know what they are. 
- What is an accomplishment you are most proud of?
  - This is an opportunity to show you have depth or are versatile or can accomplish big things.
- What is the most challenging thing you have worked on?
  - Talk about something hard you had to figure out and how you went about figuring it out and the impact it had
- Tell me about a time where _______ (and how you resolved it)
  - Use the STAR method- SITUATION, TASK, ACTIONS, and RESULTS
  - Examples are:
    - When you didn't know something
    - When you had conflict/ disagreed with a college or manager
    - When you took initiative
    - When you disagreed with a manager

## Explaining what you have been working on recently
- Layout the business problem
  - Who uses this application, what can it do and what problem does it solve
- Talk about the frontend UI/ APP- What do they see? What can a user do?
  > - “Users login and go to their dashboard and see X”
  > - “Users can then search for X by Y and Z”
  > - “Users can then post and update X” 
- Talk about the Data → what kind of data are you working with → apply who, what, where, when, and why questions to talk about the data
  > - “We get data from X api”
  > - “We store X data”
  > - “Other data we keep track of is X”
  > - “X data is connected to Y data by Z”
  > - “X users see and have access to Y data”
- Talk about what you specifically worked on
  - What underlying CRUD methods did you implement?
    - Users can CREATE READ UPDATE and DELETE what data
    - What can users CREATE, how and where does it get stored?
    - What can users READ, where does it come from and how is it displayed, how is it sorted or ordered, is it searchable?
    - What can users UPDATE and DELETE, what permissions are associated with this?

## Describing your git workflow and how you check-in code
Flow clarification
- Getting Code- Clone repo and pull down code and recent changes. "Get the code on your computer"
- Pushing Code- Create a branch, make changes, push up your changes and create a pull request (PR). "Make changes to the code"
- Merging Code- Pull requests get reviewed, updated and once approved they get merged into the master/ main branch. "Your changes go live"
- Code review process- Companies do this in slightly different ways, make sure you call out how you have done code reviews
  - Who reviews the code?
  - What are they checking in the code?
  - Do you explain your code
    - One on one
    - Comments
    - Pair programming
    - Demoing
  - Once approved who merges the changes
- Have a general idea of how your code gets deployed and goes "live"
  - This can get complicated fast, and is more of a dev ops/ systems engineering
  - Where is it hosted?
    - AWS, Azure, Google Cloud, Digital Ocean, Vercel, Netlify, Github pages, bare metals
  - How does it get to the server
    - There is some process to get your code from the repo to the server it is hosted on
  
## Whiteboarding Questions

### General Advice
- Ask clarifying questions. Scope the problem. Talk through edge cases. Pick a route to go down. 
- A technical question should be conversational, so think out loud and ask the interviewer questions
  - Say “I am thinking X”, then think about X 
  - Say “I think the problem is here”
  - Say “I think there are 2 parts, and I should start here”
  - The interviewer will likely give you hints if you are talking to them
- Be aware of scope
  - Should X be in the for loop?
  - Should X be in this function? 
  - Does X have a reference to Y?
- Create functions that solve the problem
  - Use sensible naming conventions, ie the function name should give you a clue to what the function does
  - Separate logic into different functions if it is a complicated problem, each function should be responsible for a separate piece of the logic
- If you get lost or stuck, trace the path of the data through logs to verify things are happening as you intended. Verify the behavior and the data at different sections in the code to make sure the code is doing what you want it to.
- For harder problems you don't need a perfect solution, you just need a solution aka a brute force solution. You can refine and optimize it later
## Algorithms and Data Structures
<!-- <img-cont src="https://res.cloudinary.com/practicaldev/image/fetch/s--1KrC30HZ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/raakfuz5mupt3q5oog8n.jpeg" alt="Algorithms and Data Structures" /> -->
<!-- <img-cont src="img/algo-data-structures.PNG" alt="Facebook Breakdown" /> -->
<!-- ![Data Structures](/algo-data-structures.PNG) -->
<p align="center">
  <img src="/blog/algo-data-structures.PNG" alt="Data Structures" style="width: 100%;"/>
</p>


- Algorithms- The series of steps that you are going to take to solve a problem.
- Data Structures- The ways you can organize the data. You can process, retrieve and store data in a bunch of ways.

Combining algorithms and data structures allows you to solve most if not all software problems. 
- When given a problem.
  - Lay out the series of steps you are going to take → algorithms
  - Think about how you are going to manipulate the data and what form the data needs to be in, then create the data structures you need → data structures

## Architecture/ System Design Questions
### How would you go about building twitter or Facebook
- Architecture questions don’t have a “right” answer. Some answers and paths you go down are more “right” than others but the goal of the architecture questions are to see if  you can break down complexity into manageable pieces
- Explain from a high level to a low level
- Ask clarifying questions to get a sense of how the interviewer wants you to approach the problem
- Show that you understand and appreciate the complexity of an application by labeling the different parts of the architecture. Go from high level to low level. 
- Example bucketing/ labeling:
  - High level
    - What can a user do?
    - What pages are there?
    - What data is where?
    - What systems need to talk to what systems?
  - Lower Level
    - What can a user do on a page?
      - Look though the news feed
      - Click “like” posts
      - Create, update and delete comments
    - What components are on the page?
      - Search bar
      - List of posts
    - How are you getting the data, what api calls are you making?
      - I am making a call to an api to “get all posts of friends by user id”
  - Low Level
    - What database are you going to be using and what tables are needed
    - What things are data structures are you going to be using
    - What are you going to use for frontend? React, Vue, Angular, Next.js Svelte bla bla… and state why, it can be as simple as “because I am most familiar with X”
- There is so much complexity in a commenting system that you could spend a lot of time talking about how that should work. Don’t let that derail you. Start by laying out everything and ask the interviewer how deep you should go. 
- After you laid things out, prioritize. What do you need to do first? Think about what systems depend on each other.
  - Thats why a lot of people set up the database first, then they move to exposing API endpoints, then they move to the frontend to get and show the data
  - Facebook for example, in what order should you build things? Create a User (Profile page) → User can find friends (Friends page) → User can see all friends posts (News Feed) …
- Try to think in terms of a visual hierarchy:


<!-- <img-cont src="img/facebookBreakdown.svg" alt="Facebook Breakdown" /> -->
<p align="center">
  <img src="/blog/facebookBreakdown2.svg" alt="Facebook Breakdown"/>
</p>

## Recap
At the end of the day interviewing takes practice to get good at it. Even after you land your first job you will still need to practice again for the next one. Practice answering soft skill questions by recording yourself and practice technical questions by doing coding problems on [leetcode](https://leetcode.com/) or [hacker rank](https://www.hackerrank.com/) (work on the easy problems first and don't get frustrated). You need reps and over time as you code more and more and build up your skills interviewing will get easier and your eyes will slowly start to turn <span style="color:red">red</span> and eventually you will develop laser eyes and your training sequence will be complete.
