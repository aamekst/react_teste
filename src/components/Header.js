import { useNavigate } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';  // Importa os componentes do react-bootstrap
import '../style/header.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Header() {
    const navigate = useNavigate(); 

    return (
        <>
            <div id='container'>
                <Navbar id='navbar' expand="lg">
                    <Navbar.Brand id='home'href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Usuário" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/listar_user">Listar</NavDropdown.Item>
                                <NavDropdown.Item href="/cadastro_user">Cadastrar</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Produto" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/listar_produto">Consultar</NavDropdown.Item>
                                <NavDropdown.Item href="/cadastro_produto">Cadastrar</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Venda" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Consultar</NavDropdown.Item>
                                <NavDropdown.Item href="#">Realizar pedido</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Atualizar?</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}
