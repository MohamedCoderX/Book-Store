import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommended'
import Footer from '../../components/Footer'
import News from './News'


const Home = () => {
  return (
    <>
        <Banner/>
       <TopSellers/>
       <Recommened/>
       <News/>
       
    </>
  )
}

export default Home