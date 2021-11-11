import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Search from './Search'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Nav>
                        <LinkContainer to='/'>
                            <Navbar.Brand>Retro Future</Navbar.Brand>
                        </LinkContainer>

                    
                        <LinkContainer to='/'>
                            <Nav.Link>Clothing</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/'>
                            <Nav.Link>Gaming</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/'>
                            <Nav.Link>Music</Nav.Link>
                        </LinkContainer>

                        <Search />
                    </Nav>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="mr-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg>
                                    <span style={{'paddingLeft': '8px'}}>{ cartItems.length }</span>
                                </Nav.Link>
                            </LinkContainer>

                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
