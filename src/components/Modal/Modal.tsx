import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { UserContext } from '../../context';

interface ModalProps {
	text: string
	variant: "primary" | "secondary" | "warning" | "info" | "danger"
  isSignupFlow: boolean
}

const ErrorMessage = styled.p`
  color: red;
`

const Example = ({text, variant, isSignupFlow}: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  
  // eslint-disable-next-line
  const [state, setState] = useContext(UserContext)
  
  const handleClick = async () => {
    let response;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post('http://localhost:8080/auth/signup', {
        email, password
      });
      // console.log(response)
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post('http://localhost:8080/auth/login', {
        email,
        password
      });
      response = loginData;
    }

    if(response.errors.length) {
      return setErrorMsg(response.errors[0].msg)
    }

    setState({
      // if we ever hit this state, we also want ot set axios header to have our token 
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
        stripeCustomerId: response.data.user.stripeCustomerId
      },
      loading: false,
      error: null
    })

    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}` // because we get the token back
    
    navigate("/articles") // directly navigate to the articles tab
  }

  return (
    <>
      <Button variant={variant} onClick={handleShow} size="lg" style={{marginRight: "1rem", padding: "0.5rem 3rem"}}>
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Text>Email</InputGroup.Text>
						<FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Text>Password</InputGroup.Text>
						<FormControl type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
				</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
						{text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;