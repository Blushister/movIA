import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Charger les données
file_path = '/path/to/your/combined_movies_data.csv'  # Remplacez par le chemin de votre fichier
movies_data = pd.read_csv(file_path)

# Fonction pour extraire les 10 premiers membres du casting et du crew
def extract_top_members(data, top_n=10):
    try:
        members = eval(data)  # Convert string to list of dictionaries
        top_members = [member['name'] for member in members[:top_n]]
        return ','.join(top_members)
    except:
        return ''  # Return empty string if there's any issue

# Appliquer la fonction pour extraire les 10 premiers membres du casting et du crew
movies_data['top_cast'] = movies_data['cast'].apply(lambda x: extract_top_members(x))
movies_data['top_crew'] = movies_data['crew'].apply(lambda x: extract_top_members(x))

# Combiner les informations du casting et du crew
movies_data['combined'] = movies_data['top_cast'] + ',' + movies_data['top_crew']

# Calcul de similarité
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(movies_data['combined'])
cosine_sim = cosine_similarity(X, X)

# Création d'une DataFrame pour stocker les 10 films les plus proches pour chaque film
closest_10_films_by_id = pd.DataFrame(index=movies_data.index, columns=['Film_ID'] + [f'Closest_Film_ID_{i+1}' for i in range(10)] + [f'Similarity_Score_{i+1}' for i in range(10)])

for i in range(len(movies_data)):
    # Trouver les 10 films les plus similaires pour chaque film
    similar_indices = np.argsort(-cosine_sim[i])  # Trier les indices en fonction de la similarité
    closest_indices = similar_indices[1:11]  # Prendre les 10 films les plus proches, en excluant le film lui-même

    # Enregistrer les résultats
    closest_10_films_by_id.iloc[i, 0] = movies_data['id'][i]  # ID du film
    for j, idx in enumerate(closest_indices):
        closest_10_films_by_id.iloc[i, j+1] = movies_data['id'][idx]  # ID du film proche
        closest_10_films_by_id.iloc[i, j+11] = cosine_sim[i][idx]  # Score de similarité

# Enregistrer les résultats dans un fichier CSV
output_path_10_closest_by_id = '/path/to/save/closest_10_films_by_id.csv'  # Remplacez par le chemin souhaité
closest_10_films_by_id.to_csv(output_path_10_closest_by_id, index=False)
