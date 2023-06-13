import { Button, chakra } from '@chakra-ui/react'
import { FiPrinter } from 'react-icons/fi'

const Print = () => {
    return (
        <>
            <style>{`
				body {
					background-color: #17181C;
				}
			`}</style>

            <chakra.div
                bg="white"
                mx="auto"
                my={12}
                h={1080}
                w={768}
                p={6}
            ></chakra.div>

            <Button
                variant="default"
                bg="white"
                position="fixed"
                bottom={6}
                right={6}
                color="brand.default"
                leftIcon={<FiPrinter size={16} />}
                onClick={() => window.print()}
            >
                Print
            </Button>
        </>
    )
}

export default Print
