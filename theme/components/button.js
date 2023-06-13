const Button = {
    baseStyle: {
        overflow: 'hidden',
        fontWeight: 'medium',
        lineHeight: 'inherit',
        transition: '.2s',
        _active: {
            transform: 'scale(.95)'
        }
    },
    variants: {
        filled: (props) => ({
            bg: props.colorScheme === 'default' ? 'canvas-1' : 'brand.default',
            color:
                props.colorScheme === 'default' ? 'accent-1' : 'white.default',
            _hover: {
                bg:
                    props.colorScheme === 'default'
                        ? 'canvas-1'
                        : 'brand.default',
                _disabled: {
                    bg:
                        props.colorScheme === 'default'
                            ? 'canvas-1'
                            : 'brand.default'
                }
            },
            _active: {
                bg:
                    props.colorScheme === 'default'
                        ? 'canvas-1'
                        : 'brand.default'
            },
            _dark: {
                bg:
                    props.colorScheme === 'default'
                        ? 'canvas-1'
                        : 'white.default',
                color:
                    props.colorScheme === 'default'
                        ? 'white.default'
                        : 'brand.default'
            }
        }),
        tinted: (props) => ({
            bg: props.colorScheme === 'default' ? 'canvas-1' : 'brand.alpha',
            color:
                props.colorScheme === 'default'
                    ? 'brand.default'
                    : 'brand.default',
            _dark: {
                bg:
                    props.colorScheme === 'default'
                        ? 'canvas-1'
                        : 'white.alpha',
                color:
                    props.colorScheme === 'default'
                        ? 'white.default'
                        : 'white.default'
            }
        }),
        outline: {
            bg: 'transparent',
            borderColor: 'brand.default',
            color: 'brand.default',
            _hover: {
                bg: 'transparent'
            },
            _active: {
                bg: 'transparent'
            },
            _dark: {
                borderColor: 'white.default',
                color: 'white.default'
            }
        },
        plain: {
            bg: 'transparent',
            color: 'brand.default',
            _dark: {
                color: 'white.default'
            }
        }
    },
    sizes: {
        xs: {
            borderRadius: 12,
            px: 3,
            h: 8,
            minW: 8,
            fontSize: 'xs'
        },
        sm: {
            borderRadius: 12,
            px: 4,
            h: 9,
            minW: 9,
            fontSize: 'xs'
        },
        md: {
            borderRadius: 12,
            px: 4,
            h: 10,
            minW: 10,
            fontSize: 'sm'
        },
        lg: {
            borderRadius: 12,
            px: 5,
            h: '44px',
            minW: '44px',
            fontSize: 'sm'
        },
        xl: {
            borderRadius: 12,
            px: 5,
            h: 12,
            minW: 12,
            fontSize: 'md'
        }
    },
    defaultProps: {
        variant: 'filled',
        colorScheme: 'brand'
    }
}

export default Button
