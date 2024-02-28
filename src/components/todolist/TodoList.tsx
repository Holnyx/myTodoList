import React, { FC, useState } from 'react';
// import Button from '../button/Button';
// import './TodoListStyled.css'
import { AddFormItem } from '../addFormItem/addFormItem';
import { EditableSpan } from '../EditableSpan';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';


type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
    title: string;
    isDone: boolean;
    id: string
}

type TodoListPropsType = {
    id: string
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todolistID: string) => void
    updateTodoTitle: (id: string, newTitle: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}


const TodoList: FC<TodoListPropsType> = ({ title, tasks, removeTask, changeTaskStatus, todolistID, removeTodoList, addTask, id, updateTaskTitle, updateTodoTitle }) => {

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [isHide, setIsHide] = useState(false)


    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const taskForTodoList: TaskType[] = filter === "active"
        ? tasks.filter(task => !task.isDone)
        : filter === "completed" ? tasks.filter(task => task.isDone)
            : tasks

    const activeTasksForHideMode = isHide ? tasks.filter(task => task.isDone).length : null
    const addNewTask = (title: string) => {
        addTask(todolistID, title)

    }
    const updateTaskTitleHandler = (tID: string, newTitle: string) => {
        updateTaskTitle(id, tID, newTitle)
    }
    const updateTodoTitleHandler = (newTitle: string) => {
        updateTodoTitle(id, newTitle)
    }

    const tasksItems: JSX.Element = taskForTodoList.length !== 0
        ? <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {taskForTodoList.map(task => {
                return (
                    <ListItem
                        secondaryAction={
                            <IconButton aria-label="delete" onClick={() => { removeTask(todolistID, task.id) }}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)} />
                        <ListItemText sx={{ textAlign: 'center', margin: 0 }}
                            primary={<EditableSpan title={(newTitle) => updateTaskTitleHandler(task.id, newTitle)} oldTitle={task.title} />} />
                        {/* <FormControlLabel
                            control={<Checkbox checked={task.isDone} onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)} />}
                            label={<EditableSpan 
                                // classes={task.isDone === true ? 'task-done' : 'task'}
                                title={(newTitle) => updateTaskTitleHandler(task.id, newTitle)} oldTitle={task.title} />
                            } /> */}
                    </ListItem>

                )
            })}
        </List>
        : <Box width={'100%'} justifyContent={'center'} display={'flex'} sx={{ padding: '10px 0 20px 0' }}>
        Empty</Box>
    return (
        <Box width={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'} style={{ position: 'relative', padding: '30px 0 0 0' }}>
            <h2>
                <EditableSpan title={updateTodoTitleHandler} classes={''} oldTitle={title} />
                <Button variant="outlined" sx={{ position: 'absolute', top: '0px', left: '0' }}
                    // classes={isHide ? 'margin' : 'margin'} title={isHide ? 'Show' : 'Hide'} 
                    onClick={toggleHideTodoList} > {isHide ? 'Show' : 'Hide'} </Button>
            </h2>
            <Button variant="outlined" sx={{ position: 'absolute', top: '0px', right: '0' }}
                // classes={isHide ? 'margin' : 'margin'} title={isHide ? 'Show' : 'Hide'} 
                onClick={() => removeTodoList(todolistID)} > Delete </Button>
            <div>
                {isHide && <div style={{textAlign:'center'}}>There are only {tasks.length} tasks on that sheet
                    <div>Of these,  {activeTasksForHideMode}  tasks completed</div></div>}
            </div>
            {!isHide &&
                <>
                    <AddFormItem addItem={addNewTask} />
                    {tasksItems}
                    <Box display={'flex'} gap={"10px"}>
                        <Button variant={filter === 'all' ? "outlined" : 'contained'} color='error'
                            onClick={() => changeTodoListFilter('all')} >All</Button>
                        <Button variant={filter === 'active' ? "outlined" : 'contained'} color='success'
                            onClick={() => changeTodoListFilter('active')} >Active</Button>
                        <Button variant={filter === 'completed' ? "outlined" : 'contained'} color='warning'
                            onClick={() => changeTodoListFilter('completed')} >Completed</Button>
                    </Box>
                </>
            }

        </Box>
    );
};

export default TodoList;