import React, {FC} from 'react';
import './../button/ButtonStyled.css'

type ButtonStyle = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string
}


const Button: FC<ButtonStyle> = ({title, onClickHandler, isDisabled, classes}) => {
    return (
        <button className={classes} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
    );
};

export default Button;