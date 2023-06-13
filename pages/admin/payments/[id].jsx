import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import {
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Spinner,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { UnitCard } from 'components/units/card'
import Rent from 'components/payments/rent'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'
import { currency } from 'fuctions/currency'
import RentReceipt from 'components/receipts/rent'
import Reserve from 'components/payments/reserve'
import Soa from 'components/checkout/soa'

const ProofOfPayment = ({ src }) => {
    const disclosure = useDisclosure()

    return (
        <Modal
            size="xl"
            header="off"
            toggle={(onOpen) => (
                <Button
                    variant="tinted"
                    size="lg"
                    onClick={() => {
                        onOpen()
                    }}
                >
                    View Proof of Payment
                </Button>
            )}
            disclosure={disclosure}
        >
            <Flex m={-6}>
                <Image alt="image" src={src} />
            </Flex>
        </Modal>
    )
}

const Payment = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: payment, isFetched: isPaymentFetched } = useQuery(
        ['payment', id],
        () => api.get('/payments', id)
    )
    const { data: unit, isFetched: isUnitFetched } = useQuery(
        ['unit', id],
        () => api.get('/units', payment.unit),
        { enabled: isPaymentFetched }
    )
    const { data: receipt, isFetched: isReceiptFetched } = useQuery(
        ['receipt', id],
        () => api.get('/receipts', payment._id),
        { enabled: isPaymentFetched }
    )
    const { data: soa, isFetched: isSoaFetched } = useQuery(
        ['soa', id],
        () => api.get('/soas', payment.soa),
        { enabled: isPaymentFetched && payment.soa !== '' ? true : false }
    )

    const queryClient = useQueryClient()
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)
    const toast = useToast()

    const editMutation = useMutation(
        (data) => api.update('/payments', payment._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('payments')
                setAcceptLoading(false)
                setRejectLoading(false)

                toast({
                    position: 'top',
                    duration: 3000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Payment accepted successfully."
                        />
                    )
                })
            }
        }
    )

    const onAccept = () => {
        setAcceptLoading(true)

        editMutation.mutate({
            user: payment.user,
            unit: payment.unit,
            type: payment.type,
            method: payment.method,
            status: 'Accepted'
        })
    }

    const onReject = () => {
        setRejectLoading(true)

        editMutation.mutate({
            user: payment.user,
            unit: payment.unit,
            type: payment.type,
            method: payment.method,
            status: 'Rejected'
        })
    }

    if (
        !isPaymentFetched ||
        (payment.soa !== '' && !isSoaFetched) ||
        !isUnitFetched ||
        !isReceiptFetched
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
                    {payment.type === 'Rent' && <Rent data={payment.data} />}
                    {payment.type === 'Reserve' && (
                        <Reserve data={payment.data} />
                    )}
                    {payment.type === 'Soa' && <Soa soa={soa} />}
                </GridItem>

                <GridItem display="grid" gap={6}>
                    <UnitCard unit={unit} />

                    <Card>
                        <Flex direction="column" gap={6}>
                            <Flex direction="column" gap={3}>
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Id
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        #
                                        {payment._id
                                            .slice(15, 30)
                                            .toUpperCase()}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Date
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {payment.created.split(',')[0]}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Time
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {payment.created.split(',')[1]}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Type
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {payment.type}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Cash
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {currency(payment.cash)}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Total
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {currency(payment.total)}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Payment Method
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        {payment.method}
                                    </Text>
                                </Flex>

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    gap={6}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="accent-1"
                                    >
                                        Status
                                    </Text>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color={
                                            payment.status === 'Accepted'
                                                ? 'green.default'
                                                : payment.status ===
                                                  'Processing'
                                                ? 'blue.default'
                                                : payment.status ===
                                                      'Rejected' &&
                                                  'red.default'
                                        }
                                    >
                                        {payment.status}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex direction="column" gap={3}>
                                <ProofOfPayment src={payment.proof} />
                                <RentReceipt
                                    payment={payment}
                                    receipt={receipt}
                                />
                            </Flex>
                        </Flex>
                    </Card>

                    {payment.status === 'Processing' && (
                        <Card>
                            <Flex direction="column" gap={3}>
                                <Button
                                    size="lg"
                                    isLoading={acceptLoading}
                                    onClick={onAccept}
                                >
                                    Accept Payment
                                </Button>

                                <Button
                                    variant="tinted"
                                    size="lg"
                                    isLoading={rejectLoading}
                                    onClick={onReject}
                                >
                                    Reject Payment
                                </Button>
                            </Flex>
                        </Card>
                    )}
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Payment
