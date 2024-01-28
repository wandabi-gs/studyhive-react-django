import React from 'react'
import { motion } from 'framer-motion';

function Loader(message) {
    return (
        <div className='text-white absolute top-1/2 left-1/2 p-4 text-2xl'>
            <div className="flex">
                <motion.div
                    className="border-2 mr-2 w-7 h-7 border-b-0 border-l-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                ></motion.div>
                <div className="h-6 flex flex-col justify-center">Please wait .....</div> 
            </div>
        </div>
    )
}

export default Loader