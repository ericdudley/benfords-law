import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "./App";
import "./App.css";
import { Timer } from "./Timer";
import { ATTRIBUTE_HANDLERS } from "./utils";

const MAX_TABLE_ROW_COUNT = 3;

export const Fetch = () => {
  const { attribute, rows, appendRows } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(false);
  const isFetchingRef = useRef({ isFetching: false });
  const lastFetchedPageRef = useRef(0);
  const hasAttr = !!attribute;

  const startFetching = useCallback(() => {
    const effect = async () => {
      if (isFetchingRef.current.isFetching) {
        isFetchingRef.current.isFetching = false;
      }

      setIsFetching(true);
      isFetchingRef.current = { isFetching: true };
      const isFetchingObj = isFetchingRef.current;
      const seed = Math.random();
      if (hasAttr) {
        for (let i = 1; isFetchingObj.isFetching && i <= 10; i += 1) {
          const rows = await ATTRIBUTE_HANDLERS[attribute](
            lastFetchedPageRef.current + 1,
            seed
          );
          if (isFetchingObj.isFetching && rows) {
            lastFetchedPageRef.current += 1;
            appendRows(rows);
          }
        }
        if (isFetchingObj.isFetching) {
          setIsFetching(false);
        }
      }
    };

    effect();
  }, [appendRows, attribute, hasAttr]);

  const stopFetching = () => {
    setIsFetching(false);
    isFetchingRef.current.isFetching = false;
  };

  useEffect(() => {
    startFetching();
  }, [startFetching]);

  const tableRowCount = Math.min(MAX_TABLE_ROW_COUNT, rows.length);

  return (
    <div>
      <Box mt={2}>
        {hasAttr && !isFetching && (
          <Button variant="contained" onClick={startFetching}>
            {rows.length === 0 ? "Begin fetching data" : "Fetch more data"}
          </Button>
        )}
        {hasAttr && isFetching && (
          <Box display="flex" alignItems="center">
            <Button variant="outlined" onClick={stopFetching}>
              Cancel
            </Button>
            <Box ml={1}>
              <CircularProgress size={18} />
            </Box>
            <Box ml={1}>
              <Timer isActive={isFetching} />
            </Box>
          </Box>
        )}
        <Box mt={2}>
          <Typography>
            Last {tableRowCount} of {rows.length} rows
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>INDEX</TableCell>
                <TableCell>{attribute.toUpperCase()}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row, idx) => ({ row, idx }))
                .slice(rows.length - tableRowCount, rows.length)
                .map(({ row, idx }) => (
                  <TableRow key={row.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.label}</TableCell>
                  </TableRow>
                ))}
              {Array.from("0".repeat(MAX_TABLE_ROW_COUNT - tableRowCount)).map(
                (_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};
