import express from "express";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const tasks = [];

app.get('/', (req, res) => {
  res.render('index.ejs', { tasks });
});

app.post('/addTask', (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.redirect('/');
});

app.get('/deleteTask/:index', (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.redirect('/');
});

// Render the edit page with the selected task
app.get('/editTask/:index', (req, res) => {
  const index = req.params.index;
  const taskToEdit = tasks[index];
  res.render('edit.ejs', { index, taskToEdit });
});

// Update the task with the edited content
app.post('/updateTask/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.task;
  tasks[index] = updatedTask;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
