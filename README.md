# Studyhive

Studyhive is an innovative group-based online learning platform designed to provide students with a personalized and engaging content recommendation experience. Users can register, specify their interests, and receive tailored streams of articles, videos, and more. The platform facilitates connections between like-minded individuals through real-time chat and empowers users to curate and share their own content.

## Features

- Personalized content recommendations based on user interests.
- Real-time chat system for group discussions.
- Content curation and sharing capabilities.
- Machine learning-powered content filtering for offensive content.

## Tech Stack

### Backend

- Django
- Django GraphQL Jwt
- Django Channels
- Django Graphene
- Channels Daphne

### Frontend

- Vite React
- Tailwind CSS
- React-use-websocket
- Zustand
- React Query
- GraphQL-request
- Framer Motion

## Machine Learning Models

The project utilizes machine learning models for:

1. Content Recommendation:
   - Recommending personalized content based on user interests.
   - Framework: sc

2. Content Filtering:
   - Filtering offensive content and identifying potential fake content.
   - Framework: 

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/studyhive.git
   cd studyhive

2. Set up virtual environment:

   ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  

3. Install dependencies

   ```bash
    pip install -r requirements.txt

4. Run migrations:

   ```bash
    python manage.py migrate

5. Start Development Server:
   ```bash
    python manage.py runserver