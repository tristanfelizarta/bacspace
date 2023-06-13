import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Spinner,
    Text
} from '@chakra-ui/react'
import { UnitCard } from 'components/units/card'
import Tenant from 'components/units/tenant'
import Soa from 'components/units/soa'
import Payments from 'components/units/payments'

const Profile = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const { data: user, isFetched: isUserFetched } = useQuery(['user'], () =>
        api.get('/users', session.user.id)
    )
    const { data: unit, isFetched: isUnitFetched } = useQuery(
        ['unit'],
        () => api.get('/units', user.unit),
        { enabled: isUserFetched && user.unit ? true : false }
    )

    if (!session) {
        router.push('/')
        return
    }

    if (!isUserFetched) {
        return (
            <Container>
                <Spinner color="accent-1" />
            </Container>
        )
    }

    if ((isUserFetched && user.unit === '') || !isUnitFetched) {
        return (
            <Container>
                <Flex
                    bg="brand.alpha"
                    justify="space-between"
                    align="center"
                    border="1px"
                    borderColor="accent-1"
                    borderRadius={12}
                    p={6}
                    _dark={{ bg: 'white.alpha' }}
                >
                    <Flex direction="column">
                        <Text
                            fontSize={24}
                            fontWeight="semibold"
                            color="accent-1"
                        >
                            You are not authorized to view this page.
                        </Text>

                        <Text fontSize="sm" color="accent-1">
                            You do not have permission to view this directory or
                            page using the credentials that you supplied.
                        </Text>
                    </Flex>

                    <Button size="xl">Message Us</Button>
                </Flex>
            </Container>
        )
    }

    return (
        <Container>
            <Grid
                templateColumns={{ base: '1fr', lg: '1fr 384px' }}
                alignItems="start"
                gap={6}
            >
                <GridItem display="grid" gap={6}>
                    <Soa session={session} user={user} unit={unit} />
                    <Payments session={session} user={user} unit={unit} />
                </GridItem>

                <GridItem display="grid" gap={6} order={{ base: -1, lg: 1 }}>
                    <UnitCard
                        unit={unit}
                        show="more"
                        controls={
                            unit.status === 'Reserved' ? (
                                <Button
                                    size="lg"
                                    onClick={() =>
                                        router.push(`/units/rent/${unit._id}`)
                                    }
                                >
                                    Rent Now
                                </Button>
                            ) : null
                        }
                    />
                    <Tenant user={user} unit={unit} />
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Profile
