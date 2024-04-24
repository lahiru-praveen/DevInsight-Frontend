import React from 'react';

import  l1  from '../../assets/l1.png';
import  l2  from '../../assets/l2.svg';
import  l3  from '../../assets/l3.svg';
import  Devinsight  from '../../assets/Devinsight.png';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className='mx-auto  w-4/5  bg-white py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0'>
            
            <div className='flex flex-col justify-start gap-2 flex justify-center h-full mx-5'>
                {/* <p className='py-2 text-2xl text-[#20B486] font-medium'>START TO SUCCESS</p> */}
                <div className='flex justify-start '>
            <img src={Devinsight} className="w-1/2 " />
            </div>
                <p className='py-2 text-lg text-gray-600'>Master You Coding Practices with our new Ai Powerd 
                    Code review platform</p>

                    <div className="grid grid-cols-2">
                    <div>
                    <Link to="/co1">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Get for Your Oganization
                    </button>
                    </Link>
                    </div>
                    <div><button className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                    Log in
                    </button></div>
                    </div>    
                    
                   
            
            </div>
            
            <div className='flex justify-center items-center mx-5'>
            <img src={l1} className="md:order-last order-first scale-75" />
            </div>



        </div>

        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

            <div className="flex justify-center items-center mx-5">
            <img src={l2} className="" />
            </div>
            
            <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Power full<span  className='text-[#20B486]'> AI </span>
                support Suggesion system
                    
                </h1>
                <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
                    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
            </div>
            
            



        </div>

        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

            <div className="flex justify-center items-center mx-5">
            <img src={l2} className="" />
            </div>
            
            <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Easy to use interface
                    
                </h1>
                <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
                    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
            </div>
            
            



        </div>


        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

            <div className="flex justify-center items-center mx-5">
            <img src={l3} className="" />
            </div>
            
            <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Support from Experties
                    
                </h1>
                <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
                    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
            </div>
            
            



        </div>
        

    </div>
  )
}

export default Hero