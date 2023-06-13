const Link = {
    baseStyle: (props) => ({
        fontWeight: props.active ? 'semibold' : 'medium',
        textTransform: 'capitalize',
        color: 'accent-1',
        transition: '.4s',
        _hover: {
            textDecoration: 'none'
        }
    }),
    sizes: {
        sm: {
            fontSize: 'xs'
        },
        md: {
            fontSize: 'sm'
        },
        lg: {
            fontSize: 'md'
        }
    },
    defaultProps: {
        size: 'md'
    }
}

export default Link
