import { Typography } from "@mui/material";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

export const Timer: FunctionComponent<{ isActive: boolean }> = ({
  isActive,
}) => {
  const startTimeRef = useRef<number>();
  const [durationMs, setDurationMs] = useState(0);
  const intervalRef = useRef<any>();
  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    if (isActive) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setDurationMs(Date.now() - (startTimeRef.current || Date.now()));
      }, 1000);
    }
  }, [isActive]);

  return <Typography>{Math.floor(durationMs / 1000)}s</Typography>;
};
