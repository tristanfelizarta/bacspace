import { Box, Button, Flex, Text } from '@chakra-ui/react'

const Hero = () => {
    return (
        <Flex gap={12} h={624}>
            <Flex
                flex={1}
                justify="start"
                align="center"
                outline="1px solid transparent"
            >
                <Flex direction="column" align="start" gap={6}>
                    <Text
                        fontSize={80}
                        fontWeight="semibold"
                        lineHeight={1}
                        color="accent-1"
                    >
                        Create your success business.
                    </Text>

                    <Text fontSize="lg">
                        Technology can save you time and money when trying to
                        grow a successful small business. The more of your
                        business operations you can streamline, the easier it
                        becomes to focus on tasks that can promote growth.
                    </Text>

                    <Button size="xl" colorScheme="brand" onClick={() => {}}>
                        Inquire Now
                    </Button>
                </Flex>
            </Flex>

            <Flex
                display={{ base: 'none', lg: 'flex' }}
                flex={1}
                justify="end"
                align="center"
                outline="1px solid transparent"
            >
                <Box
                    bgImage="url('/assets/hero.jpg')"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                    bgPos="center"
                    borderRadius="100px 0 100px 0"
                    h="full"
                    w="full"
                />
            </Flex>
        </Flex>
    )
}

export default Hero
