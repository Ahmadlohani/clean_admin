import React from 'react'
import AboutCont from '../components/AboutCont'

const about = () => {
    const aboutImage = "/images/about.jpg";
    return (
        <div>
        <AboutCont aboutImage={aboutImage} />
        </div>
    )
}

export default about

