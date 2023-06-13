import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import api from 'instance'
import {
    AspectRatio,
    Button,
    chakra,
    Container,
    Divider,
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
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiSearch, FiUploadCloud } from 'react-icons/fi'
import { UnitCard, UnitCardLoading } from 'components/units/card'
import Modal from 'components/modal'
import Toast from 'components/toast'

const AddModal = () => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        formState: { errors },
        setError,
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const handleImage = (e) => {
        const file = e.target.files[0]

        if (!file) {
            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        status="error"
                        title="Error"
                        description="The file does not exist."
                    />
                )
            })

            return
        }

        // if (file.size > 1024 * 1024) {
        // 	toast({
        // 		position: 'top',
        // 		duration: 3000,
        // 		render: () => <Toast status="error" title="Error" description="Largest image size is 1mb." />
        // 	})

        // 	return
        // }

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        status="error"
                        title="Error"
                        description="The image format is incorrect."
                    />
                )
            })

            return
        }

        setImage(file)
    }

    const addMutation = useMutation((data) => api.create('/units', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('units')
            setIsLoading(false)
            disclosure.onClose()

            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Unit added successfully."
                    />
                )
            })
        },
        onError: (error) => {
            setError('number', { type: 'server', message: error.response.data })
            setIsLoading(false)
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)

        if (!image) {
            setIsLoading(false)

            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        status="error"
                        title="Error"
                        description="Please attach an image."
                    />
                )
            })

            return
        }

        let res = null

        for (const item of [image]) {
            const formData = new FormData()

            formData.append('file', item)
            formData.append('upload_preset', 'servers')

            res = await axios.post(
                'https://api.cloudinary.com/v1_1/commence/image/upload',
                formData
            )
        }

        addMutation.mutate({
            image: res.data.secure_url,
            ...data
        })
    }

    return (
        <Modal
            title="Add Unit"
            size="xl"
            toggle={(onOpen) => (
                <Button
                    size="lg"
                    onClick={() => {
                        setImage(null)
                        clearErrors()
                        reset()
                        onOpen()
                    }}
                >
                    Add New
                </Button>
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <AspectRatio ratio={16 / 9}>
                        {image ? (
                            <chakra.div position="relative">
                                <Image
                                    borderRadius={12}
                                    alt="image"
                                    src={
                                        typeof image === 'object'
                                            ? URL.createObjectURL(image)
                                            : image
                                    }
                                />
                                <chakra.input
                                    type="file"
                                    id="file"
                                    display="none"
                                    pointerEvents="none"
                                    onChange={handleImage}
                                />
                                <Button
                                    position="absolute"
                                    bottom={6}
                                    size="lg"
                                    leftIcon={<FiUploadCloud size={16} />}
                                    onClick={() =>
                                        document.getElementById('file').click()
                                    }
                                >
                                    Change Image
                                </Button>
                            </chakra.div>
                        ) : (
                            <Flex
                                direction="column"
                                gap={3}
                                border="2px dashed"
                                borderColor="border"
                                borderRadius={12}
                            >
                                <chakra.input
                                    type="file"
                                    id="file"
                                    display="none"
                                    pointerEvents="none"
                                    onChange={handleImage}
                                />
                                <Button
                                    size="lg"
                                    leftIcon={<FiUploadCloud size={16} />}
                                    onClick={() =>
                                        document.getElementById('file').click()
                                    }
                                >
                                    Upload Image
                                </Button>
                            </Flex>
                        )}
                    </AspectRatio>

                    <FormControl isInvalid={errors.number}>
                        <FormLabel>Number</FormLabel>
                        <Input
                            type="number"
                            size="lg"
                            onWheel={(e) => e.target.blur()}
                            {...register('number', {
                                required: 'This field is required.'
                            })}
                        />
                        <FormErrorMessage>
                            {errors.number?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.type}>
                        <FormLabel>Type</FormLabel>

                        <Select
                            placeholder="Select"
                            size="lg"
                            {...register('type', { required: true })}
                        >
                            <chakra.option value="Single">Single</chakra.option>
                            <chakra.option value="Attached">
                                Attached
                            </chakra.option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.sqm}>
                        <FormLabel>Sqm</FormLabel>
                        <Input
                            size="lg"
                            {...register('sqm', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.price}>
                        <FormLabel>Price</FormLabel>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                pt={1}
                                pl={1}
                            >
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                type="number"
                                size="lg"
                                onWheel={(e) => e.target.blur()}
                                {...register('price', { required: true })}
                            />
                        </InputGroup>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <Flex direction="column" gap={3}>
                        <Button type="submit" size="lg" isLoading={isLoading}>
                            Submit
                        </Button>

                        <Button
                            size="lg"
                            colorScheme="default"
                            onClick={disclosure.onClose}
                        >
                            Close
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    )
}

const Units = () => {
    const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () =>
        api.all('units')
    )
    const { register, watch } = useForm()

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Units
                </Text>

                <Flex justify="space-between" align="center" gap={3}>
                    <Flex flex={1}>
                        <InputGroup>
                            <InputLeftElement pt={1} pl={1} color="accent-1">
                                <FiSearch size={16} />
                            </InputLeftElement>

                            <Input
                                placeholder="Search Units"
                                size="lg"
                                {...register('search')}
                            />
                        </InputGroup>
                    </Flex>

                    <Flex gap={3}>
                        <Select
                            placeholder="Type"
                            size="lg"
                            w="auto"
                            {...register('type')}
                        >
                            <chakra.option value="Single">Single</chakra.option>
                            <chakra.option value="Attached">
                                Attached
                            </chakra.option>
                        </Select>

                        <Select
                            placeholder="Status"
                            size="lg"
                            w="auto"
                            {...register('status')}
                        >
                            <chakra.option value="Occupied">
                                Occupied
                            </chakra.option>
                            <chakra.option value="Reserved">
                                Reserved
                            </chakra.option>
                            <chakra.option value="Vacant">Vacant</chakra.option>
                        </Select>

                        <AddModal />
                    </Flex>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {isUnitsFetched
                        ? units
                              .filter((unit) =>
                                  watch('type')
                                      ? unit.type === watch('type')
                                      : unit
                              )
                              .filter((unit) =>
                                  watch('status')
                                      ? unit.status === watch('status')
                                      : unit
                              )
                              .filter((unit) =>
                                  watch('search')
                                      ? [
                                            'number',
                                            'type',
                                            'sqm',
                                            'status',
                                            'price'
                                        ].some((key) =>
                                            unit[key]
                                                .toString()
                                                .toLowerCase()
                                                .includes(
                                                    watch(
                                                        'search'
                                                    ).toLowerCase()
                                                )
                                        )
                                      : unit
                              )
                              .map((unit) => (
                                  <NextLink
                                      href={`/admin/units/${unit._id}`}
                                      key={unit._id}
                                  >
                                      <UnitCard unit={unit} />
                                  </NextLink>
                              ))
                        : [...Array(3)].map((data, index) => (
                              <UnitCardLoading key={index} />
                          ))}
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Units
