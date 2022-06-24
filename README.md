# Welcome to the Tracker-API

![Burning Wheel Character Sheet](#)

---

## About Burning Wheel Character Sheet

Tracker is an interactive app that tracks bugs/issues and can assign them to users for comments and resolution. A clean, modern interface using MUI components and reactive styling to provide a seamless mobile-first experience. This API supports the usage of our front-end and mobile application including <a href="https://nodejs.org/en/about/" target="_blank">Node.js</a>, <a href="https://www.mongodb.com/what-is-mongodb" target="_blank">MongoDB</a>, <a href="https://expressjs.com/">Express</a>, and <a href="https://www.heroku.com/what" target="_blank">Heroku</a>.

### Instructions

---

<details><summary>Prerequisites</summary>
<p>Nodemon</p></details>
 
In order to use the tracker API start by following these steps to get started.

1. Fork and clone the repository.
2. Change into the new directory.
3. Intall dependencies by running `npm install` inside the terminal.
4. Run `nodemon server.js` inside the terminal to start it.

### API specification

---

**Bug Model**

- bugName: String
- Issues: String
- Priority: Number(1,2,3)
- timeEstimate: Number
- dateDue: Date
- createdDate: Date
- Comment:[{comment db reference}] <- (add, but implement post MVP)
- Assigned: {link to user db}

  <a href="https://vast-tundra-01728.herokuapp.com/bugs" target="_blank">Example Bugs</a>

  **User Model**

- userName: String
- firstName: String
- lastName: String
- Bugs: {db bugs reference}

  <a href="https://vast-tundra-01728.herokuapp.com/users" target="_blank">Example Users</a>

---

### **Bug Controller**

Create, Read, Update, Destroy (CRUD)

| Verb   | Route   | Action  | Description                  |
| ------ | ------- | ------- | ---------------------------- | --- | --- | --- |
| GET    | /       | index   | Show all bugs                | --- | --- |
| POST   | /       | new     | Add a new bug                | --- | --- | --- |
| PATCH  | /:bugid | update  | Update an existing bug by ID | --- | --- | --- |
| DELETE | /:bugid | destroy | Delete a bug by ID           | --- | --- |

### **User Controller**

| Verb  | Route           | Action | Description                                      |
| ----- | --------------- | ------ | ------------------------------------------------ |
| GET   | /               | index  | Show all users                                   |
| PATCH | /:userid:/bugid | update | Update an existing user by ID to add a bug by ID |

## Code Snippet

---

```
// Write the route to update an user
router.patch('/:userId/bugs/:bugsId', (req, res) => {
	Bug.findByIdAndUpdate(
		req.params.bugsId,
		{ user: req.params.userId },
		{ new: true }
	)
		.populate('user', ['userName', 'firstName', 'lastName'])
		.then((bug) => {
			console.log(bug)
			User.findByIdAndUpdate(
				req.params.userId,
				{ $push: { bugs: req.params.bugsId } },
				{ new: true }
			)
				.populate('bugs', [
					'bugName',
					'issues',
					'priority',
					'timeEstimate',
					'dateDue',
					'dateCreated',
					'assigned',
					'isActive'
				])
				.then((user) => {
					res.status(200).json({ user: user })
					console.log(user)
				})
		})
})
```

[Back to top](#welcome-to-the-tracker-api)<a name="section_name"></a>
