import React from 'react'
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
     }}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
    </div>
  )
}

export default Loader