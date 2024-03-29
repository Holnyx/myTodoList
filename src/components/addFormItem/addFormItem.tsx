import React, { ChangeEvent, FC, useState } from 'react';
import { Input } from '../input/Input';
// import Button from '../button/Button';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

type AddFormItemType = {
    // classes: string
    addItem: (title: string) => void
}


export const AddFormItem: FC<AddFormItemType> = ({ addItem }) => {
    const [error, setError] = useState(false)
    const [taskTitle, setTaskTitle] = useState("")
    const addNewTaskHandler = () => {
        if (taskTitle.trim()) {
            addItem(taskTitle.trim())
        }
        else {
            setError(true)
        }
        setTaskTitle("")
    }
    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    }
    const styles = { maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px' }

    return (

        <Box gap={'10px'} display={'flex'} flexDirection={'column'}>
            <Box gap={'10px'} display={'flex'}>
                <TextField
                    error={!!error}
                    size="small"
                    id="outlined-basic"
                    label={error ? "Enter task name" : "Type something"}
                    variant="outlined"
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={(event) => event.key === "Enter" && addNewTaskHandler()} />
                {/* <Input classes={error ? 'task-input-error ' : ""}
                value={taskTitle}
                onChangeHandler={setTaskTitleHandler}
                onKeyDownHandler={(event) => event.key === "Enter" && addNewTaskHandler()} /> */}
                <Button variant="contained"
                    style={styles}
                    onClick={addNewTaskHandler}
                    disabled={!taskTitle}>+</Button>
            </Box>
            <div>
                {/* {error && <div style={{fontSize:'12px', color:'red'}}>Enter task name</div>} */}
                {taskTitle.length > 15 && <div style={{fontSize:'12px', color:'red'}}>
                    Number of characters is no more than 15</div>}
            </div>
        </Box>
    );
};


