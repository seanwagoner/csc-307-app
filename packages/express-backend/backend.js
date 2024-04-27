import express from "express";
import cors from "cors";
import userService from '/services/user-services';  

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Fetch users with optional filters for name and job
app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  try {
    const users = await userService.getUsers(name, job);
    res.json({ users_list: users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fetch a single user by ID
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Resource not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await userService.deleteUserById(id);
    if (deleted) {
      res.status(204).send();  // no content to send back
    } else {
      res.status(404).send("User not found.");  // No user found to delete
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
