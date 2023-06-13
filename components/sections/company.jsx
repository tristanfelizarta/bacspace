import { chakra, Flex, Image, Text } from '@chakra-ui/react'

const Company = () => {
    return (
        <chakra.section pt={100} id="company">
            <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={12}>
                <Flex flex={1}>
                    <Flex direction="column" gap={3}>
                        <Text fontSize={32} fontWeight="bold" color="accent-1">
                            Bacspace
                        </Text>

                        <Text color="accent-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatem quidem architecto aspernatur porro
                            corporis dolorem quam, dolorum dolores nisi unde
                            doloremque quo adipisci deleniti saepe inventore
                            labore similique.
                        </Text>

                        <Text color="accent-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatem quidem architecto aspernatur porro
                            corporis dolorem quam, dolorum dolores nisi unde
                            doloremque quo adipisci deleniti saepe inventore
                            labore similique.
                        </Text>

                        <Text color="accent-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatem quidem architecto aspernatur porro
                            corporis dolorem quam, dolorum dolores nisi unde
                            doloremque quo adipisci deleniti saepe inventore
                            labore similique.
                        </Text>

                        <Text color="accent-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatem quidem architecto aspernatur porro
                            corporis dolorem quam, dolorum dolores nisi unde
                            doloremque quo adipisci deleniti saepe inventore
                            labore similique.
                        </Text>
                    </Flex>
                </Flex>

                <Flex flex={1}>
                    <Image
                        borderRadius={12}
                        alt="company"
                        src="/assets/company.jpg"
                    />
                </Flex>
            </Flex>
        </chakra.section>
    )
}

export default Company
