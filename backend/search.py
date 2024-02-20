from decouple import config
from googleapiclient.discovery import build
import requests

from interest.models import Interest, Recommendation

API_KEY=config('GOOGLE_API_KEY')
CX = config('GOOGLE_API_CX')

def search_youtube(query, max_results=10):
    youtube = build('youtube', 'v3', developerKey=API_KEY)

    search_response = youtube.search().list(
        q=query,
        part='id,snippet',
        maxResults=max_results
    ).execute()

    videos = []
    for search_result in search_response.get('items', []):
        if search_result['id']['kind'] == 'youtube#video':
            video = {
                'title': search_result['snippet']['title'],
                'video_id': search_result['id']['videoId'],
                'thumbnail_url': search_result['snippet']['thumbnails']['default']['url']
            }
            videos.append(video)

    return videos

def update_recommendations_youtube():
    for interest in Interest.objects.all():
        results = search_youtube(interest.name)
        for result in results:
            try:
                Recommendation.objects.get(video_id=result["video_id"])
                continue
            
            except Recommendation.DoesNotExist:
                try:
                    recommendation = Recommendation.objects.create(
                        title=str(result['title']),
                        url=f'https://www.youtube.com/watch?v={result["video_id"]}',
                        thumbnail=result['thumbnail_url'],
                        source='youtube',
                        video_id = result['video_id']
                    )

                    interest.recommendations.add(recommendation)
                
                except Exception as e:
                    print(result['title'])
                    print("")
                    continue


def search(query):
    url = f'https://www.googleapis.com/customsearch/v1?key={API_KEY}&cx={CX}&q={query}'

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        results = data.get('items', [])
        search_results = []

        for result in results:
            title = result.get('title', 'No Title')
            url = result.get('link', '#')
            snippet = result.get('snippet', 'No Preview Available')
            search_results.append({
                'title': title,
                'url': url,
                'preview': snippet
            })

        return search_results
    else:
        return []

def execute():
    for interest in Interest.objects.all():
        results = search(interest.name)
        for result in results:
            recommendation = Recommendation.objects.create(
                title=result['title'],
                url=result['url'],
                preview=result['preview']
            )

            interest.recommendations.add(recommendation)