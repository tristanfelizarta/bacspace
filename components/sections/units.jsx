import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Button, chakra, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { UnitCard, UnitCardLoading } from 'components/units/card'

const Units = () => {
    const router = useRouter
    const { data: session } = useSession()
    const { data: user, isFetched: isUserFetched } = useQuery(
        ['user'],
        () => api.get('/users', session.user.id),
        { enabled: session ? true : false }
    )
    const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () =>
        api.all('/units')
    )

    return (
        <chakra.section pt={100} id="units">
            <Flex direction="column" gap={12}>
                <Flex align="center" direction="column" textAlign="center">
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Units
                    </Text>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {isUnitsFetched
                        ? units.slice(0, 3).map((unit) => (
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
        </chakra.section>
    )
}

export default Units
