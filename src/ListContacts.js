import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemoveContact: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }

  // Updates the state based on whats in the input field
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  render() {
    const { query } = this.state
    const { contacts, onRemoveContact } = this.props

    //filters out contacts based on what the query is.
    const showingContacts = query === ''
     ? contacts 
     : contacts.filter((passedInContact) => (
      passedInContact.name.toLowerCase().includes(query.toLowerCase())
    ))

    return (
      <div className='list-contacts'>
        {/* {JSON.stringify(this.state)} */}
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              ></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onRemoveContact(contact)}
                className='contact-remove'>
                Remove
            </button>
            </li>
          ))}
        </ol>
      </div>

    )
  }
}

export default ListContacts;