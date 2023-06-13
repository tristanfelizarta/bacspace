import {
    AspectRatio,
    chakra,
    Flex,
    Image,
    SimpleGrid,
    Text
} from '@chakra-ui/react'
import Card from 'components/card'

const Blogs = () => {
    return (
        <chakra.section pt={100} id="blogs">
            <Flex direction="column" gap={12}>
                <Flex align="center" direction="column" textAlign="center">
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Blogs
                    </Text>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {[...Array(3)].map((data, index) => (
                        <Card key={index}>
                            <Flex direction="column" gap={6}>
                                <AspectRatio mt={-6} mx={-6} ratio={16 / 9}>
                                    <Image alt="unit" src="/assets/unit.jpg" />
                                </AspectRatio>

                                <Flex direction="column" gap={3}>
                                    <Text
                                        fontWeight="medium"
                                        color="accent-1"
                                        noOfLines={1}
                                    >
                                        Blog Title
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        color="accent-1"
                                        noOfLines={3}
                                    >
                                        Lorem ipsum dolor sit amet consectetur
                                        elit Atque vero aliquid nostrum nemo
                                        maxime quas numquam sed corporis illo
                                        ab, odio qui debitis asperiores
                                        Aspernatur odio saepe quae.
                                    </Text>

                                    <Text textAlign="right" fontSize="xs">
                                        Dec 25, 2022
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </SimpleGrid>
            </Flex>
        </chakra.section>
    )
}

export default Blogs
