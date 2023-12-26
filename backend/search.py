from decouple import config
import requests

from intrest.models import Interest, Recommendation

API_KEY=config('GOOGLE_API_KEY')
CX = config('GOOGLE_API_CX')

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