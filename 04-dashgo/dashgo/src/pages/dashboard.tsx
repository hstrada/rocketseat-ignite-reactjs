import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { SideBar } from '../components/Sidebar';

const options = {};

const series = [{ name: 'series 1', data: [31, 120, 10, 28, 51, 18, 64] }];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignContent="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {typeof window !== 'undefined' && (
              <ApexCharts
                type="area"
                height={160}
                options={options}
                series={series}
              />
            )}
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
