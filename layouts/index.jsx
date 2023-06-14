import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
    chakra,
    Container,
    Flex,
    Icon,
    Image,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import Header from './header'
import Sidebar from './sidebar'
import { FiAlertTriangle } from 'react-icons/fi'

const AppLayout = (props) => {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { data: session, status } = useSession()
    const isAdmin = session
        ? session.user.role === 'Admin'
            ? true
            : false
        : false
    const isTenant = session
        ? session.user.role === 'Tenant'
            ? true
            : false
        : false
    const {
        isOpen: isSidebarOpen,
        onOpen: onSidebarOpen,
        onClose: onSidebarClose
    } = useDisclosure()

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (!mounted || status === 'loading') {
        return (
            <Flex
                position="relative"
                justify="center"
                align="center"
                h="100vh"
                w="full"
            >
                <Image alt="logo" src="/favicon.ico" h="8" w="8" />

                <Spinner
                    position="absolute"
                    boxSize={12}
                    thickness={2}
                    speed="0.8s"
                    emptyColor="canvas-1"
                    color="accent-1"
                />
            </Flex>
        )
    } else {
        if (session && session.user.status === 'Inactive') {
            return (
                <>
                    <Header
                        session={session}
                        isAdmin={isAdmin}
                        isTenant={isTenant}
                        onSidebarOpen={onSidebarOpen}
                    />

                    <Container>
                        <Flex
                            bg="red.alpha"
                            justify="center"
                            gap={3}
                            border="1px solid"
                            borderColor="red.default"
                            borderRadius={12}
                            p={6}
                            color="red.default"
                        >
                            <Icon as={FiAlertTriangle} boxSize={6} />
                            <Text fontWeight="medium">
                                Your account is inactive.
                            </Text>
                        </Flex>
                    </Container>
                </>
            )
        }

        if (router.pathname.includes('print')) {
            return props.children
        }

        if (!isAdmin && router.pathname.includes('admin')) {
            router.push('/')
            return
        }

        if (isAdmin && !router.pathname.includes('admin')) {
            router.push('/admin')
            return
        }

        return (
            <>
                <Header
                    session={session}
                    isAdmin={isAdmin}
                    onSidebarOpen={onSidebarOpen}
                />

                <chakra.div
                    mx="auto"
                    h="auto"
                    minH="calc(100vh - 73px)"
                    w="full"
                    maxW={isAdmin ? 1536 : 1280}
                >
                    <Sidebar
                        session={session}
                        isAdmin={isAdmin}
                        isSidebarOpen={isSidebarOpen}
                        onSidebarClose={onSidebarClose}
                    />

                    <chakra.main
                        ml={{ base: 0, lg: isAdmin ? 256 : 0 }}
                        w={{
                            base: 'full',
                            lg: isAdmin ? 'calc(100% - 256px)' : 'full'
                        }}
                    >
                        {props.children}
                    </chakra.main>
                </chakra.div>
            </>
        )
    }
}

export default AppLayout
