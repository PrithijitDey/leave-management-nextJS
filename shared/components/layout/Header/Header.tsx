import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
} from "@chakra-ui/react";

import { useAuth } from "../../../context/AuthContext";

import headerStyle from "./Header.module.scss";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Box as={"header"} py="3" className={`${headerStyle.Header}`}>
      <Container maxW={"container.xl"}>
        <Box as={"nav"} className={`${headerStyle.Header__nav}`}>
          <Link href="/" className={`${headerStyle.logo}`}>
            Leave Management
          </Link>

          <UnorderedList
            styleType={"none"}
            gap='3'
            ml={"auto"}
            className={`${headerStyle.Header__navList}`}
          >
            <ListItem className={`${headerStyle.Header__navListItem}`}>
              <Menu>
                <MenuButton as={Button}>
                  <Avatar name={user?.name || user?.email} src={user.avatarUrl} size="xs"/>
                  {user?.name || user?.email}
                </MenuButton>
                <MenuList p={0}>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
          </UnorderedList>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
