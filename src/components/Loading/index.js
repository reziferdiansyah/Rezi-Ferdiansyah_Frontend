import React from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box h="100%" w="100%">
      <Center>
        <Spinner 
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray" 
        size="xl"/>
      </Center>
    </Box>
  );
}
