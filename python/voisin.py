import json

import mysql.connector
import pandas as pd

# Informations de connexion sans spécifier la base de données
db_config = {
    'user': 'moveia',
    'password': 'rqUuHDulPaQGePS',
    'host': 'los-santos.fr',
    'raise_on_warnings': True
}

# Nom de la base de données
db_name = 'moveia'

# Chemin du fichier CSV
file_path = 'simplified_closest_films.csv'

# Lire le fichier CSV
df = pd.read_csv(file_path)

# Fonction pour se connecter à la base de données
def connect_to_db():
    conn = mysql.connector.connect(
        database=db_name,
        **db_config
    )
    return conn

# Créer la table MoviesMovies
def create_table():
    print("Création de la table MoviesMovies2...")
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS MoviesMovies2 (
            movie_id INT,
            neighbor_movie_id INT,
            similarity_score FLOAT,
            FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
            FOREIGN KEY (neighbor_movie_id) REFERENCES Movies(movie_id)
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()
    print("Table créée avec succès.")

# Insérer les données dans la base de données
def insert_data():
    print("Insertion des données...")
    conn = connect_to_db()
    cursor = conn.cursor()

    for index, row in df.iterrows():
        movie_id = int(row['movie_id'])
        neighbor_movie_id = int(row['neighbor_movie_id'])
        similarity_score = float(row['similarity_score'])  # Conversion en float standard

        cursor.execute("""
            INSERT INTO MoviesMovies2 (movie_id, neighbor_movie_id, similarity_score)
            VALUES (%s, %s, %s)
        """, (movie_id, neighbor_movie_id, similarity_score))
    
        if index % 10 == 0:
            print(f"{index} lignes traitées...")

    conn.commit()
    cursor.close()
    conn.close()
    print("Données insérées avec succès.")


# Exécuter les fonctions
create_table()
insert_data()

print("Traitement terminé.")
