import * as React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { productContext } from "../App";
function Header() {
  let context = React.useContext(productContext);
  let navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Products
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Nav.Link>
          <Link
            to="/cart"
            className="header-icon text-dark text-decoration-none mt-2"
          >
            <Badge badgeContent={context.cartValue} style={{ color: "white" }}>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
