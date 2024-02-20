import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, QueryClient, useQueryClient } from 'react-query';
import YouTube from 'react-youtube';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { youtubeRecommendationQuery, recommendationReviewsQuery, userReviewQuery, recommendationNotesQuery } from '../../../query/recommendation';
import { Controller } from "@hotwired/stimulus";
import Loader from '../../Loader';
import { likeRecommendationMutation, dislikeRecommendationMutation, addreviewMutation, saveNotesMutation, deleteReviewMutation } from '../../../mutation/recommendation';
import { Link } from 'react-router-dom';

const YoutubeRecommendation = ({ pk }) => {
  const [loaded, setLoaded] = useState(false);
  const queryClient = useQueryClient();

  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const [loading, setIsLoading] = useState(true)

  const { mutate: likeMutate } = useMutation(likeRecommendationMutation, {
    onSuccess: (data) => {
      if (data.success) {
        setLike(true)
        setDislike(false)
      }
      queryClient.invalidateQueries('recommendation-review')
    }
  })

  const likeMutation = (event) => {
    event.preventDefault();
    likeMutate(pk)
  }

  const { mutate: dislikeMutate } = useMutation(dislikeRecommendationMutation, {
    onSuccess: (data) => {
      if (data.success) {
        setLike(false)
        setDislike(true)
      }
      queryClient.invalidateQueries('recommendation-review')
    }
  })

  const disLikeMutation = (event) => {
    event.preventDefault();
    dislikeMutate(pk)
  }

  const { isLoading: reviewing, mutate: uploadReview } = useMutation(addreviewMutation, {
    onSuccess: (data) => {
      if (data.success) {
        setReview("")
      }
      queryClient.invalidateQueries('recommendation-review')
      queryClient.invalidateQueries('user-review')
    }
  })

  const [review, setReview] = useState('')
  const upload_review = (event) => {
    event.preventDefault();
    uploadReview({ uid: pk, review: review })
  }



  const { mutate: deleteReview } = useMutation(deleteReviewMutation, {
    onSuccess: (data) => {
      if (data.success) {
        setReview("")
      }
      queryClient.invalidateQueries('recommendation-review')
      queryClient.invalidateQueries('user-review')
    }
  })

  const delete_review = (event) => {
    event.preventDefault();
    deleteReview(pk);
  }


  const [recommendation, setRecommedation] = useState({})
  const [userReview, setUserReview] = useState({})
  const [recommendationReviews, setRecommendationReviews] = useState([])

  const { isLoading: recommendationLoading } = useQuery('recommendation', () => youtubeRecommendationQuery(pk), {
    onSuccess: (data) => {
      setRecommedation(data)
    }
  });

  const { isLoading: userReviewLoading } = useQuery('user-review', () => userReviewQuery(pk), {
    onSuccess: (data) => {
      if (data) {
        setUserReview(data)
        if (data.like) {
          setLike(true)
          setDislike(false)
        } else if (data.dislike) {
          setLike(false)
          setDislike(true)
        }
        if (data.review) {
          setReview(data.review)
        }
      } else {
        setUserReview({})
        setLike(false)
        setDislike(false)
      }
    }
  });

  const { isLoading: recommendationReviewsLoading } = useQuery('recommendation-review', () => recommendationReviewsQuery(pk), {
    onSuccess: (data) => {
      if (data) {
        setRecommendationReviews(data)
      } else {
        setRecommendationReviews([])
      }
    }
  });


  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  const onReady = (event) => {
    setIsLoading(false)
    playerRef.current.internalPlayer.stopVideo();
  };

  const onStateChange = (event) => {
    if (event.data === 1 && isPlaying) {
      setTimeout(() => {
        stopVideo();
      }, 6000);
      setIsPlaying(false);
    }
  };

  const stopVideo = () => {
    playerRef.current.internalPlayer.stopVideo();
  };

  const [notes, setNotes] = useState('');
  const [userNotes, setUserNotes] = useState({})
  const { isLoading: notesLoading } = useQuery('recommendation-motes', () => recommendationNotesQuery(pk), {
    onSuccess: (data) => {
      if (data?.notes) {
        setUserNotes(data)
      }
    },
    onError: (error) => {
      alert("An error occured when fetching notes");
    },
  })

  const { mutate: saveNotes, isLoading: savingNotes } = useMutation(saveNotesMutation, {
    onSuccess: (data) => {
      if (data.success) {
        alert("Notes saved");

        var editor = document.querySelector('.ql-editor');
        if (editor) {
          editor.innerHTML = notes;
          setLoaded(true)
        }
      } else {
        alert(data.error)
      }
    },
    onError: (error) => {
      alert("An error occured when saving notes");
    }
  })

  const SaveNotes = (event) => {
    saveNotes({ notes: notes, uid: pk })
  }

  if (recommendationLoading || userReviewLoading || recommendationReviewsLoading || notesLoading) {
    return <Loader />
  }

  const toggleLoaded = (event) => {
    if (!loaded) {
      var editor = document.querySelector('.ql-editor');
      if (editor) {
        editor.innerHTML = userNotes?.notes;
        setLoaded(true)
      }
    }
  }

  return (
    <div className='h-full max-h-full'>
      {recommendation && (
        <div className='flex md:flex-row flex-col h-full' onMouseOver={toggleLoaded}>
          <div className="md:basis-2/5 px-5 max-w-screen-sm flex flex-col h-full" style={{ maxWidth: '100vw' }}>
            <YouTube
              iframeClassName='md:min-w-full min-w-screen'
              videoId={recommendation.videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              ref={playerRef}
            />
            <div className="control mt-3 flex">
              <form onSubmit={upload_review} className="relative mr-3 flex-grow">
                <input type="text" onChange={(e) => setReview(e.target.value)} value={review} id='review' className="bg-transparent h-10 focus:outline-none border w-full border-indigo-500 rounded p-3" placeholder='Post Comment' required />
                <button type='submit' className='absolute right-0 top-0 bg-indigo-500 rounded-tr rounded-br w-10 h-full'><FontAwesomeIcon icon={faShare} /></button>
              </form>
              <div className='flex items-center'>
                <div>
                  <button type='button' className='mx-2' onClick={likeMutation}><FontAwesomeIcon icon={faThumbsUp} onClick={likeMutation} className={`text-2xl + ${like && "text-red-400"}`} /></button>
                  <button type='button' className='mx-2' onClick={disLikeMutation}><FontAwesomeIcon onClick={disLikeMutation} className={`text-2xl + ${dislike && "text-red-400"}`} icon={faThumbsDown} /></button>
                </div>
              </div>
            </div>
            {userReview.review && (
              <div className='flex flex-col mb-2 p-3 bg-slate-800 rounded-lg'>
                <div className="flex justify-between">
                  <p className=''>{new Date(userReview.updatedAt).toLocaleString({ hourCycle: 'h12' })}</p>
                  <button onClick={delete_review} type="button" className='text-base p-1 bg-red-500 text-white font-semibold rounded-full px-4'>Delete</button>
                </div>

                <div className="flex">
                  <p className="flex-grow">{userReview.review}</p>
                  <div className="flex">
                    <div className='mr-3'>
                      {userReview.like && <FontAwesomeIcon icon={faThumbsUp} className='text-red-400' />}
                      {userReview.dislike && <FontAwesomeIcon icon={faThumbsDown} className='text-red-400' />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 flex-grow h-full p-3">
              <div className="mb-3">
                <p className="text-2xl p-2 w-fit">Comments</p>
                <hr />
              </div>
              <div className="mt-2 h-full overflow-auto bg-slate-700 p-3">
                {recommendationReviews.map((rreview, index) => (
                  <div key={index} className='flex flex-col mb-2 p-3 bg-slate-800 rounded-lg'>
                    <div className="flex justify-between">
                      <Link to={""} className='mr-2 lowercase font-bold text-indigo-400 cursor-pointer'>{rreview?.user?.username}</Link>
                      <p className=''>{new Date(rreview.updatedAt).toLocaleString({ hourCycle: 'h12' })}</p>
                    </div>

                    <div className="flex">
                      <p className="flex-grow">{rreview.review}</p>
                      <div className="flex">
                        <div>
                          {rreview.like && <FontAwesomeIcon icon={faThumbsUp} className='text-red-400' />}
                          {rreview.dislike && <FontAwesomeIcon icon={faThumbsDown} className='text-red-400' />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-grow p-5 flex flex-col">
            <p className='mb-3 text-2xl'>Short Notes</p>
            <div className="border rounded">
              <ReactQuill theme='snow' value={notes} className='quill-css' onChange={setNotes} style={{ minHeight: "100%" }} />
            </div>
            <div className="flex justify-end mt-3">
              <button onClick={SaveNotes} className="form-button w-full">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YoutubeRecommendation

class Notepad extends Controller {
  static targets = ['container', 'hidden', 'toolbar', 'form'];

  connect() {
    this.quillInit();
  }
  quillInit() {
    const quill = new Quill(this.containerTarget, this.quillOption);
    let _this = this;
    quill.on('text-change', function (delta) {
      _this.hiddenTarget.value = quill.root.innerHTML;
    });

    quill.on('selection-change', function (range, oldRange, source) {
      if (range === null && oldRange !== null) {
        _this.onFocusOut();
      } else if (range !== null && oldRange === null)
        _this.onFocus();
    });
  }

  onFocus() {
    this.element.classList.add("border-gray-200");
    this.toolbarTarget.classList.add("opacity-100");
  }

  onFocusOut() {
    this.element.classList.remove("border-gray-200");
    this.toolbarTarget.classList.remove("opacity-100");

    this.formTarget.requestSubmit();
  }

  get quillOption() {
    return {
      modules: {
        toolbar: this.toolbarTarget
      },
    }
  }
}