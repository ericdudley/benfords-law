import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { AccountCircle, AttachMoney, Code } from "@mui/icons-material";
import React, { FunctionComponent } from "react";
import { Box } from "@mui/system";

export const Footer: FunctionComponent = () => {
  return (
    <Box mt="64px">
      <BottomNavigation
        showLabels
        onChange={(event, value) => {
          const links: Record<string, string> = {
            website: "https://ericdudley.com",
            coffee: "https://buymeacoffee.com/ericdudley",
            code: "https://github.com/ericdudley/benfords-law",
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
        <BottomNavigationAction
          value="code"
          label="Source code"
          icon={<Code />}
        />
      </BottomNavigation>
    </Box>
  );
};
