import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Avatar,
    Button,
    chakra,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Skeleton,
    SkeletonCircle,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiChevronRight, FiDownloadCloud, FiPlus } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Table from 'components/table'
import Toast from 'components/toast'

const FormModal = ({ user, unit, type }) => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const {
        register,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const addMutation = useMutation((data) => api.create('/units/add', data), {
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries('users'),
                queryClient.invalidateQueries('units')
            ])
            setIsLoading(false)
            disclosure.onClose()

            toast({
                position: 'top',
                duration: 3000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Tenant added successfully"
                    />
                )
            })
        }
    })

    const editMutation = useMutation(
        (data) => api.update('/users', user._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 3000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Tenant updated successfully"
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
                name: data.name,
                contact: data.contact,
                company: {
                    name: data.company_name,
                    email: data.company_email
                }
            })
        } else {
            editMutation.mutate({
                name: data.name,
                contact: data.contact,
                company: {
                    name: data.company_name,
                    email: data.company_email
                }
            })
        }
    }

    return (
        <Modal
            title={`${type} Tenant`}
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    variant="tinted"
                    borderRadius="full"
                    icon={<FiChevronRight size={16} />}
                    onClick={() => {
                        setIsLoading(false)
                        clearErrors()
                        reset()
                        onOpen()
                    }}
                />
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <Text fontWeight="semibold" color="accent-1">
                        Profile Details
                    </Text>

                    <FormControl isInvalid={errors.name}>
                        <FormLabel>
                            Name{' '}
                            <chakra.span color="red.default">*</chakra.span>
                        </FormLabel>

                        <Input
                            defaultValue={user.name}
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                            Email Address{' '}
                            <chakra.span color="red.default">*</chakra.span>
                        </FormLabel>

                        <Input
                            value={user.email}
                            size="lg"
                            cursor="not-allowed"
                            readOnly
                        />
                    </FormControl>

                    <FormControl isInvalid={errors.contact}>
                        <FormLabel>
                            Contact{' '}
                            <chakra.span color="red.default">*</chakra.span>
                        </FormLabel>

                        <Input
                            defaultValue={user.contact}
                            size="lg"
                            {...register('contact', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <Text fontWeight="semibold" color="accent-1">
                        Company Details
                    </Text>

                    <FormControl isInvalid={errors.company_name}>
                        <FormLabel>
                            Name{' '}
                            <chakra.span color="red.default">*</chakra.span>
                        </FormLabel>

                        <Input
                            defaultValue={user.company.name}
                            size="lg"
                            {...register('company_name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.company_email}>
                        <FormLabel>
                            Email Address
                            <chakra.span color="red.default">*</chakra.span>
                        </FormLabel>

                        <Input
                            defaultValue={user.company.email}
                            size="lg"
                            {...register('company_email', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Legal Documents</FormLabel>

                        <Flex gap={3}>
                            <Input
                                value={
                                    user.files.split('/')[6] +
                                    '.' +
                                    user.files.split('.')[3]
                                }
                                size="lg"
                                cursor="default"
                                readOnly
                            />

                            <IconButton
                                as="a"
                                href={user.files}
                                size="lg"
                                icon={<FiDownloadCloud size={16} download />}
                            />
                        </Flex>
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

const UsersModal = ({ unit }) => {
    const disclosure = useDisclosure()
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )

    return (
        <Modal
            title="Select User"
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    variant="tinted"
                    borderRadius="full"
                    icon={<FiPlus size={16} />}
                    onClick={() => {
                        onOpen()
                    }}
                />
            )}
            disclosure={disclosure}
        >
            <Table
                data={users}
                fetched={isUsersFetched}
                th={[]}
                td={(user) => (
                    <Tr key={user._id}>
                        <Td>
                            <Flex
                                justify="space-between"
                                align="center"
                                gap={6}
                            >
                                <Flex flex={1} align="center" gap={3}>
                                    <Avatar
                                        h={10}
                                        w={10}
                                        name={user.name}
                                        src={user.image}
                                    />

                                    <Flex direction="column">
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            lineHeight={5}
                                            color="accent-1"
                                            noOfLines={1}
                                        >
                                            {user.name}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            lineHeight={5}
                                            noOfLines={1}
                                        >
                                            {user.email}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex>
                                    <FormModal
                                        user={user}
                                        unit={unit}
                                        type="Add"
                                    />
                                </Flex>
                            </Flex>
                        </Td>
                    </Tr>
                )}
                filters={(user) => {
                    return user.filter((user) => user.role === 'User')
                }}
                settings={{
                    searchWidth: 'full'
                }}
            />
        </Modal>
    )
}

const Tenant = ({ user, unit }) => {
    return (
        <Card>
            {unit.tenant.user !== '' ? (
                <Flex justify="space-between" align="center" gap={6}>
                    <Flex flex={1} align="center" gap={3}>
                        <Avatar
                            h={10}
                            w={10}
                            name={user.name}
                            src={user.image}
                        />

                        <Flex direction="column">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                lineHeight={5}
                                color="accent-1"
                                noOfLines={1}
                            >
                                {user.name}
                            </Text>
                            <Text fontSize="sm" lineHeight={5} noOfLines={1}>
                                {user.email}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex>
                        <FormModal user={user} unit={unit} type="Edit" />
                    </Flex>
                </Flex>
            ) : (
                <Flex justify="space-between" align="center" gap={6}>
                    <Flex flex={1} align="center" gap={3}>
                        <SkeletonCircle h={10} w={10} />

                        <Flex direction="column" gap={2}>
                            <Skeleton h={2} w={32} />
                            <Skeleton h={2} w={24} />
                        </Flex>
                    </Flex>

                    <Flex>
                        <UsersModal unit={unit} />
                    </Flex>
                </Flex>
            )}
        </Card>
    )
}

export default Tenant
