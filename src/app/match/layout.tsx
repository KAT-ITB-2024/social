import React, { ReactNode } from 'react';

// Import Images
import Image from 'next/image';
import MatchBg from 'public/images/chat/bg-matchfriend.png';
import Coral from 'public/images/chat/coral-left.png';

// Import Component
import BottomBar from '~/components/chat/bottombar/Bottombar';



const MatchChatLayout = ({children} : {children: ReactNode}) => {
    return(
    <div className="bg-black h-screen w-full flex items-center justify-center">
      <div className="relative h-full w-full bg-white overflow-hidden">
        <div className="flex flex-col items-center h-full justify-start px-8 relative z-20">
            {children}
            {/* Bottom Bar */}
            <BottomBar/>
        </div>


            {/* Background */}
            <Image
            src={MatchBg}
            alt="OSKM Chat Match Background"
            className="absolute top-0 left-0 object-cover h-full w-full z-10"
            />

            <Image
                src={Coral}
                alt="Coral"
                className="absolute bottom-0 left-0 z-10"
                width={250}
                height={250}
            />
            

      </div>
    </div>

    )
}

export default MatchChatLayout;