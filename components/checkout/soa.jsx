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
import { currency } from 'fuctions/currency'

const Soa = ({ soa }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Flex align="start" gap={6}>
                    <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input
                            type="date"
                            value={soa.start}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Due Date</FormLabel>
                        <Input
                            type="date"
                            value={soa.due}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>
                </Flex>

                <Divider />

                <FormControl>
                    <FormLabel>Monthly Rent</FormLabel>
                    <Input
                        value={currency(soa.monthly)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>CAMC</FormLabel>
                    <Input
                        value={currency(soa.camc)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Value-Added Tax (12%)</FormLabel>
                    <Input
                        value={currency(soa.vat)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Lapses (2%)</FormLabel>
                    <Input
                        value={currency(soa.lapses)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <Divider />

                <Flex align="start" gap={6}>
                    <FormControl>
                        <FormLabel>Previous Reading</FormLabel>
                        <Input
                            value={soa.water.previous.reading}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Previous Date</FormLabel>
                        <Input
                            type="date"
                            value={soa.water.previous.date}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>
                </Flex>

                <Flex align="start" gap={6}>
                    <FormControl>
                        <FormLabel>Current Reading</FormLabel>
                        <Input
                            value={soa.water.current.reading}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Current Date</FormLabel>
                        <Input
                            type="date"
                            value={soa.water.current.date}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>
                </Flex>

                <FormControl>
                    <FormLabel>Water Bill</FormLabel>
                    <Input
                        value={currency(soa.water.amount)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <Divider />

                <FormControl>
                    <FormLabel>Subtotal</FormLabel>
                    <Input
                        value={currency(soa.subtotal)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Taxes</FormLabel>
                    <Input
                        value={currency(soa.taxes)}
                        size="lg"
                        cursor="default"
                        readOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Total</FormLabel>

                    <InputGroup>
                        <InputLeftElement pt={1} pl={1}>
                            <Text color="accent-1">₱</Text>
                        </InputLeftElement>

                        <Input
                            value={currency(soa.total)}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </InputGroup>
                </FormControl>

                <Divider />

                <FormControl>
                    <FormLabel>Status</FormLabel>

                    <Select
                        value={soa.status}
                        placeholder="Select"
                        size="lg"
                        disabled
                    >
                        <chakra.option value="Published">Publish</chakra.option>
                        <chakra.option value="Drafted">Draft</chakra.option>
                    </Select>
                </FormControl>
            </Flex>
        </Card>
    )
}

export default Soa
