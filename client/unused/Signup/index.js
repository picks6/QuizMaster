import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './CreateAccount.css';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../../src/utils/mutations';
import Auth from '../../src/utils/auth'

//ACCOUNT REQS - USERNAME EMAIL PASSWORD

function CreateAccount(props){
    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.log(err);
        }
    }
}
// WHAT DOES RETURN LOOK LIKE

export default CreateAccount;
