import React, { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { myInterestQuery } from '../../query/interest'

function Recommendations() {

    const [interests, setInterests] = useState([]);

    const { isLoading: interestLoading } = useQuery("interests", myInterestQuery, {
        onSuccess: (data) => {
            setInterests(data.interests)
        }
    })

    return (
        <div>
            <p className="text-3xl font-bold">My Interests</p>
            <div className="mt-3">
                {interests.length > 0 ?
                    <div className='mb-5'>
                        {interests.map((interest, index) => (
                            <div className="mb-5">
                                <div className="mb-3">
                                    <p className="text-3xl">{interest && interest.name}</p>
                                    <p className="text-lg pb-4">{interest && interest.description}</p>
                                    <hr />
                                </div>
                                <div className='flex flex-wrap' key={index}>
                                    {interest.recommendations.length > 0 && interest.recommendations.map((recommendation, r_index) => (
                                        <div key={index + "." + r_index} className='basis-3/12 p-4 min-h-full'>
                                            <div className="h-full border rounded-xl p-3 flex flex-col justify-between">
                                                <div className='mb-2'>
                                                    <p>{recommendation.title}</p>
                                                </div>
                                                <div className="w-full relative">
                                                    <img src={'https://i.ytimg.com/vi/' + recommendation.videoId + '/hqdefault.jpg'} className='min-w-full' alt="" />
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
                        ))}
                    </div>
                    :
                    <div>No Recommendations</div>
                }
            </div>
        </div>
    )
}

export default Recommendations