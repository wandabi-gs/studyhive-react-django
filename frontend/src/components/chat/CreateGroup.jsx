import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from 'react-query';
import { createGroupMutation } from '../../mutation/chat';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [group, setGroup] = useState({
        name: '',
        description: '',
        isprivate: false
    });
    const { name, description, isprivate } = group;
    const ChangeInput = (name) => (event) => {
        setGroup({ ...group, [name]: event.target.value })
    }

    const ChangePrivate = (cprivate) => (event) => {
        if(cprivate){
            setGroup({ ...group, isprivate: true })
        }else{
            setGroup({ ...group, isprivate: false })
        }
    }

    const { mutate, isLoading } = useMutation(createGroupMutation, {
        onSuccess: (data) => {
            if(data.success){
                navigate(`/group-chat/${data.group.uid}`)
            }else{
                setError(data.error)
            }
        }, onError: (error) => {
            setError("An error occurred. Try again later")
        }
    });

    const postForm = (event) => {
        event.preventDefault();
        if (name.trim().length == 0 || description.length == 0) {
            setError("Please fill out all fields")
            return;
        }
        mutate({ "name": name, "description": description, "isprivate": isprivate });
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className='flex justify-center mt-5'>
            <form onSubmit={postForm} className="border rounded-lg p-5 basis-1/3">
                <div className="mb-3">
                    <h3 className='text-2xl text-indigo-400'>Create Group</h3>
                    {error && (<p className='m-3 text-start input-error'>{error}</p>)}
                    <hr className='mt-2' />
                </div>
                <div className="control">
                    <label htmlFor="name">Group Name</label>
                    <div className="input-control">
                        <input type="text" className="input peer" id='name' value={name} onChange={ChangeInput('name')} placeholder='Group Name' required/>
                        <FontAwesomeIcon icon={faUser} className='icon-start' />
                    </div>
                </div>

                <div className="control">
                    <label htmlFor="description">Group Description</label>
                    <div className="input-control mt-3">
                        <textarea className="input peer" id='description' value={description} onChange={ChangeInput('description')} placeholder='Group Description' />
                        <FontAwesomeIcon icon={faUser} className='icon-start' />
                    </div>
                </div>

                <div className="control">
                    <label htmlFor="isprivate">Private Group</label>
                    <div className="input-control">
                        <label htmlFor="isprivate" className='mx-3'>
                            <input type="radio" name="isprivate" id="isprivate" onChange={ChangePrivate(true)} className='ml-3' /> Yes
                        </label>
                        <label htmlFor="notprivate" className='mx-3'>
                            <input type="radio" checked name="isprivate" id="notprivate" onChange={ChangePrivate(false)} className='ml-3' /> No
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className='form-button'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateGroup