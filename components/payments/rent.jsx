import {
    chakra,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text
} from '@chakra-ui/react'
import Card from 'components/card'

const Rent = ({ data }) => {
    return (
        <>
            <Card>
                <Flex direction="column" gap={6}>
                    <Text fontSize={20} fontWeight="semibold" color="accent-1">
                        Profile Details
                    </Text>

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={data.name}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            value={data.email}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Contact</FormLabel>
                        <Input
                            value={data.contact}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <Divider />

                    <Text fontSize={20} fontWeight="semibold" color="accent-1">
                        Company Details
                    </Text>

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={data.company.name}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            value={data.company.email}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>
                </Flex>
            </Card>

            <Card>
                <Flex direction="column" gap={6}>
                    <Text fontSize={20} fontWeight="semibold" color="accent-1">
                        Rental Fee
                    </Text>

                    <FormControl>
                        <FormLabel>Price</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                value={data.price}
                                size="lg"
                                cursor="default"
                                readOnly
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Advance</FormLabel>

                        <Select
                            value={data.advance}
                            placeholder="Select"
                            size="lg"
                            disabled
                        >
                            <chakra.option value={3}>3 Months</chakra.option>
                            <chakra.option value={6}>6 Months</chakra.option>
                            <chakra.option value={9}>9 Months</chakra.option>
                            <chakra.option value={12}>12 Months</chakra.option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Deposit</FormLabel>

                        <Select
                            value={data.deposit}
                            placeholder="Select"
                            size="lg"
                            disabled
                        >
                            <chakra.option value={3}>3 Months</chakra.option>
                            <chakra.option value={6}>6 Months</chakra.option>
                            <chakra.option value={9}>9 Months</chakra.option>
                            <chakra.option value={12}>12 Months</chakra.option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Total</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                value={data.total}
                                size="lg"
                                cursor="default"
                                readOnly
                            />
                        </InputGroup>
                    </FormControl>
                </Flex>
            </Card>
        </>
    )
}

export default Rent
