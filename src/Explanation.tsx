import { Typography, Box, Link } from "@mui/material";
import React, { FunctionComponent } from "react";

export const Explanation: FunctionComponent = () => {
  return (
    <Box mt="16px">
      <Typography gutterBottom>
        An intuitive way to understand Benford's Law is to look at how much
        growth is required to grow from one number to another.
      </Typography>
      <Typography>
        This figure uses the radii of circles to represent the relative size of
        adjacent numbers between 1 and 9.
      </Typography>
      <Box mt="16px" mb="16px">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <svg width="100px" height="100px">
            <circle
              r={`${(25 * (num + 1)) / num}px`}
              cx="50px"
              cy="50px"
              fill="#1976d2"
            ></circle>
            <circle r="25px" cx="50px" cy="50px" fill="#97badd"></circle>
            <text
              x="50px"
              y="50px"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {num} -&gt; {num + 1}
            </text>
          </svg>
        ))}
      </Box>
      <Typography gutterBottom>
        In order for 1 to grow to 2, it has to double; while the number 8 only
        has to grow by 12.5% to become 9. This is true across all orders of
        magnitude (i.e. 1,000 * 2 = 2,000 while 8,000 * 1.125 = 9,000).
      </Typography>
      <Typography gutterBottom>
        This means that for collections of numbers that tend to grow/shrink
        across multiple orders of magnitude, members of the collection will
        "spend more time" in numbers with smaller leading digits.
      </Typography>
      <Box mt="24px">
        <Typography>
          For more details and formal explanations of Benford's Law,&nbsp;
          <Link
            target="_blank"
            href="https://en.wikipedia.org/wiki/Benford%27s_law"
            color="textPrimary"
          >
            read the Wikipedia article
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
};
