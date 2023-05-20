import { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Label, Input, Button} from 'components/ContactForm/ContactForm.styled'

export const ContactForm =({onAddContact}) => {
   const [name, setName] = useState ('')
   const [number, setNumber] = useState ('')

    const handleSubmit = event => {
        event.preventDefault();
        onAddContact(name, number);
        reset()
    };

    const reset = () => {
        setName ('');
        setNumber ('');
    };

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        if (name === 'name') {
            setName (value);
        } else if (name === 'number') {
            setNumber (value)
        }
        }

        return (
            <Form onSubmit = {handleSubmit}>
                <Label>
                    Name
                    <Input
                     type="text"
                     name="name"
                     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                     value={name}
                     onChange={handleChange}
                     required
                   />
                </Label>

                <Label>
                    Number
                    <Input
                      type="tel"
                      name="number"
                      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                      value={number}
                      onChange={handleChange}
                      required
                    />
                </Label>

                <Button type='submit'>Add contact</Button>
            </Form>
        )
    }


ContactForm.propType = {
    onAddContact: PropTypes.func.isRequired,
  };