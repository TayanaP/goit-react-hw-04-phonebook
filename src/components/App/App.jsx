import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm'
import { ContactList } from 'components/ContactList/ContactList'
import { Filter } from 'components/Filter/Filter'
import { Phonebook, Title, SubTitle } from 'components/App/App.styled'

export const App = () => {
    const [contacts, setContacts] = useState(
      () => JSON.parse(localStorage.getItem('contacts')) ?? []
    );
    const [filter, setFilter] = useState('');

  useEffect (() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const inContacts = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (inContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleChangeFilter  = filter => {
    setFilter(filter);
  };

  const deleteContact = id => {
    setContacts(contacts  => 
     contacts.filter(contact => contact.id !== id) 

    );
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();
   
    return(
      <Phonebook>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={addContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter handleChangeFilter={handleChangeFilter }/>
      <ContactList 
      contacts={filteredContacts}
      deleteContact={deleteContact}/>
    </Phonebook>
    )
  };
  

