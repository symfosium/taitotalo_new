import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from 'react-hook-form';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth, fetchRegister } from "../../redux/slices/auth";
import axios from 'axios';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onCHange',
  });

  const onSubmit = async (values) => {
    const resPic = await axios.get('https://picsum.photos/200');
    console.log(resPic);
    values.avatarUrl = resPic.request.responseURL;
    const data = await dispatch(fetchRegister(values));
 
    if (!data.payload) {
     return alert('Virhe rekisteröinnissä!')
    } 
 
    if ('token' in data.payload) {
     window.localStorage.setItem('token', data.payload.token);
    } else {
     alert('Virhe kirjautumisessa!');
    }
   };

   if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Luo tili
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField  
        className={styles.field} 
        label="Nimi" 
        error={Boolean(errors.fullName ?.message)}
        helperText={errors.fullName ?.message}
        {...register('fullName', {required: 'Laittakaa nimi'})}
        fullWidth />
      <TextField  
        className={styles.field} 
        label="Sähköposti" 
        error={Boolean(errors.email ?.message)}
        helperText={errors.email ?.message}
        {...register('email', {required: 'Laittakaa sähköposti'})}
        fullWidth />
      <TextField  
        className={styles.field} 
        label="Salasana" 
        error={Boolean(errors.password ?.message)}
        helperText={errors.password ?.message}
        {...register('password', {required: 'Laittakaa salasana'})}
        fullWidth />
      <Button disabled={isValid} type="submit" size="large" variant="contained" fullWidth>
        Luo tili
      </Button>
      </form>
    </Paper>
  );
};
