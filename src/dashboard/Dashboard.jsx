import { useState, useEffect } from 'react'

import { 
    HStack, 
    Box,
    Flex,
    Heading,
    Button,
    Input,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';

export default function Dashboard() {

    const [results, setResults] = useState([]);
    const [actualAmount, setActualAmount] = useState([]);

    const [transactionType, setTransactionType] = useState(['error']);
    const [transactionHeading, setTransactionHeading] = useState([]);
    const [transactionVisibility, setTransactionVisibility] = useState([false]);

    const [transactionResults, setTransactionResults] = useState([]);
    const [accountBalance, setAccountBalance] = useState([0]);
    const [accountHistory, setAccountHistory] = useState([]);
    
    const processTransaction = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "amount": actualAmount
            })
        };
      
        fetch(`http://localhost:8050/manager/transaction`, requestOptions)
        .then(response => response.json())
        .then(json => setTransactionResults(json))
        .catch(error => console.error(error));



        const requestOptionsForBalance = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
      
        fetch(`http://localhost:8050/manager/balance`, requestOptionsForBalance)
        .then(response => response.json())
        .then(json => setAccountBalance(json))
        .catch(error => console.error(error));

      
        fetch(`http://localhost:8050/manager/transactions-history`, requestOptionsForBalance)
        .then(response => response.json())
        .then(json => setAccountHistory(json))
        .catch(error => console.error(error));

        console.log(accountHistory);
    }

    const checkClientRequest = (e) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
      
        fetch(`http://localhost:8070/client/get-amount`, requestOptions)
        .then(response => response.json())
        .then(json => setResults(json))
        .catch(error => console.error(error));
        
        
        if(results.amount < 0){
            setActualAmount((results.amount));
            setTransactionType('error');
            setTransactionHeading('Withdrawal');
        }else{
            setActualAmount((results.amount));
            setTransactionType('success');
            setTransactionHeading('Deposit');
        }
    
    }

    return(
        <Box w='100%' p={4}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <HStack w='100%' bg={'#000d1a'} spacing={8} borderRadius={5} margin={5} padding={5} alignItems={'center'}>
                    <Box w='100%'>
                        <Heading as='h5' size='sm'>
                            Client Transaction Manager
                        </Heading>
                        <Box marginTop={10}>
                            <Button w='100%' onClick={checkClientRequest} colorScheme='teal' variant='outline'>Check Client Requests</Button>
                        </Box>
                        <Box marginTop={5} padding={5} w='100%' bg={'#02162C'} alignItems={'center'}>
                            <Box>
                                <Text textAlign={'left'} fontSize='sm' marginBottom={3}>Transaction Amount</Text>
                                <Input  disabled placeholder='Request details will be here' value={actualAmount} />
                            </Box>
                            <Box marginTop={5}>
                                <Text textAlign={'left'} fontSize='sm' marginBottom={3}>Transaction Type</Text>
                                <Alert status={transactionType}>
                                    <AlertIcon />
                                    <AlertTitle>Client Requesting {transactionHeading}</AlertTitle>
                                </Alert>
                            </Box>
                            <Box marginTop={10}>
                                <Button w='100%' onClick={processTransaction} colorScheme='red' variant='outline'>Process Transaction</Button>
                            </Box>
                        </Box>
                    </Box>
                </HStack>
                <HStack w='100%' bg={'#003366'} spacing={8} borderRadius={5} margin={5} padding={5} alignItems={'center'}>
                    <Box w='100%'>
                        <Heading as='h5' size='sm'>
                            Account Monitoring
                        </Heading>
                        <Box marginTop={5} padding={5} w='100%' bg={'#02162C'} alignItems={'center'}>
                            <Box>
                                <Text textAlign={'left'} fontSize='sm' marginBottom={3}>Account Balance</Text>
                                <Heading as='h3' size='lg'>
                                    {accountBalance.balance} USD
                                </Heading>
                            </Box>
                            <Box marginTop={5}>
                                <Text textAlign={'left'} fontSize='sm' marginBottom={3}>Account History</Text>

                                <TableContainer>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Amount</Th>
                                                <Th>Status</Th>
                                                <Th>Time</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>inches</Td>
                                                <Td>millimetres (mm)</Td>
                                                <Td isNumeric>25.4</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </HStack>
            </Flex>
        </Box>
    )
}