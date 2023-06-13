import { Container } from '@chakra-ui/react'
import Hero from 'components/sections/hero'
import Units from 'components/sections/units'
import Blogs from 'components/sections/blogs'
import Company from 'components/sections/company'
import CTA from 'components/sections/cta'
import Contact from 'components/sections/contact'
import Footer from 'components/sections/footer'

const Home = () => {
    return (
        <Container>
            <Hero />
            <Units />
            <Blogs />
            <Company />
            <CTA />
            <Contact />
            <Footer />
        </Container>
    )
}

export default Home
