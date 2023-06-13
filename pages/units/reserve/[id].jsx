import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import api from 'instance'
import {
    Button,
    chakra,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Spinner,
    Text,
    useToast
} from '@chakra-ui/react'
import { FiFilePlus, FiUser, FiX } from 'react-icons/fi'
import { UnitCard } from 'components/units/card'
import Card from 'components/card'
import Toast from 'components/toast'

const Reserve = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()
    const { data: unit, isFetched: isUnitFetched } = useQuery(
        ['unit', id],
        () => api.get('/units', id)
    )

    const queryClient = useQueryClient()
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        watch,
        setValue,
        formState: { errors },
        handleSubmit
    } = useForm()

    const handleFiles = (e) => {
        const file = e.target.files[0]

        if (!file) {
            toast({
                position: 'top',
                render: () => (
                    <Toast
                        title="Error"
                        description="file does not exists."
                        status="error"
                    />
                )
            })

            return
        }

        setFiles(file)
    }

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

        if (file.size > 1024 * 1024) {
            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        status="error"
                        title="Error"
                        description="Largest image size is 1mb."
                    />
                )
            })

            return
        }

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

    const addMutation = useMutation(
        (data) => api.create('/units/reserve', data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('units')
                setIsLoading(false)
                router.push('/profile')

                toast({
                    position: 'top',
                    duration: 3000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="The reserve unit is being processed. "
                        />
                    )
                })
            }
        }
    )

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
                        description="Please attach proof of payment."
                    />
                )
            })

            return
        }

        let res = null
        let res2 = null

        for (const item of [files]) {
            const formData = new FormData()

            formData.append('file', item)
            formData.append('upload_preset', 'servers')

            res = await axios.post(
                'https://api.cloudinary.com/v1_1/commence/raw/upload',
                formData
            )
        }

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
            user: session.user.id,
            unit: unit._id,
            name: data.name,
            email: data.email,
            contact: data.contact,
            company: {
                name: data.company_name,
                email: data.company_email
            },
            files: res.data.secure_url,
            price: data.price,
            duration: Number(watch('duration')) ? Number(watch('duration')) : 1,
            cash: Number(watch('cash')) ? Number(watch('cash')) : 0,
            change: Number(watch('cash'))
                ? Math.abs(Number(watch('cash')) - data.total)
                : 0,
            total: data.total,
            method: data.method,
            proof: res2.data.secure_url,
            type: 'Reserve'
        })
    }

    useEffect(() => {
        if (isUnitFetched) {
            setValue('price', (unit.price / 30).toFixed(2))
            setValue(
                'total',
                watch('duration')
                    ? (watch('price') * Number(watch('duration'))).toFixed(2)
                    : watch('price')
            )
        }
    }, [isUnitFetched, watch('duration')])

    if (!isUnitFetched) {
        return (
            <Container>
                <Spinner color="accent-1" />
            </Container>
        )
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    gridTemplateColumns="1fr 384px"
                    alignItems="start"
                    gap={6}
                >
                    <GridItem display="grid" gap={6}>
                        <Card>
                            <Flex direction="column" gap={6}>
                                <Text
                                    fontSize={20}
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Profile Details
                                </Text>

                                <FormControl isInvalid={errors.name}>
                                    <FormLabel>
                                        Name{' '}
                                        <chakra.span color="red.default">
                                            *
                                        </chakra.span>
                                    </FormLabel>

                                    <Input
                                        defaultValue={session.user.name}
                                        size="lg"
                                        {...register('name', {
                                            required: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        This field is required.
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>
                                        Email Address{' '}
                                        <chakra.span color="red.default">
                                            *
                                        </chakra.span>
                                    </FormLabel>

                                    <Input
                                        value={session.user.email}
                                        size="lg"
                                        cursor="not-allowed"
                                        readOnly
                                        {...register('email', {
                                            required: true
                                        })}
                                    />
                                </FormControl>

                                <FormControl isInvalid={errors.contact}>
                                    <FormLabel>
                                        Contact{' '}
                                        <chakra.span color="red.default">
                                            *
                                        </chakra.span>
                                    </FormLabel>

                                    <Input
                                        type="number"
                                        defaultValue={session.user.contact}
                                        size="lg"
                                        onWheel={(e) => e.target.blur()}
                                        {...register('contact', {
                                            required: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        This field is required.
                                    </FormErrorMessage>
                                </FormControl>

                                <Divider />

                                <Text
                                    fontSize={20}
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Company Details
                                </Text>

                                <FormControl isInvalid={errors.company_name}>
                                    <FormLabel>
                                        Name{' '}
                                        <chakra.span color="red.default">
                                            *
                                        </chakra.span>
                                    </FormLabel>

                                    <Input
                                        defaultValue={session.user.company.name}
                                        size="lg"
                                        {...register('company_name', {
                                            required: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        This field is required.
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.company_email}>
                                    <FormLabel>
                                        Email Address{' '}
                                        <chakra.span color="red.default">
                                            *
                                        </chakra.span>
                                    </FormLabel>

                                    <Input
                                        defaultValue={
                                            session.user.company.email
                                        }
                                        size="lg"
                                        {...register('company_email', {
                                            required: true
                                        })}
                                    />
                                </FormControl>

                                <Divider />

                                <Text
                                    fontSize={20}
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Requirements Document
                                </Text>

                                <FormControl>
                                    <Input
                                        type="file"
                                        id="file"
                                        display="none"
                                        size="lg"
                                        onChange={handleFiles}
                                    />

                                    <Button
                                        leftIcon={<FiFilePlus size={16} />}
                                        onClick={() =>
                                            document
                                                .getElementById('file')
                                                .click()
                                        }
                                    >
                                        Attach File
                                    </Button>

                                    <FormHelperText>
                                        Please download the sample format.{' '}
                                        <chakra.span
                                            as="a"
                                            href="/documents/docs.docx"
                                            textDecoration="underline"
                                            color="blue.default"
                                            cursor="pointer"
                                            download
                                        >
                                            click here.
                                        </chakra.span>
                                    </FormHelperText>
                                </FormControl>
                            </Flex>
                        </Card>

                        <Card>
                            <Flex direction="column" gap={6}>
                                <Text
                                    fontSize={20}
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Reservation Fee
                                </Text>

                                <FormControl>
                                    <FormLabel>Price</FormLabel>

                                    <InputGroup>
                                        <InputLeftElement pt={1} pl={1}>
                                            <Text color="accent-1">₱</Text>
                                        </InputLeftElement>

                                        <Input
                                            size="lg"
                                            cursor="default"
                                            readOnly
                                            {...register('price')}
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Duration</FormLabel>

                                    <Select size="lg" {...register('duration')}>
                                        <chakra.option value={3}>
                                            3 Days
                                        </chakra.option>
                                        <chakra.option value={6}>
                                            6 Days
                                        </chakra.option>
                                        <chakra.option value={9}>
                                            9 Days
                                        </chakra.option>
                                        <chakra.option value={12}>
                                            12 Days
                                        </chakra.option>
                                        <chakra.option value={15}>
                                            15 Days
                                        </chakra.option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Total</FormLabel>

                                    <InputGroup>
                                        <InputLeftElement pt={1} pl={1}>
                                            <Text color="accent-1">₱</Text>
                                        </InputLeftElement>

                                        <Input
                                            size="lg"
                                            cursor="default"
                                            readOnly
                                            {...register('total')}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Flex>
                        </Card>
                    </GridItem>

                    <GridItem display="grid" gap={6}>
                        <UnitCard unit={unit} />

                        <Card>
                            <Flex direction="column" gap={6}>
                                <FormControl isInvalid={errors.method}>
                                    <FormLabel>Payment Method</FormLabel>

                                    <Select
                                        placeholder="Select"
                                        size="lg"
                                        {...register('method', {
                                            required: true
                                        })}
                                    >
                                        <chakra.option value="GCash">
                                            GCash
                                        </chakra.option>
                                        <chakra.option value="Paypal">
                                            Paypal
                                        </chakra.option>
                                    </Select>

                                    <FormErrorMessage>
                                        This field is required.
                                    </FormErrorMessage>
                                </FormControl>

                                {watch('method') === 'GCash' && (
                                    <>
                                        <FormControl>
                                            <FormLabel>Account</FormLabel>

                                            <InputGroup>
                                                <InputLeftElement pt={1} pl={1}>
                                                    <FiUser size={16} />
                                                </InputLeftElement>

                                                <Input
                                                    value="TSVJ Center."
                                                    size="lg"
                                                    readOnly
                                                />
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>
                                                Account Number
                                            </FormLabel>

                                            <InputGroup>
                                                <InputLeftElement pt={1} pl={1}>
                                                    #
                                                </InputLeftElement>

                                                <Input
                                                    value="09123456789"
                                                    size="lg"
                                                    readOnly
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </>
                                )}

                                <chakra.input
                                    type="file"
                                    id="file"
                                    display="none"
                                    pointerEvents="none"
                                    onChange={handleImage}
                                />

                                {image ? (
                                    <InputGroup>
                                        <Input
                                            value={image.name}
                                            size="lg"
                                            cursor="default"
                                            readOnly
                                        />

                                        <InputRightElement pt={1} pr={1}>
                                            <Icon
                                                as={FiX}
                                                boxSize={4}
                                                color="accent-1"
                                                cursor="pointer"
                                                onClick={() => setImage(null)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ) : (
                                    <Button
                                        variant="tinted"
                                        size="lg"
                                        onClick={() =>
                                            document
                                                .getElementById('file')
                                                .click()
                                        }
                                    >
                                        Proof of Payment
                                    </Button>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    Reserve Now
                                </Button>
                            </Flex>
                        </Card>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    )
}

export default Reserve
