import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { myContentsQuery } from '../../query/content'
import { useQuery } from 'react-query'
import pdfPng from '../../assets/pdf.png'
import videoPng from '../../assets/video.jpg'

function ManageContent() {
  const [contents, setContents] = useState([])

  const { isLoading: contentLoading } = useQuery("my-contents", myContentsQuery, {
    onSuccess: (data) => {
      console.log(data)
      setContents(data)
    }
  })

  var name = "wandabi"
  name.toLowerCase()

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">My Content</h1>
        <div>
          <Link to="/user-content/add" className="btn btn-link">Add Content</Link>
        </div>
      </div>
      <div className="mt-4 flex">
        {contents.map((content, index) => (
          <div key={index} className="card-cont">
            <div className="flex flex-col justify-between h-full border p-3 rounded-lg">
              <div>
                <p className="text-xl card-header">{content.title}</p>
                <p className="text-justify text-base">{content.description}</p>
                <hr className="my-2" />
              </div>

              <div className='p-4'>
                <img src={content.contentType.toString().toLowerCase() == "video" ? videoPng : pdfPng} className='mx-auto w-64' alt="pdf" />
              </div>
              <div>
                <hr />
                <div className="mt-3 flex justify-between">
                  <Link to={"/content/" + content.uid} className="card-action-link">View</Link>
                  <Link to={"/user-content/delete/" + content.uid} className="card-action-link text-red-500">Delete</Link>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default ManageContent