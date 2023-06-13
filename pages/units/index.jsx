import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Button,
    chakra,
    Container,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    SimpleGrid,
    Text
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { UnitCard, UnitCardLoading } from 'components/units/card'

const Units = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () =>
        api.all('units')
    )
    const { data: user, isFetched: isUserFetched } = useQuery(
        ['user'],
        () => api.get('/users', session.user.id),
        { enabled: session ? true : false }
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
                                  <UnitCard
                                      unit={unit}
                                      controls={
                                          <Flex gap={3}>
                                              <Button
                                                  variant="tinted"
                                                  size="lg"
                                                  w="full"
                                                  disabled={
                                                      user?.unit !== '' ||
                                                      unit.status !== 'Vacant'
                                                          ? true
                                                          : false
                                                  }
                                                  onClick={() =>
                                                      !session
                                                          ? signIn('google')
                                                          : router.push(
                                                                `/units/reserve/${unit._id}`
                                                            )
                                                  }
                                              >
                                                  Reserve
                                              </Button>

                                              <Button
                                                  size="lg"
                                                  w="full"
                                                  disabled={
                                                      user?.unit !== '' ||
                                                      unit.status !== 'Vacant'
                                                          ? true
                                                          : false
                                                  }
                                                  onClick={() =>
                                                      !session
                                                          ? signIn('google')
                                                          : router.push(
                                                                `/units/rent/${unit._id}`
                                                            )
                                                  }
                                              >
                                                  Rent Now
                                              </Button>
                                          </Flex>
                                      }
                                      key={unit._id}
                                  />
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
