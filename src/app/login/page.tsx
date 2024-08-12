import React from 'react';

import Image from 'next/image';
import LoginBackground from 'public/login/Login Background.png';
import OSKMLogo from 'public/login/Logo.png';
import BubbleCorner from 'public/login/Bubble Corner.png';
import Bubble from 'public/login/Bubble.png';
import CoralPensu from 'public/login/Coral Pensu.png';
import Coral from 'public/login/Coral.png';
import Fish from 'public/login/Fish.png';
import SeaHorse from 'public/login/Sea Horse.png';
import Starfish from 'public/login/Starfish.png';

const LoginPage = () => {
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
      {/* Iphone View : Ukuran Width mengikuti Figma, Ukuran Height Screen */}
      <div className="relative h-full w-[393px] bg-white overflow-hidden">
        {/* Background */}
        <Image
          src={LoginBackground}
          alt="OSKM Login Page Background"
          className="absolute top-0 left-0 object-cover h-full w-full -z-1"
        />

        {/* Bottom Ornament */}
        <Image
          src={CoralPensu}
          alt="Coral Pensu"
          className="absolute bottom-[-70px] left-[-100px] object-cover z-10"
          width={350}
          height={350}
        />
        <Image
          src={Coral}
          alt="Coral"
          className="absolute bottom-0 right-0 object-cover"
          width={300}
          height={300}
        />

        {/* Top Ornament */}
        <Image
          src={BubbleCorner}
          alt="Bubble in the Corner"
          className="absolute top-[-50px] right-[-10px]"
          width={100}
          height={100}
        />
        <Image
          src={Starfish}
          alt="Starfish"
          className="absolute top-[20px] right-[90px]"
          width={80}
          height={80}
        />
        <Image
          src={SeaHorse}
          alt="Sea Horse"
          className="absolute top-[70px] right-[50px]"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
};

export default LoginPage;
