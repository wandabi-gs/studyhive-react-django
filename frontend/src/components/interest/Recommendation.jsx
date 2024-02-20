import React from 'react'
import { useParams } from 'react-router-dom'
import YoutubeRecommendation from './recommendation/YoutubeRecommendation';
import BookRecommendation from './recommendation/BookRecommendation';

function Recommendation() {

  const { pk, source } = useParams();

  if (source == "youtube") {
    return <YoutubeRecommendation pk={pk} />
  }else{
    return <BookRecommendation pk={pk} />
  }
}

export default Recommendation