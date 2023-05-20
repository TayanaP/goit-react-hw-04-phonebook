import PropTypes from 'prop-types';
import {Button,
    Table,
    THName,
    THNumber,
    TR,
    THButton,} from 'components/ContactList/ContactList.styled'

export function ContactList ({contacts, deleteContact}) {
    return (
        <Table>
             <tbody>
        {contacts.map(({ name, id, number }) => {
          return (
            <TR key={id}>
              <THName>{name}</THName>
              <THNumber>{number}</THNumber>
              <THButton >
                <Button
                  type="button"
                  onClick={() => deleteContact(id)}
                >Delete</Button>
                </THButton>
            </TR>
          );
        })}
        </tbody>
    </Table>
)
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired
    ),
    deleteContact: PropTypes.func.isRequired,
  };