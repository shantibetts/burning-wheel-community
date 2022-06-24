# Burning Wheel Community App V1: Character Sheet

The unoficial, online Burning Wheel Gold (+Codex) character sheet. Adapted from the Burning Wheel character sheet PDFs included with Burning Wheel Gold.

V1: Create a MongoDB database to house character information that communicates via a RESTful API to a React front end which displays and edits character information according to the rules layed out in Burning Wheel Gold.

## Project Links

[Wireframes](https://www.figma.com/file/jW6WGkQOYvzi96RGTy8lYc/Untitled?node-id=0%3A1)

## Project Requirements

### MVP Goals

1. A mongoDB database that will authenticate users, and store their characters
   - A model for users, and a relationship to the characters that they create
   - A model for characters
   - A model for rules-sets for reference
2. A Express server that will create a RESTful API with full CRUD functionality for users and characaters.
   - Use Google OAuth for users authentication
   - Full CRUD routes for users and characters
   - Read only for rules-sets routes
3. A React front end that will display the character sheet in a clear and attractive manner
   - Mobile-first design to display characters on phones / tablets
   - Use state to store character information
   - Use intuitive UX/UI to be able to modify character information according to the rules
   - About page that describes the app, author & credits

### Post MVP Goals

1. Add a model to the database for tracking games
   - A game will have multiple characters
   - A game will have one GM
   - A game will summarize the BIT's of the players and be able to display it
2. Add CRUD functionality for games
3. Add a game view for the character editor, where players can track game related details:
   - player's BIT's
   - player artha
   - known characters
   - past game summaries

## Project Schedule

| Date    | Day     | Deliverable                                  | Status      |
| ------- | ------- | -------------------------------------------- | ----------- |
| 6/24    | Fri     | Project Plan & Create Projects               | In Progress |
| 6/25-26 | Sat/Sun | Character Model / Character API calls        | Incomplete  |
| 6/27    | Mon     | Fetch request + React component skeleton     | Incomplete  |
| 6/28    | Tue     | Finish back end                              | Incomplete  |
| 6/29    | Wed     | Finish front end components                  | Incomplete  |
| 6/30    | Thu     | Front end character CRUD integration         | Incomplete  |
| 7/1     | Fri     | Users / Authorization                        | Incomplete  |
| 7/2-3   | Sat/Sun | Finish Users / Authorization                 | Incomplete  |
| 7/4     | Mon     | 4th of July Holliday                         | Incomplete  |
| 7/5     | Tue     | About page, Character finalization / styling | Incomplete  |
| 7/6     | Wed     | Presentations                                | Incomplete  |

## Inspirations

[Burning Wheel official character sheet](https://pdfcoffee.com/burning-wheel-character-sheet-4-pdf-free.html)
[Wiki style character sheet](https://vipersgate.obscuritus.ca/index.php?title=Sarlan_The_Thief)
[Google Docs style character sheet](https://docs.google.com/spreadsheets/d/1pWbAH6WgCs_EcBpyxTMSHm3wcTHEULjw-4gAzCk2SMI/edit?usp=sharing)
[Charred Burning Wheel unofficial character creator](http://charred-black.herokuapp.com/#/)

## Time/Priority Matrix

| Feature                                   | Time(hr) | Priority |
| ----------------------------------------- | -------- | -------- |
| Create Repos / Initialize                 | 1        | 9        |
| Server functionality: CORS, DB Connection | 2        | 8        |
| React component skeleton + initial fetch  | 2        | 8        |
| Character model and controllers           | 4        | 7        |
| MVP models and controllers complete       | 4        | 7        |
| Character components working              | 8        | 6        |
| Front end character CRUD working          | 8        | 6        |
| Users DB and CRUD, Authorization          | 8        | 5        |
| Navigation / Sign in components           | 4        | 5        |
| About page                                | 2        | 4        |
| Character display cleanup and styling     | 4        | 3        |
| Dynamic styling for desktop               | 4        | 1        |
