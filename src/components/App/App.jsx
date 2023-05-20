import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm'
import { ContactList } from 'components/ContactList/ContactList'
import { Filter } from 'components/Filter/Filter'
import { Phonebook, Title, SubTitle } from 'components/App/App.styled'

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount ()  {
    const storedContacts = localStorage.getItem ('contacts')
    if(storedContacts) {
      this.setState({contacts: JSON.parse(storedContacts)})
    }
  }

  componentDidUpdate (prevState) {
    const {contacts} = this.state
    const prevContacts = prevState.contacts;
    if (contacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    const inContacts = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (inContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  handleChangeFilter  = filter => {
    this.setState({ filter});
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  getFilteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().match(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts);
   
    return(
      <Phonebook>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={this.addContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter handleChangeFilter={this.handleChangeFilter }/>
      <ContactList 
      contacts={filteredContacts}
      deleteContact={this.deleteContact}/>
    </Phonebook>
    )
  }
};
