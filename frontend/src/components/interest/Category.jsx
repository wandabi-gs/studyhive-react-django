import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { categoryQuery } from '../../query/interest';

function Category() {
  const params = useParams();
  const [category, setCategory] = useState({});

  const { isLoading } = useQuery(['category', params.pk], () => categoryQuery(params.pk), {
    onSuccess: (data) => {
      setCategory(data);
    },
  });

return (
  <div>
    {Object.entries(category).length > 0 ? (
      <div className="">
        <div className="mb-4">
          <p className="text-4xl mb-3 ">{params.name}</p>
          <p className="text-xl font-extralight ">{category?.description}</p>
        </div>
        <div className="flex flex-col">
          {category.intrests.map((interest, index) => (
            <div className='mb-6' key={index}>
              <div className="mb-3">
                <Link to={`/interest/${interest.uid}/${interest.name}`} className='text-2xl card-header'>{interest.name}</Link>
                <p className='font-extralight text-gray-600 dark:text-gray-300 text-lg'>{interest.description}</p>
              </div>
              <div className='flex justify-start overflow-x-auto flex-wrap'>
                {interest.recommendations.map((recommendation, r_index) => (
                  <div className='card-cont' key={r_index}>
                    <div className="card-border">
                      <p className="text-xl card-header">{recommendation.title}</p>
                      <hr className='my-2' />
                      <p className='flex-grow text-justify'>{recommendation.preview}</p>
                      <hr className='my-2' />
                      <Link to={recommendation.url} className='link'>{recommendation.url}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="text-4xl">Loading...</div>
    )}
  </div>
);

}

export default Category;
