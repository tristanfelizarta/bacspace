import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Badge,
    chakra,
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

const Payments = ({ session, user, unit }) => {
    const router = useRouter()
    const { data: payments, isFetched: isPaymentsFetched } = useQuery(
        ['payments'],
        () => api.all('/payments')
    )

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={20} fontWeight="semibold" color="accent-1">
                    Payment History
                </Text>
                <Table
                    data={payments}
                    fetched={isPaymentsFetched}
                    th={['Type', 'Total', 'Date', 'Method', 'Status', '']}
                    td={(payment) => (
                        <Tr key={payment._id}>
                            <Td>
                                <Badge variant="tinted">{payment.type}</Badge>
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
                                            : payment.status === 'Processing'
                                            ? 'blue'
                                            : payment.status === 'Rejected' &&
                                              'red'
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
                                        icon={<FiMoreHorizontal size={16} />}
                                        onClick={() =>
                                            router.push(
                                                session.user.role === 'Admin'
                                                    ? `/admin/payments/${payment._id}`
                                                    : `/payments/${payment._id}`
                                            )
                                        }
                                    />
                                </Flex>
                            </Td>
                        </Tr>
                    )}
                    select={(register) => (
                        <Flex justify="end" align="center" gap={3}>
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
            </Flex>
        </Card>
    )
}

export default Payments
