"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  User,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";

type Props = {};

const UserDropdown = (props: Props) => {
  const { user } = useAuth();
  console.log({ user });
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Avatar
          as="button"
          src={
            user?.photoURL
              ? user?.photoURL
              : `https://ui-avatars.com/api/?name=${
                  user?.displayName || user?.email?.split("@")[0]
                }`
          }
          className="transition-transform"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Action event example">
        <DropdownItem key="email">{user?.email}</DropdownItem>
        <DropdownItem key="new">Credits</DropdownItem>
        <DropdownItem key="copy">Settings</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
