import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";
import { useMutation } from 'react-query'
import { addUserIntrestMutation } from '../../mutation/interest';
import { categoriesQuery, myInterestQuery } from '../../query/interest'

function Categories() {

    const { mutate: AddInterestMutation } = useMutation(addUserIntrestMutation, {
        onSuccess: (data) => {
            alert(data)
        }
    })

    const addInterest = (uid) => (event) => {
        AddInterestMutation({ 'uid': uid })
    }

    const [dcategories, setDCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [interests, setInterests] = useState([]);

    const { isLoading } = useQuery("categories", categoriesQuery, {
        onSuccess: (data) => {
            setDCategories(data)
            setCategories(data)
        }
    });

    const { isLoading: interestLoading } = useQuery("interests", myInterestQuery, {
        onSuccess: (data) => {
            setInterests(data.interests)
        }
    })

    const searchCategory = (e) => {
        e.preventDefault();
        const searchTerm = e.target.value.toLowerCase().trim();

        const filteredCategories = dcategories.map(category => {
            if (category.name.toLowerCase().includes(searchTerm) || category.description.toLowerCase().includes(searchTerm)) {
                return category;  // Include the entire category
            } else {
                const matchingInterests = category.intrests.filter(interest => interest.name.toLowerCase().includes(searchTerm) || interest.description.toLowerCase().includes(searchTerm));
                return matchingInterests.length > 0 ? { ...category, intrests: matchingInterests } : null;
            }
        }).filter(Boolean);

        setCategories(filteredCategories);
    };

    return (
        <div>
            <p className="text-3xl font-bold">My Interests</p>
            <div className="mt-3">
                {interests.length > 0 ?
                    <div>
                        {interests.map((interest, index) => (
                            <div>{interest.name}</div>
                        ))}
                    </div>
                    :
                    <div>No interests</div>
                }
            </div>
            <div className="my-2 flex justify-between">
                <p className="text-3xl font-bold">Categories</p>
                <div>
                    <input onChange={searchCategory} id='search' type="text" className="input p-2 px-4" placeholder='search' />
                </div>
            </div>
            {categories.map((category, index) => (
                <div className='p-2 h-full' key={index}>
                    <div className="mx-3 mb-2">
                        <Link to={`/category/${category.uid}/${category.name}`} className='text-2xl card-header'>{category.name}</Link>
                        <p className='font-extralight text-gray-600 dark:text-gray-200 text-lg'>{category.description}</p>
                    </div>
                    <div className="flex mt-3 flex-wrap">
                        {category.intrests.map((interest, i_index) => (
                            <div className='card-cont' key={i_index}>
                                <div className="card-border">
                                    <p className="text-xl card-header">{interest.name}</p>
                                    <hr className='my-2' />
                                    <p className='flex-grow text-justify'>{interest.description}</p>
                                    <div className="mt-3 flex justify-between">
                                        <button className='card-action-btn'>View</button> <button onClick={addInterest(interest.uid)} className='card-action-btn'>Add Interest</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Categories