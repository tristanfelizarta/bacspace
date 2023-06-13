import { signIn } from 'next-auth/react'
import { Button, chakra, Flex, Text } from '@chakra-ui/react'

const CTA = () => {
    return (
        <chakra.section pt={100}>
            <Flex
                bg="brand.default"
                justify="space-between"
                align="center"
                gap={12}
                border="1px"
                borderColor="brand.default"
                borderRadius={12}
                p={12}
            >
                <Flex flex={1} direction="column">
                    <Text fontSize={32} fontWeight="semibold" color="white">
                        Start using our app today.
                    </Text>

                    <Text fontSize="sm" color="white">
                        Technology can save you time and money when trying to
                        grow a successful small business.
                    </Text>
                </Flex>

                <Button
                    variant="default"
                    border="2px"
                    size="xl"
                    color="white"
                    onClick={() => signIn('google')}
                >
                    Sign in Now
                </Button>
            </Flex>
        </chakra.section>
    )
}

export default CTA
