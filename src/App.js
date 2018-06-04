import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll()
    .then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((passedInContact) => {
        return passedInContact.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact);
  }

  render() {
    console.log(this.state.screen);
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            contacts={this.state.contacts}
            onRemoveContact={this.removeContact}
          />
        )}
        />
        <Route path='/create' component={CreateContact}
        />
      </div>
    )
  }
}

export default App
