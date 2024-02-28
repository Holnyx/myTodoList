import React, { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes, KeyboardEventHandler } from 'react';

type InputType = {
    classes?: string
    value?: string
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDownHandler?: (e: React.KeyboardEvent) => void
    type?: string
    checked?: boolean
    onBlur?: () => void
    autofocus?: boolean
}

export const Input: FC<InputType> = ({ classes, value, onChangeHandler, onKeyDownHandler, type, checked,onBlur,autofocus }) => {
    return (
        <input
            className={classes}
            value={value}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            type={type}
            checked={checked} 
            onBlur={onBlur}
            autoFocus={autofocus}
            />
    );
};



{/* <input
                            className={error ? 'task-input-error ' : ""}
                            value={taskTitle}
                            onChange={setTaskTitleHandler}
                            onKeyDown={(event) => event.key === "Enter" && addNewTaskHandler()} /> */}



{/* <input
                            className='input-checkbox'
                            onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)}
                            type="checkbox"
                            checked={task.isDone} /> */}