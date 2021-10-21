import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { AccountCircle, AttachMoney } from "@mui/icons-material";
import React, { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
  return (
    <BottomNavigation
      showLabels
      onChange={(event, value) => {
        const links: Record<string, string> = {
          website: "https://ericdudley.com",
          coffee: "https://buymeacoffee.com/ericdudley",
        };
        window.open(links[value as string] as string);
      }}
    >
      <BottomNavigationAction
        value="website"
        label="ericdudley.com"
        icon={<AccountCircle />}
      />
      <BottomNavigationAction
        value="coffee"
        label="Buy me a coffee"
        icon={<AttachMoney />}
      />
    </BottomNavigation>
  );
};
