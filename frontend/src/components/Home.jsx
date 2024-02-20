import React, {  } from 'react';
import { motion } from 'framer-motion'
import useThemeStore from '../store/theme';
import blackLogo from '../assets/logo/black.png'
import whiteLogo from '../assets/logo/white.png'
import { Link } from 'react-router-dom';


function Home() {

  const darkModeEnabled = useThemeStore((state) => state.darkModeEnabled);

  const featureDataPersonalized = {
    title: 'Personalised Recommendation',
    description: 'Receive a curated stream of articles, videos, and images tailored to your specific areas of study and interests. Enhance your learning experience with content personalized just for you.',
  };

  const featureDataFakeContent = {
    title: 'Filtering Fake Content',
    description: 'This platform leverages advanced machine learning algorithms to filter out offensive and inappropriate content. Additionally, it identifies potential misinformation, ensuring a safe and trustworthy environment for learning.',
  };

  const featureDataGroupDiscussions = {
    title: 'Group Discussions',
    description: 'Engage in meaningful group discussions with like-minded individuals. Participate in conversations related to your areas of interest and collaborate with others to deepen your understanding of various topics.',
  };

  const featureDataGroupChats = {
    title: 'Group Chats',
    description: 'Connect with fellow students in real-time through our group chat feature. Whether it\'s discussing project ideas, sharing insights, or seeking help, our chat system facilitates seamless communication among users.',
  };

  const featureDataCustomContent = {
    title: 'Upload Custom Content',
    description: 'Contribute to the community by sharing your own articles, images, and videos. Showcase your knowledge and expertise while helping others discover valuable content in your chosen areas of study.',
  };

  return (
    <div className="max-h-fit mt-16 flex">
      <div className="basis-1/3 p-2 flex flex-col w-full">
        <div className="basis-1/3">
          <FeatureCard data={featureDataPersonalized} isOdd={true} />
        </div>
        <div className="h-24"></div>
        <div className="basis-1/3">
          <FeatureCard data={featureDataFakeContent} isOdd={true} />
        </div>
      </div>

      <div className="basis-1/3 p-2 flex flex-col justify-center items-center">
        <div className="w-96 flex justify-center items-center my-4 h-96 rounded-full border-2 border-indigo-500">
          <img className='h-60' src={darkModeEnabled ? whiteLogo : blackLogo} alt="" />
        </div>
      </div>


      <div className="basis-1/3 p-2 flex flex-col w-full justify-between">
        <div className="basis-1/3">
          <FeatureCard data={featureDataGroupDiscussions} isOdd={false} />
        </div>

        <div className="basis-1/3">
          <FeatureCard data={featureDataGroupChats} isOdd={false} />
        </div>
      </div>
    </div>
  )
}

export default Home

export const FeatureCard = ({ data, isOdd }) => {
  const variants = {
    hidden: { opacity: 0, x: isOdd ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="p-3 mb-5">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.5 }}
        className="basis-3/5 text-justify p-4 rounded-xl "
      >
        <h3 className='text-3xl py-3 card-header'>
          <span className="py-3">{data.title}</span>
        </h3>
        <hr />
        <p className='text-xl py-3'>{data.description}</p>
      </motion.div>
    </div>
  );
};