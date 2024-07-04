
import React, { useState, useEffect } from 'react';
import l1 from '../../assets/l1.png';
import l2 from '../../assets/l2.svg';
import l3 from '../../assets/l3.svg';
import l4 from '../../assets/l4.svg';
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
      <div id="home" className="max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-56 lg:grid lg:grid-cols-12">
      <div className="mr-auto place-self-center lg:col-span-7">
        <div className="flex flex-col justify-start gap-2  h-full">
          <div className="flex justify-start">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Enhance Your Code with DevInsight
        </h1>
          </div>
          <p className="py-2 text-lg text-gray-600 w-4/5">
          Welcome to DevInsight, the premier platform for code reviews. Our intuitive and collaborative environment empowers developers to refine their code, enhance performance, and ensure quality. Join a community of passionate coders and elevate your projects with insightful feedback and expert advice.

          </p>
          <div className="grid grid-cols-3 gap-4 py-6">
            <div>
              <Link to="/co2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Get for Your Organization
                </button>
              </Link>
            </div>
            
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
              <Image src={l2} alt="Image 1" boxSize="80%" />
            </Box>
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
          Powerful<span className="text-[#5b9ef7]"> AI </span> Support Suggestion System
        </h1>
              
              <Text className="py-2 text-lg text-gray-600 text" lineHeight="taller">
              Our advanced AI-powered suggestion system offers comprehensive code reviews. Utilizing cutting-edge language models, it provides detailed feedback to enhance your code quality. With this tool, you can achieve optimal performance and maintain best practices effortlessly.
              </Text>
            </Box>
          </Box>

          <Box className="md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 my-40">
            <Box className="flex justify-center items-center mx-5">
              <Image src={l4} alt="Image 2" boxSize="80%" />
            </Box>
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
              
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
              Easy to use <span className="text-[#5b9ef7]">interface </span> 
            </h1>
              <Text className="py-2 text-lg text-gray-600 text" lineHeight="taller">
                Our user-friendly interface is designed for seamless navigation and effortless interaction. Whether you're a beginner or an expert, you'll find it intuitive and straightforward, making your experience smooth and enjoyable.
              </Text>
            </Box>
            
          </Box>

          <Box className="md:max-w-[1480px] mx-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0 my-40">
            <Box className="flex justify-center items-center mx-5">
              <Image src={l3} alt="Image 3" boxSize="80%"/>
            </Box>
            <Box className="flex flex-col justify-start gap-8 mx-5 justify-center h-full mx-5">
              
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl dark:text-white">
              Support from <span className="text-[#5b9ef7]">Experts</span> 
            </h1>
              <Text className="py-2 text-lg text-gray-600 text" lineHeight="taller">
              Our platform offers dedicated support for both developers and Quality Assurance (QA) professionals. Developers receive supervision and detailed code reviews from QA experts, ensuring high standards and best practices. Additionally, QA professionals can seek guidance and oversight from fellow QA experts, fostering a collaborative and high-quality development environment.
              </Text>
            </Box>
          </Box>
        </Box>
        </div>
        <div id = "about-us">
        <section class="bg-blue-500 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="max-w-screen-lg text-white sm:text-lg ">
                <h2 className="mb-4 text-4xl font-bold text-white">We Are <span class="font-extrabold">Team Lemon</span></h2>
                <p className="mb-4 font-light">
                  Welcome to Team Lemon! We are a dynamic and rapidly growing development team dedicated to delivering innovative solutions and exceptional results. Our talented and passionate members bring a diverse range of skills and expertise, ensuring we tackle every challenge with creativity and precision.
                </p>
                <p className="mb-4 font-medium">
                  Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.
                </p>
                
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
