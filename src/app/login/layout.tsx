import React, { ReactNode } from 'react'

// Images Import
import Image from 'next/image';
import LoginBackground from 'public/images/login/Login Background.png';
import BubbleCorner from 'public/images/login/Bubble Corner.png';
import CoralPensu from 'public/images/login/Coral Pensu.png';
import Coral from 'public/images/login/Coral.png';
import SeaHorse from 'public/images/login/Sea Horse.png';
import Starfish from 'public/images/login/Starfish.png';

const LoginLayout = ({ 
  children 
}:{
  children: ReactNode
} ) => {
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">

      {/* Iphone View : Ukuran Width mengikuti Figma, Ukuran Height Screen */}
      <div className="relative h-full w-[393px] bg-white overflow-hidden">
        <div className='flex flex-col items-center h-full justify-start px-8 relative z-20'>
          {children}
        </div>

        {/* Background */}
        <Image
          src={LoginBackground}
          alt="OSKM Login Page Background"
          className="absolute top-0 left-0 object-cover h-full w-full z-10"
        />

        {/* Bottom Ornament */}
        <Image
          src={Coral}
          alt="Coral"
          className="absolute bottom-0 right-0 object-cover z-10"
          width={275}
          height={275}
        />
        <Image
          src={CoralPensu}
          alt="Coral Pensu"
          className="absolute bottom-[-70px] left-[-75px] object-cover z-10"
          width={375}
          height={375}
        />

        {/* Top Ornament */}
        <Image
          src={BubbleCorner}
          alt="Bubble in the Corner"
          className="absolute top-[-50px] right-[-10px] z-10"
          width={100}
          height={100}
        />
        <Image
          src={Starfish}
          alt="Starfish"
          className="absolute top-[20px] right-[90px] z-10"
          width={80}
          height={80}
        />
        <Image
          src={SeaHorse}
          alt="Sea Horse"
          className="absolute top-[70px] right-[50px] z-10"
          width={70}
          height={70}
        />
      </div>
    </div>
  )
}

export default LoginLayout