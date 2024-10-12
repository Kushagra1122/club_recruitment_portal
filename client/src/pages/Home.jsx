import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mx-auto">
  
      <section className="  px-5 py-32">
        <div className="container mx-auto flex flex-col gap-10 items-center text-center">
    
          <h2 className="text-5xl font-bold mb-4 animate-fadeInUp font-mono text-red-600">
            Join Your Dream Club at NITK
          </h2>
          <p className="text-xl max-w-2xl mb-8 animate-fadeInUp delay-150">
            Discover the best clubs on campus, explore their recruitment
            schedules, and make your mark. Whether you're into technology,
            culture, or leadership, there's a place for you.
          </p>

       
         
            <Link
              to="/clubs"
              className=" bg-gray-300 text-blue-600 py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            >
              Explore Clubs
            </Link>
            
          

        
         
        </div>
      </section>
    </div>
  );
}

export default Home
