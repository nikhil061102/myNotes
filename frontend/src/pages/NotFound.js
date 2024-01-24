import { Link, Text } from '@chakra-ui/react';
import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Text fontSize='6xl'>404 Not Found</Text>
      <Text fontSize='3xl'>The requested page could not be found.</Text>
      <Text fontSize='xl'>For Login/Signup, <Link color='blue.500' href='/'>Click Here</Link></Text>
    </div>
  );
};

export default NotFound;