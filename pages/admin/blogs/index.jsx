import NextLink from 'next/link'
import {
    AspectRatio,
    Button,
    chakra,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useDisclosure
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'

const AddModal = () => {
    const disclosure = useDisclosure()

    return (
        <Modal
            size="xl"
            header="off"
            toggle={(onOpen) => (
                <Button size="lg" colorScheme="brand" onClick={onOpen}>
                    Add New
                </Button>
            )}
            disclosure={disclosure}
        >
            <Flex direction="column" gap={6}>
                <AspectRatio mt={-6} mx={-6} ratio={16 / 9}>
                    <Image alt="unit" src="/assets/unit.jpg" />
                </AspectRatio>

                <FormControl>
                    <FormLabel>
                        Title <chakra.span color="red.default">*</chakra.span>
                    </FormLabel>

                    <Input size="lg" />
                    <FormErrorMessage>This field is required.</FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>
                        Description{' '}
                        <chakra.span color="red.default">*</chakra.span>
                    </FormLabel>

                    <Textarea size="lg" minH={220} />
                    <FormErrorMessage>This field is required.</FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>
                        Status <chakra.span color="red.default">*</chakra.span>
                    </FormLabel>

                    <Select placeholder="Select" size="lg">
                        <chakra.option value="Publish">Publish</chakra.option>
                        <chakra.option value="Draft">Draft</chakra.option>
                    </Select>

                    <FormErrorMessage>This field is required.</FormErrorMessage>
                </FormControl>

                <Flex direction="column" gap={3}>
                    <Button size="lg" colorScheme="brand">
                        Submit
                    </Button>

                    <Button size="lg" onClick={disclosure.onClose}>
                        Close
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    )
}

const Blogs = () => {
    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Blogs
                </Text>

                <Flex justify="space-between" align="center" gap={3}>
                    <Flex flex={1}>
                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <FiSearch size={16} />
                            </InputLeftElement>

                            <Input size="lg" />
                        </InputGroup>
                    </Flex>

                    <Select placeholder="Status" size="lg" w="auto">
                        <chakra.option></chakra.option>
                    </Select>

                    <AddModal />
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {[...Array(3)].map((data, index) => (
                        <Card key={index}>
                            <Flex direction="column" gap={6}>
                                <NextLink href={`/admin/blogs/${1}`} passHref>
                                    <AspectRatio mt={-6} mx={-6} ratio={16 / 9}>
                                        <Image
                                            alt="unit"
                                            src="/assets/unit.jpg"
                                        />
                                    </AspectRatio>
                                </NextLink>

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
        </Container>
    )
}

export default Blogs
