import { Container, Flex, Text } from '@chakra-ui/react'

const Contact = () => {
    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Contact
                </Text>
            </Flex>
        </Container>
    )
}

export default Contact
