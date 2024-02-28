import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { Input } from './input/Input';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type EditableSpanType = {
    title: (newTitle: string) => void
    classes?: string
    oldTitle: string
}

export const EditableSpan: FC<EditableSpanType> = ({ title, classes, oldTitle }) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)
    // const inputRef = useRef<HTMLInputElement>(null);
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            title(newTitle)
        }
        setNewTitle(oldTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ?
            <TextField
                autoFocus
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={editHandler} />
            // <Input value={newTitle} onBlur={editHandler} autofocus onChangeHandler={onChangeHandler} 
            // onKeyDownHandler={(e)=> e.key === "Enter" ? editHandler : inputRef.current?.blur()}
            // />
            // <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler} />
            : <Box onDoubleClick={editHandler} >{oldTitle}</Box>
    );
};
