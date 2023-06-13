import { Container, Flex, Text } from '@chakra-ui/react'

const Blogs = () => {
    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Blogs
                </Text>
            </Flex>
        </Container>
    )
}

export default Blogs
