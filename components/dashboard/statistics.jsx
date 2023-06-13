import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Flex, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiCheckSquare, FiCreditCard, FiGrid, FiUsers } from 'react-icons/fi'
import Card from 'components/card'

const Statistics = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('users')
    )
    const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () =>
        api.all('units')
    )
    const { data: payments, isFetched: isPaymentsFetched } = useQuery(
        ['payments'],
        () => api.all('payments')
    )

    return (
        <>
            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isUnitsFetched
                                    ? units.filter(
                                          (unit) => unit.status === 'Vacant'
                                      ).length
                                    : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Vacant Units
                            </Text>
                        </Flex>

                        <Flex
                            bg="accent-1"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon
                                as={FiCheckSquare}
                                boxSize={6}
                                color="white"
                                _dark={{ color: 'brand.default' }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isUnitsFetched ? units.length : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Units
                            </Text>
                        </Flex>

                        <Flex
                            bg="accent-1"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon
                                as={FiGrid}
                                boxSize={6}
                                color="white"
                                _dark={{ color: 'brand.default' }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isUsersFetched
                                    ? users.filter(
                                          (user) => user.role === 'Tenant'
                                      ).length
                                    : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Tenants
                            </Text>
                        </Flex>

                        <Flex
                            bg="accent-1"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon
                                as={FiUsers}
                                boxSize={6}
                                color="white"
                                _dark={{ color: 'brand.default' }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isPaymentsFetched
                                    ? payments.filter(
                                          (payment) =>
                                              payment.status === 'Processing'
                                      ).length
                                    : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Payments
                            </Text>
                        </Flex>

                        <Flex
                            bg="accent-1"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon
                                as={FiCreditCard}
                                boxSize={6}
                                color="white"
                                _dark={{ color: 'brand.default' }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>
        </>
    )
}

export default Statistics
