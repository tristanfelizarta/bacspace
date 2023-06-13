import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react'
import {
    Avatar,
    Button,
    chakra,
    Flex,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'
import {
    FiBox,
    FiFacebook,
    FiInstagram,
    FiLogOut,
    FiMenu,
    FiMoon,
    FiSun
} from 'react-icons/fi'
import { Google } from 'components/logos'

const Header = ({ session, isAdmin, isTenant, onSidebarOpen }) => {
    const router = useRouter()
    const { toggleColorMode } = useColorMode()
    const colorModeIcon = useColorModeValue(
        <FiMoon size={16} />,
        <FiSun size={16} />
    )
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                setIsScrolling(window.pageYOffset > 0)
            })
        }
    }, [])

    return (
        <chakra.header
            bg="white"
            position="sticky"
            top={0}
            borderBottom="1px"
            borderColor="border"
            shadow={isScrolling && 'sm'}
            transition=".4s"
            zIndex={99}
            _dark={{
                bg: isScrolling ? 'surface' : 'system',
                border: 'none',
                shadow: isScrolling && 'dark-xl'
            }}
        >
            <Flex
                align="center"
                gap={6}
                mx="auto"
                px={6}
                h="72px"
                w="full"
                maxW={isAdmin ? 1536 : 1280}
            >
                <Flex
                    flex={{ base: 1, md: 'none' }}
                    justify="start"
                    align="center"
                >
                    <NextLink href="/">
                        <Flex
                            display={{ base: 'none', md: 'flex' }}
                            align="center"
                            gap={2}
                            color="accent-1"
                        >
                            <Icon as={FiBox} boxSize={6} />

                            <Text
                                fontSize="2xl"
                                fontWeight="medium"
                                lineHeight={6}
                            >
                                Bacspace
                            </Text>
                        </Flex>
                    </NextLink>

                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        icon={<FiMenu size={20} />}
                        onClick={onSidebarOpen}
                    />
                </Flex>

                <Flex
                    display={{ base: 'flex', md: 'none' }}
                    flex={1}
                    justify="center"
                    align="center"
                >
                    <Icon as={FiBox} boxSize={6} color="accent-1" />
                </Flex>

                <Flex flex={1} justify="end" align="center">
                    {!isAdmin && (
                        <Flex
                            display={{ base: 'none', md: 'flex' }}
                            align="center"
                            gap={8}
                            mr={8}
                        >
                            <Link
                                href="/#"
                                active={router.pathname === '/' ? 1 : 0}
                            >
                                Home
                            </Link>

                            <NextLink href="/units">
                                <Link
                                    as="span"
                                    active={
                                        router.pathname.includes('units')
                                            ? 1
                                            : 0
                                    }
                                >
                                    Units
                                </Link>
                            </NextLink>

                            <Link
                                href="/#blogs"
                                active={
                                    router.pathname.includes('blogs') ? 1 : 0
                                }
                            >
                                Blogs
                            </Link>

                            <Link
                                href="/#company"
                                active={
                                    router.pathname.includes('company') ? 1 : 0
                                }
                            >
                                Company
                            </Link>

                            <Link
                                href="/#contact"
                                active={
                                    router.pathname.includes('contact') ? 1 : 0
                                }
                            >
                                Call Us
                            </Link>
                        </Flex>
                    )}

                    {session ? (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    h={10}
                                    w={10}
                                    name={session.user.name}
                                    src={session.user.image}
                                />
                            </MenuButton>

                            <MenuList minW={256}>
                                <MenuItem
                                    onClick={() => router.push('/profile')}
                                >
                                    <Flex align="center" gap={3}>
                                        <Avatar
                                            name={session.user.name}
                                            src={session.user.image}
                                        />
                                        <Text>{session.user.name}</Text>
                                    </Flex>
                                </MenuItem>

                                <MenuDivider />

                                <MenuItem
                                    icon={colorModeIcon}
                                    onClick={toggleColorMode}
                                >
                                    Appearance
                                </MenuItem>

                                <a target="_blank" rel="noreferrer" href="/">
                                    <MenuItem icon={<FiFacebook size={16} />}>
                                        Facebook
                                    </MenuItem>
                                </a>

                                <a target="_blank" rel="noreferrer" href="/">
                                    <MenuItem icon={<FiInstagram size={16} />}>
                                        Instagram
                                    </MenuItem>
                                </a>

                                <MenuDivider />

                                <MenuItem
                                    icon={<FiLogOut size={16} />}
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <Button
                                display={{ base: 'none', md: 'flex' }}
                                onClick={() => signIn('google')}
                            >
                                Sign in
                            </Button>

                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<Google size={20} />}
                                onClick={() => signIn('google')}
                            />
                        </>
                    )}
                </Flex>
            </Flex>
        </chakra.header>
    )
}

export default Header
