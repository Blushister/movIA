import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Charger les données
df = pd.read_csv('./combined_movies_data.csv')
model = SentenceTransformer('sentence-transformers/distiluse-base-multilingual-cased-v1')

# Calculer les embeddings
df['embeddings'] = df['overview'].apply(lambda x: model.encode(x if x is not np.nan else ""))

# Convertir les embeddings en matrice numpy
embeddings_matrix = np.array(df['embeddings'].tolist())

# Trouver les 10 films les plus proches et les scores pour chaque film
def get_closest_films(embeddings_matrix, n=10):
    closest_films = []
    for i in range(len(embeddings_matrix)):
        similarities = cosine_similarity([embeddings_matrix[i]], embeddings_matrix)[0]
        most_similar_indices = np.argsort(similarities)[::-1][1:n+1]
        scores = similarities[most_similar_indices]
        closest_films.append((df.iloc[i]['id'], df.iloc[most_similar_indices]['id'].tolist(), scores.tolist()))
    return closest_films

closest_films = get_closest_films(embeddings_matrix)

# Créer un DataFrame pour le stockage
columns = ['movie_id', 'closest_movie_ids', 'similarity_scores']
closest_df = pd.DataFrame(closest_films, columns=columns)

# Enregistrer dans un fichier CSV
closest_df.to_csv('./closest_films_with_scores.csv', index=False)
