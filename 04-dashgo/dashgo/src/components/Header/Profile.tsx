import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Helena Strada</Text>
          <Text color="gray.300" fontSize="small">
            hstrada407@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Helena Strada"
        src="https://github.com/hstrada.png"
      />
    </Flex>
  );
}
