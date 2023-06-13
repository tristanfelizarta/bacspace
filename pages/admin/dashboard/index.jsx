import { Container, Flex, Grid, Text } from '@chakra-ui/react'
import Statistics from 'components/dashboard/statistics'
import Payments from 'components/dashboard/payments'

const Dashboard = () => {
    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Text fontSize={32} fontWeight="bold" color="accent-1">
                    Dashboard
                </Text>

                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <Statistics />
                    <Payments />
                </Grid>
            </Flex>
        </Container>
    )
}

export default Dashboard
