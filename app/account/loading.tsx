"use client";

import { Box } from "@/components";
import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#B72FCF" size={40} />
    </Box>
  );
};

export default Loading;
