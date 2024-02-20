import { faFile, faHeader, faPenClip, faReceipt, faTeletype } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { uploadContentMutation } from '../../mutation/content'
import { myInterestQuery } from '../../query/interest'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

function AddContent() {
  const navigate = useNavigate()

  const [content, setContent] = useState({
    interest: "",
    title: "",
    description: "",
    contentType: "video",
    upload: null
  })

  const { interest, title, description, contentType } = content;
  const ChangeContent = (event) => {
    const name = event.target.name
    if (name === 'contentType') {
      document.getElementById('upload').value = ''

      setContent({ ...content, "upload": null })

      if (event.target.value === 'video') {
        document.getElementById('upload').accept = 'video/*'
      } else {
        document.getElementById('upload').accept = 'application/pdf'
      }
    }
    if (name === 'upload') {
      setContent({ ...content, [event.target.name]: event.target.files[0] })
    } else {
      setContent({ ...content, [event.target.name]: event.target.value })
    }
  }

  const [error, setError] = useState(null)
  const [interests, setInterests] = useState([])

  const { isLoading: interestLoading } = useQuery("interests", myInterestQuery, {
    onSuccess: (data) => {
      setInterests(data.interests)
      if (data.interests.length > 0) {
        setContent({ ...content, "interest": data.interests[0].uid })
      }
    }
  })

  const { isLoading: uploading, mutate } = useMutation(uploadContentMutation, {
    onSuccess: (data) => {
      if(data.success){
        alert(`${data.content.title} has been uploaded!`)
        navigate("/user-content/manage")
      }
      else{
        setError(data.error)
      }
    }
  })

  const submitHandler = (e) => {
    e.preventDefault()
    mutate(content)
  }

  if(interestLoading || uploading){
    return <Loader />
  }

  return (
    <div>
      <div className="flex justify-center mt-5">
        <form onSubmit={submitHandler} className="rounded-lg p-4 basis-1/3">
          <div className='mb-4'>
            <h1 className="text-2xl font-bold mb-3">Add Content</h1>
            {error && (<p className='m-3 text-center input-error'>{error}</p>)}
            <hr />
          </div>

          <div className="control">
            <label htmlFor="interest" className='form-label'>Interest</label>
            <div className="input-control">
              <select id="interest" name="interest" className="input peer" onChange={ChangeContent}>
                {interests.map((uinterest, index) => (
                  <option key={index} value={uinterest.uid}>{uinterest.name}</option>
                ))}
              </select>
              <FontAwesomeIcon icon={faPenClip} className='icon-start' />
            </div>
          </div>

          <div className="control">
            <label htmlFor="title" className='form-label'>Title</label>
            <div className="input-control">
              <input type="text" id="title" value={title} name='title' className="input peer" onChange={ChangeContent} placeholder="Enter title" required />
              <FontAwesomeIcon icon={faHeader} className='icon-start' />
            </div>
          </div>

          <div className="control">
            <label htmlFor="description" className='form-label'>Description</label>
            <div className="input-control">
              <input type="text" id="description" value={description} name='description' className="input peer" onChange={ChangeContent} placeholder="Enter description" required />
              <FontAwesomeIcon icon={faReceipt} className='icon-start' />
            </div>
          </div>

          <div className="control">
            <label htmlFor="contentType" className='form-label'>Content Type</label>
            <div className="input-control">
              <select id="contentType" name="contentType" className="input peer" onChange={ChangeContent}>
                <option value="video">Video</option>
                <option value="pdf">Pdf</option>
              </select>
              <FontAwesomeIcon icon={faPenClip} className='icon-start' />
            </div>
          </div>

          <div className="control" id='uploadcont'>
            <label htmlFor="upload" className="form-label">Upload</label>
            <div className="input-control">
              <input type="file" id="upload" className="input peer" name='upload' onChange={ChangeContent} accept='video/*' />
              <FontAwesomeIcon icon={faFile} className='icon-start' />
            </div>
          </div>


          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddContent