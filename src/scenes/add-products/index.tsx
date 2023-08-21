import NavbarWrapper from '../../helpers/NavbarWrapper';
import Form from './Form';

const index = NavbarWrapper(() => {
  return (
    <div>
      Add a new product
      <Form />
    </div>
  );
});

export default index;
