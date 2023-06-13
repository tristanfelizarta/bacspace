import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Spinner
} from '@chakra-ui/react'
import { UnitCard } from 'components/units/card'
import Tenant from 'components/units/tenant'
import Soa from 'components/units/soa'
import Payments from 'components/units/payments'

const Unit = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()
    const { data: unit, isFetched: isUnitFetched } = useQuery(
        ['unit', id],
        () => api.get('/units', id)
    )
    const { data: user, isFetched: isUserFetched } = useQuery(
        ['user'],
        () => api.get('/users', unit.tenant.user),
        { enabled: isUnitFetched && unit.tenant.user ? true : false }
    )

    if (
        (isUnitFetched && unit.tenant.user && !isUserFetched) ||
        !isUnitFetched
    ) {
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
                    <Soa session={session} user={user} unit={unit} />
                    <Payments session={session} user={user} unit={unit} />
                </GridItem>

                <GridItem display="grid" gap={6}>
                    <UnitCard
                        unit={unit}
                        show="more"
                        controls={
                            <Flex direction="column" gap={3}>
                                <Button variant="tinted" size="lg">
                                    Edit Details
                                </Button>

                                <Button variant="tinted" size="lg">
                                    Move to Trash
                                </Button>
                            </Flex>
                        }
                    />

                    <Tenant user={user} unit={unit} />
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Unit
