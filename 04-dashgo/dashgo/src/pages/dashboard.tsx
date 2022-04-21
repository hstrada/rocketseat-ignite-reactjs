import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'

import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { SideBar } from '../components/Sidebar'

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T09:00:00.000Z',
      '2021-03-19T09:00:00.000Z',
      '2021-03-20T09:00:00.000Z',
      '2021-03-21T09:00:00.000Z',
      '2021-03-22T09:00:00.000Z',
      '2021-03-23T09:00:00.000Z',
      '2021-03-24T09:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [{ name: 'series 1', data: [31, 120, 10, 28, 51, 18, 64] }]

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
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            {typeof window !== 'undefined' && (
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            )}
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            {typeof window !== 'undefined' && (
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
