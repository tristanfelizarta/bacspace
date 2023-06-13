import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Badge,
    Button,
    chakra,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Spinner,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import Modal from 'components/modal'
import Toast from 'components/toast'
import { currency } from 'fuctions/currency'
import { month } from 'fuctions/month'

const FormModal = ({ user, unit, soa, type }) => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const vat = 12
    const lapses = 2

    const { data: soas, isFetched: isSoasFetched } = useQuery(['soas'], () =>
        api.all('/soas')
    )

    const find = isSoasFetched
        ? soas
              .filter((soa) => soa.unit === unit._id)
              .filter((soa) => !soa.payed)
              .map((soa) => {
                  return { total: Number(soa.total) }
              })
        : []

    const laps = (data) => {
        let sum = 0

        data.map((data) => {
            sum = sum + data.total
        })

        return sum
    }

    const {
        register,
        watch,
        setValue,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const addMutation = useMutation((data) => api.create('/soas', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('soa')
            setIsLoading(false)
            disclosure.onClose()

            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Soa added successfully."
                    />
                )
            })
        }
    })

    const editMutation = useMutation(
        (data) => api.update('/soas', soa._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('soa')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 3000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Soa updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (data) => {
        setIsLoading(true)

        if (type === 'Add') {
            addMutation.mutate({
                user: user._id,
                unit: unit._id,
                start: data.start,
                due: data.due,
                monthly: data.monthly,
                camc: data.camc,
                vat: data.vat,
                lapses: data.lapses,
                water: {
                    previous: {
                        reading: data.previous_reading,
                        date: data.previous_date
                    },
                    current: {
                        reading: data.current_reading,
                        date: data.current_date
                    },
                    amount: data.water_bill
                },
                subtotal: data.subtotal,
                taxes: data.taxes,
                total: data.total,
                status: data.status
            })
        } else {
            editMutation.mutate({
                user: user._id,
                unit: unit._id,
                start: data.start,
                due: data.due,
                monthly: data.monthly,
                camc: data.camc,
                vat: data.vat,
                lapses: data.lapses,
                water: {
                    previous: {
                        reading: data.previous_reading,
                        date: data.previous_date
                    },
                    current: {
                        reading: data.current_reading,
                        date: data.current_date
                    },
                    amount: data.water_bill
                },
                subtotal: data.subtotal,
                taxes: data.taxes,
                total: data.total,
                status: data.status
            })
        }
    }

    useEffect(() => {
        setValue(
            'vat',
            (unit.price + (Number(watch('camc')) ? Number(watch('camc')) : 0)) *
                (vat / 100)
        )
        setValue(
            'water_bill',
            Number(watch('previous_reading')) &&
                Number(watch('current_reading'))
                ? Math.abs(
                      Number(watch('previous_reading')) -
                          Number(watch('current_reading'))
                  ) * 60
                : 0
        )
        setValue(
            'subtotal',
            (Number(watch('monthly')) ? Number(watch('monthly')) : unit.price) +
                (Number(watch('camc')) ? Number(watch('camc')) : 0) +
                (Number(watch('water_bill')) ? Number(watch('water_bill')) : 0)
        )
        setValue('taxes', watch('vat') + Number(watch('lapses')))
        setValue('total', watch('subtotal') + watch('taxes'))
    }, [watch('camc'), watch('previous_reading'), watch('current_reading')])

    return (
        <Modal
            title="Statement of Account"
            size="xl"
            toggle={(onOpen) => {
                if (type === 'Add') {
                    return (
                        <Button
                            size="lg"
                            onClick={() => {
                                setIsLoading(false)
                                clearErrors()
                                reset()
                                setValue('monthly', unit.price)
                                onOpen()
                            }}
                        >
                            Add New
                        </Button>
                    )
                } else {
                    return (
                        <IconButton
                            variant="tinted"
                            size="xs"
                            icon={<FiMoreHorizontal size={12} />}
                            onClick={() => {
                                setIsLoading(false)
                                clearErrors()
                                reset()
                                setValue('start', soa.start)
                                setValue('due', soa.due)
                                setValue('monthly', soa.monthly)
                                setValue('camc', soa.camc)
                                setValue('vat', soa.vat)
                                setValue('lapses', soa.lapses)
                                setValue(
                                    'previous_reading',
                                    soa.water.previous.reading
                                )
                                setValue(
                                    'previous_date',
                                    soa.water.previous.date
                                )
                                setValue(
                                    'current_reading',
                                    soa.water.current.reading
                                )
                                setValue('current_date', soa.water.current.date)
                                setValue('water_bill', soa.water.amount)
                                setValue('subtotal', soa.subtotal)
                                setValue('taxes', soa.taxes)
                                setValue('total', soa.total)
                                setValue('status', soa.status)
                                onOpen()
                            }}
                        />
                    )
                }
            }}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <Flex align="start" gap={6}>
                        <FormControl isInvalid={errors.start}>
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                defaultValue={soa?.start}
                                size="lg"
                                {...register('start', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.due}>
                            <FormLabel>Due Date</FormLabel>
                            <Input
                                type="date"
                                size="lg"
                                {...register('due', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <Divider />

                    <FormControl>
                        <FormLabel>Monthly Rent</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('monthly')}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isInvalid={errors.camc}>
                        <FormLabel>CAMC</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                type="number"
                                size="lg"
                                onWheel={(e) => e.target.blur()}
                                {...register('camc', { required: true })}
                            />
                        </InputGroup>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Value-Added Tax (12%)</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('vat')}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Previous Bill</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                type="number"
                                value={laps(find)}
                                size="lg"
                                cursor="default"
                                readOnly
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Lapses (2%)</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                type="number"
                                value={(laps(find) * (2 / 100)).toFixed(2)}
                                size="lg"
                                cursor="default"
                                readOnly
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl display="none">
                        <FormLabel></FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                type="number"
                                value={(laps(find) * (2 / 100)).toFixed(2)}
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('lapses')}
                            />
                        </InputGroup>
                    </FormControl>

                    <Divider />

                    <Flex align="start" gap={6}>
                        <FormControl isInvalid={errors.previous_reading}>
                            <FormLabel>Previous Reading</FormLabel>
                            <Input
                                type="number"
                                size="lg"
                                onWheel={(e) => e.target.blur()}
                                {...register('previous_reading', {
                                    required: true
                                })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.previous_date}>
                            <FormLabel>Previous Date</FormLabel>
                            <Input
                                type="date"
                                size="lg"
                                {...register('previous_date', {
                                    required: true
                                })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <Flex align="start" gap={6}>
                        <FormControl isInvalid={errors.current_reading}>
                            <FormLabel>Current Reading</FormLabel>
                            <Input
                                type="number"
                                size="lg"
                                onWheel={(e) => e.target.blur()}
                                {...register('current_reading', {
                                    required: true
                                })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.current_date}>
                            <FormLabel>Current Date</FormLabel>
                            <Input
                                type="date"
                                size="lg"
                                {...register('current_date', {
                                    required: true
                                })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <FormControl>
                        <FormLabel>Water Bill</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('water_bill')}
                            />
                        </InputGroup>
                    </FormControl>

                    <Divider />

                    <FormControl>
                        <FormLabel>Subtotal</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('subtotal')}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Taxes</FormLabel>

                        <InputGroup>
                            <InputLeftElement pt={1} pl={1}>
                                <Text color="accent-1">₱</Text>
                            </InputLeftElement>

                            <Input
                                size="lg"
                                cursor="default"
                                readOnly
                                {...register('taxes')}
                            />
                        </InputGroup>
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

                    <Divider />

                    <FormControl isInvalid={errors.status}>
                        <FormLabel>Status</FormLabel>

                        <Select
                            placeholder="Select"
                            size="lg"
                            {...register('status', { required: true })}
                        >
                            <chakra.option value="Published">
                                Publish
                            </chakra.option>
                            <chakra.option value="Drafted">Draft</chakra.option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <Button type="submit" size="lg" isLoading={isLoading}>
                        Save Changes
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

const Soa = ({ session, user, unit }) => {
    const router = useRouter()
    const { data: soas, isFetched: isSoasFetched } = useQuery(['soas'], () =>
        api.all('/soas')
    )

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={20} fontWeight="semibold" color="accent-1">
                    Statement of Account
                </Text>

                <Table
                    data={soas}
                    fetched={isSoasFetched}
                    th={['Total', 'Created', 'Updated', 'Status', 'Payed', '']}
                    td={(soa) => (
                        <Tr key={soa._id}>
                            <Td>
                                <Text>{currency(soa.total)}</Text>
                            </Td>

                            <Td>
                                <Text>
                                    {month[
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[1] +
                                        ', ' +
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[2]}
                                </Text>
                            </Td>

                            <Td>
                                <Text>
                                    {month[
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[1] +
                                        ', ' +
                                        soa.updated
                                            .split(',')[0]
                                            .trim()
                                            .split('/')[2]}
                                </Text>
                            </Td>

                            <Td>
                                <Badge
                                    variant="tinted"
                                    colorScheme={
                                        soa.status === 'Published'
                                            ? 'blue'
                                            : 'yellow'
                                    }
                                >
                                    {soa.status}
                                </Badge>
                            </Td>

                            <Td>
                                <Badge
                                    variant="tinted"
                                    colorScheme={soa.payed ? 'blue' : 'red'}
                                >
                                    {soa.payed ? 'Paid' : 'Unpaid'}
                                </Badge>
                            </Td>

                            <Td>
                                <Flex justify="end">
                                    {session.user.role === 'Admin' ? (
                                        <FormModal
                                            user={user}
                                            unit={unit}
                                            soa={soa}
                                            type="Edit"
                                        />
                                    ) : (
                                        <IconButton
                                            variant="tinted"
                                            size="xs"
                                            icon={
                                                <FiMoreHorizontal size={16} />
                                            }
                                            onClick={() =>
                                                router.push(
                                                    `/checkout/${soa._id}`
                                                )
                                            }
                                        />
                                    )}
                                </Flex>
                            </Td>
                        </Tr>
                    )}
                    select={(register) => (
                        <Flex justify="end" align="center" gap={3}>
                            <Select placeholder="Status" size="lg" w="auto">
                                <chakra.option value="Published">
                                    Published
                                </chakra.option>
                                <chakra.option value="Drafted">
                                    Drafted
                                </chakra.option>
                            </Select>

                            {session.user.role === 'Admin' && (
                                <FormModal user={user} unit={unit} type="Add" />
                            )}
                        </Flex>
                    )}
                    filters={(soa) => {
                        return soa.filter((soa) => soa.user === user._id)
                    }}
                    settings={{
                        searchWidth: 'full'
                    }}
                />
            </Flex>
        </Card>
    )
}

export default Soa
