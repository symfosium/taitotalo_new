import React from "react";
import {useDispatch, useSelector} from 'react-redux';

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { addComment } from '../../redux/slices/posts';

export const AddComment = ({idPost}) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  const onClickAdd = () => {
    const fields = {
      text
    };
    dispatch(addComment({idPost, fields}));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Jätä kommentti"
            variant="outlined"
            maxRows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            fullWidth
          />
          <Button onClick={onClickAdd} variant="contained">Lähetä</Button>
        </div>
      </div>
    </>
  );
};
