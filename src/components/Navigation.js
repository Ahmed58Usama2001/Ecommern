import React from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../features/userSlice";
import "./Navigation.css";

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Get the navigate function

    function handleLogout() {
        dispatch(logout());
        navigate("/"); // Navigate to the home page after logout
    }


    return (
        <Navbar bg="light" expand="lg" className="shadow">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Ecomern</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* if no user */}
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        {/* if user */}
                        {user && (
                            <>

                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Cart</NavDropdown.Item>
                                            </LinkContainer>

                                        </>
                                    )}

                                    <NavDropdown.Divider />
                                    <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Navigation;