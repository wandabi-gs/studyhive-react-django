import React, { useState } from 'react'
import { useQueries, useQueryClient, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { addUserIntrestMutation, removeUserIntrestMutation } from '../../mutation/interest';
import { userInterestQuery } from '../../query/interest';
import Loader from '../Loader';
import { userQuery } from '../../query/user';
import { addConnectionMutation } from '../../mutation/user';

function User() {
    const { pk } = useParams();
    const [user, setUser] = useState({})
    const [uinterest, setInterest] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const queryClient = useQueryClient();

    const { mutate: AddInterestMutation, isLoading: addingInterest } = useMutation(addUserIntrestMutation, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("interests")
            queryClient.invalidateQueries("categories")
        }
    })

    const addInterest = (uid) => async (event) => {
        setIsLoading(true);
        await sleep(1500)
        AddInterestMutation(uid)
        setIsLoading(false);
    }

    const { mutate : AddConnectionMutation } = useMutation(addConnectionMutation, {
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const addconnection = (uid) => async (event) => {
        await sleep(1500)
        AddConnectionMutation(uid)
    }

    const { isLoading: queryLoading } = useQueries(
        [
            {
                queryKey: 'user',
                queryFn: () => userQuery(pk),
                onSuccess: (data) => {
                    setUser(data)
                }
            },
            {
                queryKey: 'userInterest',
                queryFn: () => userInterestQuery(pk),
                onSuccess: (data) => {
                    setInterest(data)
                }
            },
        ]
    )

    if (queryLoading || isLoading) {
        return <Loader />
    }
    return (
        <div>
            <div className='mb-5'>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <button onClick={addconnection(pk)}></button>
            </div>
            <div className="flex flex-wrap">
                {uinterest && uinterest.interests && uinterest.interests.map((interest, index) => (
                    <div className='card-cont' key={index}>
                        <div className="card-border">
                            <p className="text-xl card-header">{interest.name}</p>
                            <hr className='my-2' />
                            <p className='flex-grow text-justify'>{interest.description}</p>
                            <div className="mt-3 flex justify-between">
                                <Link to={'/interest/'+interest.uid} className='card-action-btn'>View</Link> <button onClick={addInterest(interest.uid)} className='card-action-btn'>Add Interest</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default User