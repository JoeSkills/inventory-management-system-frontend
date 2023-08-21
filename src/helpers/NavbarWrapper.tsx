import { useNavigate } from 'react-router-dom';
import Navbar from '../scenes/navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const NavbarWrapper = (Page: React.FC): React.FC =>
  function HOC(): JSX.Element {
    const navigate = useNavigate();
    const token = useSelector((state: { token: string }) => state.token);
    axios
      .post('http://localhost:8000/auth', {
        token,
      })
      .then(({ data: { status } }) => {
        if (!status) navigate('/auth/login');
      });
    return (
      <Navbar>
        <Page />
      </Navbar>
    );
  };

export default NavbarWrapper;
