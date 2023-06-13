import { useState } from 'react'
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
    Flex,
    FormControl,
    FormErrorMessage,
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
import { FiPrinter, FiUser, FiX } from 'react-icons/fi'
import Card from 'components/card'
import Toast from 'components/toast'
import { UnitCard } from 'components/units/card'
import Soa from 'components/checkout/soa'

const Checkout = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()
    const { data: soa, isFetched: isSoaFetched } = useQuery(['soa', id], () =>
        api.get('/soas', id)
    )
    const { data: user, isFetched: isUserFetched } = useQuery(
        ['user'],
        () => api.get('/users', soa.user),
        { enabled: isSoaFetched }
    )
    const { data: unit, isFetched: isUnitFetched } = useQuery(
        ['unit'],
        () => api.get('/units', soa.unit),
        { enabled: isSoaFetched }
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

    const addMutation = useMutation((data) => api.create('/payments', data), {
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
                        description="The Soa is being processed. "
                    />
                )
            })
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)

        if (watch('method') === 'Advance' || watch('method') === 'Deposit') {
            addMutation.mutate({
                user: user._id,
                unit: unit._id,
                soa: soa,
                total: soa.total,
                advance: unit.tenant.advance,
                deposit: unit.tenant.deposit,
                cash: Number(watch('cash')) ? Number(watch('cash')) : 0,
                change: Number(watch('cash'))
                    ? Math.abs(Number(watch('cash')) - Number(soa.total))
                    : 0,
                method: data.method,
                type: 'Soa'
            })
        } else {
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
                user: user._id,
                unit: unit._id,
                soa: soa,
                total: soa.total,
                cash: Number(watch('cash')) ? Number(watch('cash')) : 0,
                change: Number(watch('cash'))
                    ? Math.abs(Number(watch('cash')) - Number(soa.total))
                    : 0,
                method: data.method,
                proof: res.data.secure_url,
                type: 'Soa'
            })
        }
    }

    if (!session) {
        router.push('/')
        return
    }

    if (!isSoaFetched || !isUserFetched || !isUnitFetched) {
        return (
            <Container>
                <Spinner color="accent-1" />
            </Container>
        )
    }

    return (
        <Container>
            <Grid templateColumns="1fr 384px" alignItems="start" gap={6}>
                <GridItem display="grid" gap={6}>
                    <Soa soa={soa} />
                </GridItem>

                <GridItem display="grid" gap={6}>
                    <UnitCard
                        unit={unit}
                        show="more"
                        controls={
                            <Button
                                variant="tinted"
                                size="lg"
                                leftIcon={<FiPrinter size={16} />}
                                onClick={() => router.push(`/print/${soa._id}`)}
                            >
                                Print Soa
                            </Button>
                        }
                    />

                    <Card>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <chakra.option value="Cash">
                                            Cash
                                        </chakra.option>
                                        <chakra.option value="GCash">
                                            GCash
                                        </chakra.option>
                                        <chakra.option value="Paypal">
                                            Paypal
                                        </chakra.option>
                                        {unit.tenant.advance !== 0 && (
                                            <chakra.option value="Advance">
                                                Advance
                                            </chakra.option>
                                        )}
                                        {Number(unit.tenant.deposit) >=
                                            soa.total && (
                                            <chakra.option value="Deposit">
                                                Deposit
                                            </chakra.option>
                                        )}
                                    </Select>

                                    <FormErrorMessage>
                                        This field is required.
                                    </FormErrorMessage>
                                </FormControl>

                                {watch('method') === 'Cash' && (
                                    <FormControl isInvalid={errors.cash}>
                                        <FormLabel>Cash Amount</FormLabel>

                                        <InputGroup>
                                            <InputLeftElement pt={1} pl={1}>
                                                <Text color="accent-1">₱</Text>
                                            </InputLeftElement>

                                            <Input
                                                type="number"
                                                size="lg"
                                                onWheel={(e) => e.target.blur()}
                                                {...register('cash', {
                                                    required: true
                                                })}
                                            />
                                        </InputGroup>

                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                )}

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

                                {watch('method') !== 'Advance' &&
                                    watch('method') !== 'Deposit' &&
                                    (image ? (
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
                                                    onClick={() =>
                                                        setImage(null)
                                                    }
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
                                    ))}

                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    Rent Now
                                </Button>
                            </Flex>
                        </form>
                    </Card>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Checkout
