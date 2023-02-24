const express = require("express");
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const global_constants = require("./constants");

//setup port
const PORT = process.env.PORT || 3003;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//all the endpoints here
// GET -- http://localhost:3003/(get all tasks)
// POST -- http://localhost:3003/create (create new task)
// PUT -- http://localhost:3003/edit (edit task)
// DELETE -- http://localhost:3003/delete (delete task)

app.listen(PORT)


const getExistingTasks = () => {
    //read file
    return JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
}

const writeToTaskFile = (content) => {
    fs.writeFile('tasks.json', JSON.stringify(content), err => {
        if(err) throw err;
    })
}

//GET TASKS
app.get('/', (req, res) => {
    try {
        const tasks = getExistingTasks();
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(global_constants.ERROR_MESSAGE)
    }
})

//CREATE TASKS
app.post('/create', (req, res) => {
    try {
        var previousTasks = getExistingTasks();
        const newTask = {
            id: uuidv4(),
            name: req.body.name,
            description: req.body.description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            reminderDate: req.body.reminderDate,
            completed: false
        };
        previousTasks.push(newTask);
        writeToTaskFile(previousTasks);
        res.status(300).send("New note Created")
    }
    catch (error) {
        res.status(500).send(global_constants.ERROR_MESSAGE)
    }
})

//EDIT TASKS
app.put('/edit', async (req, res) => {
    try {
        var previousTasks = getExistingTasks();
        const taskToEdit = previousTasks.findIndex(task => task.id === req.body.id);
        previousTasks[taskToEdit].name = req.body.name;
        previousTasks[taskToEdit].description = req.body.description;
        previousTasks[taskToEdit].completed = !previousTasks[taskToEdit].completed
        previousTasks[taskToEdit].reminderDate = req.body.reminderDate;
        previousTasks[taskToEdit].updatedAt = Date.now();

        writeToTaskFile(previousTasks);

        res.status(300).send("Note Updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//DELETE TASKS
app.delete('/delete', async (req, res) => {
    try {
        var previousTasks = getExistingTasks();
        const remainingTasks = previousTasks.filter(task => task.id !== req.body.id);

        writeToTaskFile(remainingTasks);

        res.status(301).send("Note Deleted")
    } catch (error) {
        res.status(500).send(error.message);
    }
})
