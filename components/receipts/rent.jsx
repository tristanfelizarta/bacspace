import { Button, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react'
import Modal from 'components/modal'
import { currency } from 'fuctions/currency'
import { FiPrinter } from 'react-icons/fi'

const RentReceipt = ({ payment, receipt }) => {
    const disclosure = useDisclosure()

    return (
        <Modal
            size="xl"
            header="off"
            toggle={(onOpen) => (
                <Button
                    variant="tinted"
                    size="lg"
                    onClick={() => {
                        onOpen()
                    }}
                >
                    View Payment Receipt
                </Button>
            )}
            disclosure={disclosure}
        >
            <Flex bg="white" direction="column" gap={6} m={-6} p={6}>
                <Text
                    fontFamily="monospace"
                    fontSize={24}
                    fontWeight="semibold"
                    textAlign="center"
                    color="brand.default"
                >
                    TSVJ Center
                </Text>

                <Text
                    mt={-6}
                    fontFamily="monospace"
                    fontSize={14}
                    fontWeight="semibold"
                    textAlign="center"
                    color="brand.default"
                >
                    Lot 6, Crispina Avenue, Pamplona Tres, Las Pinas City
                </Text>

                <Divider variant="dashed" borderColor="brand.default" />

                <Flex direction="column" gap={3}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Name
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {receipt.data.name}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Time
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {receipt.created.split(',')[1]}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Date
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {receipt.created.split(',')[0]}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="brand.default" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Price
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(payment.data.price)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Advance
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(
                                payment.data.price * payment.data.advance
                            )}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Deposit
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(
                                payment.data.price * payment.data.deposit
                            )}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="brand.default" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Total
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(receipt.total)}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="brand.default" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Cash
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(receipt.cash)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            Change
                        </Text>

                        <Text
                            fontSize={16}
                            fontFamily="monospace"
                            fontWeight="semibold"
                            color="brand.default"
                        >
                            {currency(receipt.change)}
                        </Text>
                    </Flex>
                </Flex>

                <Divider variant="dashed" borderColor="brand.default" />

                <Text
                    fontSize={16}
                    fontWeight="semibold"
                    fontFamily="monospace"
                    textAlign="center"
                    color="brand.default"
                >
                    ****** THANK YOU ******
                </Text>
            </Flex>

            <Flex
                w="full"
                position="absolute"
                justify="center"
                bottom={-16}
                ml={-6}
            >
                <Button
                    bg="brand.default"
                    leftIcon={<FiPrinter size={16} />}
                    onClick={() => window.print()}
                >
                    Print
                </Button>
            </Flex>
        </Modal>
    )
}

export default RentReceipt
