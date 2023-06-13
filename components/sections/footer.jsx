import { chakra, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
    return (
        <chakra.footer pt={100}>
            <Flex justify="center" align="center" textAlign="center">
                <Text fontSize="sm">© 2023 Bacspace All rights reserved</Text>
            </Flex>
        </chakra.footer>
    )
}

export default Footer
