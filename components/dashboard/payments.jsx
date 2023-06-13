import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Avatar,
    Badge,
    Flex,
    GridItem,
    IconButton,
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
        <GridItem colSpan={12}>
            <Card>
                <Flex direction="column" gap={6}>
                    <Text fontSize="xl" fontWeight="semibold" color="accent-1">
                        Payments
                    </Text>

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
                        settings={{
                            search: 'off'
                        }}
                    />
                </Flex>
            </Card>
        </GridItem>
    )
}

export default Payments
