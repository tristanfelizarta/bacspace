import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Avatar,
    Badge,
    chakra,
    Container,
    Flex,
    IconButton,
    Select,
    Td,
    Text,
    Tr
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import { currency } from 'fuctions/currency'
import { month } from 'fuctions/month'

const Payments = () => {
    const router = useRouter()
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: payments, isFetched: isPaymentsFetched } = useQuery(
        ['payments'],
        () => api.all('/payments')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Payments
                </Text>

                <Card>
                    <Table
                        data={payments}
                        fetched={isUsersFetched && isPaymentsFetched}
                        th={[
                            'Tenant',
                            'Type',
                            'Total',
                            'Date',
                            'Method',
                            'Status',
                            ''
                        ]}
                        td={(payment) => (
                            <Tr key={payment._id}>
                                <Td>
                                    {users
                                        .filter(
                                            (user) => user._id === payment.user
                                        )
                                        .map((user) => (
                                            <Flex
                                                align="center"
                                                gap={6}
                                                key={user._id}
                                            >
                                                <Avatar
                                                    name={user.name}
                                                    src={user.image}
                                                />
                                                <Text>{user.name}</Text>
                                            </Flex>
                                        ))}
                                </Td>

                                <Td>
                                    <Badge variant="tinted">
                                        {payment.type}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Text>{currency(payment.total)}</Text>
                                </Td>

                                <Td>
                                    <Text>
                                        {month[
                                            payment.created
                                                .split(',')[0]
                                                .trim()
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            payment.created
                                                .split(',')[0]
                                                .trim()
                                                .split('/')[1] +
                                            ', ' +
                                            payment.created
                                                .split(',')[0]
                                                .trim()
                                                .split('/')[2]}
                                    </Text>
                                </Td>

                                <Td>
                                    <Badge variant="tinted" colorScheme="blue">
                                        {payment.method}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            payment.status === 'Accepted'
                                                ? 'green'
                                                : payment.status ===
                                                  'Processing'
                                                ? 'blue'
                                                : payment.status ===
                                                      'Rejected' && 'red'
                                        }
                                    >
                                        {payment.status}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Flex justify="end">
                                        <IconButton
                                            variant="tinted"
                                            size="xs"
                                            icon={
                                                <FiMoreHorizontal size={16} />
                                            }
                                            onClick={() =>
                                                router.push(
                                                    `/admin/payments/${payment._id}`
                                                )
                                            }
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        )}
                        select={(register) => (
                            <Flex justify="end" align="center" gap={3}>
                                <Select placeholder="Method" size="lg" w="auto">
                                    <chakra.option value="Cash">
                                        Cash
                                    </chakra.option>
                                    <chakra.option value="GCash">
                                        GCash
                                    </chakra.option>
                                    <chakra.option value="PayPal">
                                        PayPal
                                    </chakra.option>
                                    <chakra.option value="Advance">
                                        Advance
                                    </chakra.option>
                                    <chakra.option value="Deposit">
                                        Deposit
                                    </chakra.option>
                                </Select>

                                <Select placeholder="Status" size="lg" w="auto">
                                    <chakra.option value="Published">
                                        Published
                                    </chakra.option>
                                    <chakra.option value="Drafted">
                                        Drafted
                                    </chakra.option>
                                </Select>
                            </Flex>
                        )}
                        settings={{
                            searchWidth: 'full'
                        }}
                    />
                </Card>
            </Flex>
        </Container>
    )
}

export default Payments
