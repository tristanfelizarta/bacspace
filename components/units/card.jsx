import {
    AspectRatio,
    chakra,
    Flex,
    Image,
    Skeleton,
    Text
} from '@chakra-ui/react'
import Card from 'components/card'
import { currency } from 'fuctions/currency'

export const UnitCard = ({ unit, show, controls }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <AspectRatio mt={-6} mx={-6} ratio={16 / 9}>
                    <Image alt={unit.number} src={unit.image} />
                </AspectRatio>

                <Flex direction="column" gap={3}>
                    <Flex justify="space-between" align="center" gap={3}>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            Number
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {unit.number}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={3}>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            Type
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {unit.type}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={3}>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            Sqm
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {unit.sqm}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={3}>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            Status
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={
                                unit.status === 'Occupied'
                                    ? 'blue.default'
                                    : unit.status === 'Reserved'
                                    ? 'yellow.default'
                                    : unit.status === 'Vacant' && 'red.default'
                            }
                        >
                            {unit.status}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={3}>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            Price
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {currency(unit.price)}
                        </Text>
                    </Flex>

                    {show === 'more' ? (
                        <>
                            <Flex
                                justify="space-between"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="accent-1"
                                >
                                    Advance
                                </Text>

                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="accent-1"
                                >
                                    {unit.tenant.advance} Month
                                    {unit.tenant.advance > 1 ? 's' : null} Left
                                </Text>
                            </Flex>

                            <Flex
                                justify="space-between"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="accent-1"
                                >
                                    Deposit
                                </Text>

                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="accent-1"
                                >
                                    {currency(unit.tenant.deposit)}
                                </Text>
                            </Flex>
                        </>
                    ) : null}
                </Flex>

                {controls}
            </Flex>
        </Card>
    )
}

export const UnitCardLoading = () => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <AspectRatio mt={-6} mx={-6} ratio={16 / 9}>
                    <Skeleton />
                </AspectRatio>

                <chakra.div h={153} w="full" />
            </Flex>
        </Card>
    )
}
