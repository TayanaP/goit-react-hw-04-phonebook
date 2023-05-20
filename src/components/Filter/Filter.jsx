import PropTypes from 'prop-types';
import { Label, Input } from 'components/ContactForm/ContactForm.styled';

export function Filter ({ handleChangeFilter}) {
    return (
        <Label>
        Find contacts by name
        <Input
          type="text"
          name="filter"
          title="Enter name or surname"
          required
          onChange={event => handleChangeFilter(event.target.value)}
        />
      </Label>
    )
}

Filter.propTypes = {
    handleChangeFilter: PropTypes.func.isRequired,
  };