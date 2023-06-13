import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    AspectRatio,
    Avatar,
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
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    SimpleGrid,
    Skeleton,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiDownloadCloud, FiSearch } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'

const EditModal = ({ user }) => {
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

        editMutation.mutate({
            name: data.name,
            contact: data.contact,
            company: {
                name: data.company_name,
                email: data.company_email
            },
            role: data.role,
            status: data.status
        })
    }

    return (
        <Modal
            title="Profile Details"
            size="xl"
            toggle={(onOpen) => (
                <Flex
                    direction="column"
                    align="center"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => {
                        onOpen()
                    }}
                >
                    <chakra.div position="relative" mt="-72px" mb={3}>
                        <Avatar
                            border="8px"
                            size="xl"
                            name={user.name}
                            src={user.image}
                        />
                    </chakra.div>

                    <Text fontWeight="medium" color="accent-1" noOfLines={1}>
                        {user.name}
                    </Text>

                    <Text fontSize="sm" color="accent-1" noOfLines={1}>
                        {user.email}
                    </Text>

                    <Flex align="center" gap={3} mt={3}>
                        <Badge
                            variant="tinted"
                            colorScheme={
                                user.role === 'Admin'
                                    ? 'yellow'
                                    : user.role === 'Tenant'
                                    ? 'blue'
                                    : user.role === 'User' && 'red'
                            }
                        >
                            {user.role}
                        </Badge>

                        <Badge
                            variant="tinted"
                            colorScheme={
                                user.status === 'Active' ? 'blue' : 'red'
                            }
                        >
                            {user.status}
                        </Badge>
                    </Flex>
                </Flex>
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
                        <FormLabel>Role</FormLabel>

                        <Select
                            defaultValue={user.role}
                            size="lg"
                            {...register('role', { required: true })}
                        >
                            <chakra.option value="Admin">Admin</chakra.option>
                            <chakra.option value="Tenant">Tenant</chakra.option>
                            <chakra.option value="User">User</chakra.option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Status</FormLabel>

                        <Select
                            defaultValue={user.status}
                            size="lg"
                            {...register('status', { required: true })}
                        >
                            <chakra.option value="Active">Active</chakra.option>
                            <chakra.option value="Inactive">
                                Inactive
                            </chakra.option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    {user.files && (
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
                                    icon={
                                        <FiDownloadCloud size={16} download />
                                    }
                                />
                            </Flex>
                        </FormControl>
                    )}

                    <Divider />

                    <Button type="submit" size="lg" isLoading={isLoading}>
                        Save Changes
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

const Accounts = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () =>
        api.all('/units')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Accounts
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

                    <Select placeholder="Role" size="lg" w="auto">
                        <chakra.option value="Admin">Admin</chakra.option>
                        <chakra.option value="Tenant">Tenant</chakra.option>
                        <chakra.option value="User">User</chakra.option>
                    </Select>

                    <Select placeholder="Status" size="lg" w="auto">
                        <chakra.option value="Active">Active</chakra.option>
                        <chakra.option value="Disabled">Disabled</chakra.option>
                    </Select>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {isUsersFetched && isUnitsFetched
                        ? users.map((user) => (
                              <Card key={user._id}>
                                  <Flex direction="column" gap={6}>
                                      {user.unit ? (
                                          <AspectRatio
                                              mt={-6}
                                              mx={-6}
                                              ratio={16 / 9}
                                          >
                                              <chakra.div>
                                                  {units
                                                      .filter(
                                                          (unit) =>
                                                              unit._id ===
                                                              user.unit
                                                      )
                                                      .map((unit) => (
                                                          <NextLink
                                                              href={`/admin/units/${unit._id}`}
                                                              key={unit._id}
                                                          >
                                                              <Image
                                                                  alt="unit"
                                                                  src={
                                                                      unit.image
                                                                  }
                                                              />
                                                          </NextLink>
                                                      ))}
                                              </chakra.div>
                                          </AspectRatio>
                                      ) : (
                                          <AspectRatio
                                              mt={-6}
                                              mx={-6}
                                              ratio={16 / 9}
                                          >
                                              <Skeleton />
                                          </AspectRatio>
                                      )}

                                      <EditModal user={user} />
                                  </Flex>
                              </Card>
                          ))
                        : [...Array(3)].map((data, index) => (
                              <Card key={index}>
                                  <Flex direction="column" gap={6}>
                                      <AspectRatio
                                          mt={-6}
                                          mx={-6}
                                          ratio={16 / 9}
                                      >
                                          <Skeleton />
                                      </AspectRatio>

                                      <Flex
                                          direction="column"
                                          align="center"
                                          textAlign="center"
                                      >
                                          <chakra.div
                                              position="relative"
                                              mt="-72px"
                                              mb={3}
                                          >
                                              <Avatar
                                                  border="8px"
                                                  borderColor="accent-1"
                                                  size="xl"
                                              />
                                          </chakra.div>

                                          <Flex
                                              direction="column"
                                              align="center"
                                              gap={3}
                                          >
                                              <Skeleton
                                                  borderRadius="full"
                                                  h={2}
                                                  w={48}
                                              />
                                              <Skeleton
                                                  borderRadius="full"
                                                  h={2}
                                                  w={32}
                                              />
                                          </Flex>

                                          <Flex align="center" gap={3} mt={6}>
                                              <Skeleton
                                                  borderRadius="full"
                                                  h={7}
                                                  w={16}
                                              />
                                              <Skeleton
                                                  borderRadius="full"
                                                  h={7}
                                                  w={16}
                                              />
                                          </Flex>
                                      </Flex>
                                  </Flex>
                              </Card>
                          ))}
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Accounts
