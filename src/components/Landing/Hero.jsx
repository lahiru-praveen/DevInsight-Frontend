// import React from 'react';

// import  l1  from '../../assets/l1.png';
// import  l2  from '../../assets/l2.svg';
// import  l3  from '../../assets/l3.svg';
// import  Devinsight  from '../../assets/Devinsight.png';
// import { Link } from 'react-router-dom';


// const Hero = () => {
//   return (
//     <div className='mx-auto  w-4/5  bg-white py-24'>
//         <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0'>
            
//             <div className='flex flex-col justify-start gap-2 flex justify-center h-full mx-5'>
//                 {/* <p className='py-2 text-2xl text-[#20B486] font-medium'>START TO SUCCESS</p> */}
//                 <div className='flex justify-start '>
//             <img src={Devinsight} className="w-1/2 " />
//             </div>
//                 <p className='py-2 text-lg text-gray-600'>Master You Coding Practices with our new Ai Powerd 
//                     Code review platform</p>

//                     <div className="grid grid-cols-2">
//                     <div>
//                     <Link to="/co1">
//                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
//                     Get for Your Oganization
//                     </button>
//                     </Link>
//                     </div>
//                     <div><button className="mx-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
//                     Log in
//                     </button></div>
//                     </div>    
                    
                   
            
//             </div>
            
//             <div className='flex justify-center items-center mx-5'>
//             <img src={l1} className="md:order-last order-first scale-75" />
//             </div>



//         </div>

//         <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

            
            
//             <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
//                 <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Power full<span  className='text-[#20B486]'> AI </span>
//                 support Suggesion system
                    
//                 </h1>
//                 <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
//                     mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
//             </div>
//             <div className="flex justify-center items-center mx-5">
//             <img src={l2} className="" />
//             </div>
            
            



//         </div>

//         <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

//             <div className="flex justify-center items-center mx-5">
//             <img src={l2} className="" />
//             </div>
            
//             <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
//                 <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Easy to use interface
                    
//                 </h1>
//                 <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
//                     mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
//             </div>
            
            



//         </div>


//         <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 my-40'>

            
            
//             <div className='flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5'>
                
//                 <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Support from Experties
                    
//                 </h1>
//                 <p className='py-2 text-lg text-gray-600'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
//                     mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                
                
//             </div>

//             <div className="flex justify-center items-center mx-5">
//             <img src={l3} className="" />
//             </div>

            
            



//         </div>
        

//     </div>
//   )
// }

// export default Hero
import React, { useState, useEffect } from 'react';
import l1 from '../../assets/l1.png';
import l2 from '../../assets/l2.svg';
import l3 from '../../assets/l3.svg';
import Devinsight from '../../assets/Devinsight.png';
import prallex from '../../assets/prallex.jpg';
import { Link } from 'react-router-dom';
import { Box, Image, Text, Heading } from '@chakra-ui/react';
import ContactUs from '../../components/Landing/contact_us.jsx';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div
        id="intro"
        className="parallax-window absolute top-0 left-0 w-full"
        data-parallax="scroll"
        style={{
          backgroundImage: `url(${prallex})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          height: `${scrollY + window.innerHeight}px`,
          zIndex: -1,
        }}
      />
      <div className='mx-auto w-4/5 py-24'>
      <div id="home" className="max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <div className="flex flex-col justify-start gap-2 flex justify-center h-full">
          <div className="flex justify-start">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Enhance Your Code with DevInsight
        </h1>
          </div>
          <p className="py-2 text-lg text-gray-600 w-4/5">
          Welcome to DevInsight, the premier platform for code reviews. Our intuitive and collaborative environment empowers developers to refine their code, enhance performance, and ensure quality. Join a community of passionate coders and elevate your projects with insightful feedback and expert advice. 
         
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Link to="/co3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Get for Your Organization
                </button>
              </Link>
            </div>
            {/* <div>
              <Link to="/si">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                  Log in
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center items-center">
        <img src={l1} className="md:order-last order-first scale-75" alt="Hero Image" />
      </div>
    </div>
        <Box id="features" className="bg-white p-8 rounded-lg shadow-lg mb-40">
          <Box className="md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 my-40">
            <Box className="flex justify-center items-center mx-5">
              <Image src={l2} alt="Image 1" />
            </Box>
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
          Powerful<span className="text-[#5b9ef7]"> AI </span> Support Suggestion System
        </h1>
              {/* <Heading className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
                Powerful<span className="text-[#20B486]"> AI </span> Support Suggestion System
              </Heading> */}
              <Text className="py-2 text-lg text-gray-600 text" lineHeight="taller">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
              </Text>
            </Box>
          </Box>

          <Box className="md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 my-40">
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
              <Heading className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">Easy to use interface</Heading>
              <Text className="py-2 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
              </Text>
            </Box>
            <Box className="flex justify-center items-center mx-5">
              <Image src={l3} alt="Image 2" />
            </Box>
          </Box>

          <Box className="md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 my-40">
            <Box className="flex justify-center items-center mx-5">
              <Image src={l3} alt="Image 3" />
            </Box>
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
              <Heading className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">Support from Experts</Heading>
              <Text className="py-2 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
              </Text>
            </Box>
          </Box>
        </Box>
        </div>
        <div id = "about-us">
        <section class="bg-gray-50 dark:bg-gray-900 dark:bg-gray-800 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Powering innovation at <span class="font-extrabold">200,000+</span> companies worldwide</h2>
                <p className="mb-4 font-light">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                <p className="mb-4 font-medium">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease.</p>
                <a href="#" class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                    Learn more
                    <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
      </section>
      </div>
      <div id="contact-us" className='mx-auto w-4/5 py-24'>          
        <Box  className="bg-white p-8 rounded-lg shadow-lg mb-40">
          <Box className="md:px-0 my-4">
            <ContactUs/>
          </Box>
        </Box>
        
      </div>
    </div>
  );
}

export default Hero;
