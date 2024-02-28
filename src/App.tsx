import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/todolist/TodoList';
import { v1 } from 'uuid';
import { AddFormItem } from './components/addFormItem/addFormItem';
import { Header } from './components/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type TodoListType = {
    id: string
    title: string
    filter: string
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<TodoListType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });
    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone } : el) })
    }

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId) })

    }
    const addTask = (todolistID: string, title: string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })

    }
    const removeTodoList = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodo = (title: string) => {
        const newTodo: TodoListType = { id: v1(), title, filter: 'all' }
        setTodolists([newTodo, ...todolists])
        setTasks({ ...tasks, [newTodo.id]: [] })
    }
    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? { ...el, title: newTitle } : el) })
    }
    const updateTodoTitle = (id: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === id ? { ...el, title: newTitle } : el))
    }


    return (
        <div className="App">
            <Header />
            <Container fixed>
                <Grid container style={{ margin: "20px 0" }}>
                    <AddFormItem  addItem={addTodo} />
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map((el) => {
                        const taskForTodoList = tasks[el.id]
                        return (<Grid item>
                            <Paper elevation={4} style={{ padding: "20px", width:"300px"}}>
                                <TodoList
                                    updateTodoTitle={updateTodoTitle}
                                    updateTaskTitle={updateTaskTitle}
                                    key={el.id}
                                    removeTodoList={removeTodoList}
                                    todolistID={el.id}
                                    title={el.title}
                                    tasks={taskForTodoList}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus} id={el.id} />
                            </Paper>
                        </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div >
    );
}

export default App;
