import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { interestQuery } from '../../query/interest';
import Loader from '../Loader';

function Interest() {
  const { pk } = useParams();
  const [interest, setInterest] = useState({})

  const { isLoading: interestLoading } = useQuery("interest", () => interestQuery(pk), {
    onSuccess: (data) => {
      setInterest(data);
    }
  });

  if (interestLoading) {
    return <Loader />
  }

  return (
    <div>
      <div className="border-b w-fit pb-2 mb-4 px-2">
        <p className="text-3xl">{interest && interest.name}</p>
        <p className="text-lg">{interest && interest.description}</p>
      </div>
      <div className="mt-2 p-3">
        <p className="text-2xl">Recommendations</p>
        <div className="mt-2 flex flex-wrap">
          {interest && interest.recommendations && interest.recommendations.map((recommendation, index) => (
            <div key={index} className='md:basis-3/12 p-4 min-h-full'>
              <div className="h-full border rounded-xl p-3 flex flex-col justify-between">
                <div className='mb-2'>
                  <p>{recommendation.title}</p>
                </div>
                <div className="w-full relative">
                  <img src={'https://i.ytimg.com/vi/'+recommendation.videoId+'/hqdefault.jpg'} className='min-w-full' alt="" />
                  <div className="h-full w-full absolute bg-transparent flex justify-center items-center top-0">
                    <Link to={`/recommendation/${recommendation.uid}/${recommendation.source.toLowerCase()}`} className='h-16 w-16 bg-black p-3 flex justify-center items-center rounded-full z-30'>
                      <FontAwesomeIcon icon={faPlay} className='text-4xl text-white' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Interest