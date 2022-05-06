import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Text,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { SideBar } from '../../components/Sidebar';
import { useUsers } from '../../services/hooks/useUsers';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUsers();

  const UsersData = () => (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={['4', '4', '6']} color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            <Th width="8"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((user) => {
            return (
              <Tr key={user.id}>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{user.name}</Text>
                    <Text fontSize="small" color="gray.300">
                      {user.email}
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>{user.createdAt}</Td>}
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="small"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Pagination
        totalCountOfRegisters={200}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="small" color="gray.500" ml="4" />
              )}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar usuário
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados do usuário</Text>
            </Flex>
          ) : (
            <UsersData />
          )}
        </Box>
      </Flex>
    </Box>
  );
}
