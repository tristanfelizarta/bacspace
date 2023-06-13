import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
    chakra,
    Flex,
    Grid,
    GridItem,
    Icon,
    Link,
    Text
} from '@chakra-ui/react'
import {
    FiCreditCard,
    FiEdit2,
    FiGrid,
    FiPieChart,
    FiTrash2,
    FiUsers
} from 'react-icons/fi'

const Sidebar = ({ isAdmin, isSidebarOpen, onSidebarClose }) => {
    const router = useRouter()

    return (
        <>
            <chakra.div
                bg="hsla(0, 0%, 0%, 0.4)"
                display={{ base: 'block', lg: 'none' }}
                position="fixed"
                top={0}
                left={0}
                h="100vh"
                w="full"
                visibility={isSidebarOpen ? 'visible' : 'hidden'}
                opacity={isSidebarOpen ? 1 : 0}
                transition="0.4s ease-in-out"
                zIndex={99}
                onClick={onSidebarClose}
            />

            <chakra.aside
                bg="system"
                position="fixed"
                top={{ base: 0, lg: isAdmin ? 'auto' : 0 }}
                left={{
                    base: isSidebarOpen ? 0 : -256,
                    lg: isAdmin ? 'auto' : isSidebarOpen ? 0 : -256
                }}
                h={{ base: 'full', lg: isAdmin ? 'calc(100% - 72px)' : 'full' }}
                w={256}
                transition="0.4s ease-in-out left"
                zIndex={{ base: 100, lg: 99 }}
            >
                <Grid templateRows="1fr" h="full">
                    <GridItem p={6}>
                        {isAdmin ? (
                            <Flex direction="column" gap={1}>
                                <NextLink href="/admin/dashboard" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes(
                                                'dashboard'
                                            )
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiPieChart} boxSize={4} />

                                            <Text>Dashboard</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/blogs" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('blogs')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiEdit2} boxSize={4} />

                                            <Text>Blogs</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/units" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('units')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiGrid} boxSize={4} />

                                            <Text>Units</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/payments" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('payments')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon
                                                as={FiCreditCard}
                                                boxSize={4}
                                            />

                                            <Text>Payments</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/accounts" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('accounts')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiUsers} boxSize={4} />

                                            <Text>Accounts</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/trash" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('trash')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiTrash2} boxSize={4} />

                                            <Text>Trash</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>
                            </Flex>
                        ) : (
                            <Flex direction="column" gap={1}>
                                <NextLink href="/" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={router.pathname === '/' ? 1 : 0}
                                        onClick={onSidebarClose}
                                    >
                                        Home
                                    </Link>
                                </NextLink>

                                <NextLink href="/units" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('units')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Units
                                    </Link>
                                </NextLink>

                                <NextLink href="/blogs" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('blogs')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Blogs
                                    </Link>
                                </NextLink>

                                <NextLink href="/company" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('company')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Company
                                    </Link>
                                </NextLink>

                                <NextLink href="/contact" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('contact')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Call Us
                                    </Link>
                                </NextLink>
                            </Flex>
                        )}
                    </GridItem>
                </Grid>
            </chakra.aside>
        </>
    )
}

export default Sidebar
