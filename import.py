import json

import mysql.connector
import pandas as pd

# Informations de connexion sans spécifier la base de données
db_config = {
    'user': 'curveo',
    'password': 'melodie2012',
    'host': 'localhost',
    'raise_on_warnings': True
}

# Connexion initiale à MySQL
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

# Création de la base de données
cursor.execute("CREATE DATABASE IF NOT EXISTS moveia;")
cursor.close()
cnx.close()

# Mise à jour de la configuration pour inclure la base de données
db_config['database'] = 'moveia'

# Reconnexion avec la base de données spécifiée
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

# Script pour créer les tables
create_tables_script = """
CREATE TABLE IF NOT EXISTS Movies (
    movie_id INT PRIMARY KEY,
    title VARCHAR(255),
    overview TEXT,
    release_date DATE,
    budget BIGINT,
    revenue BIGINT,
    runtime INT,
    vote_average FLOAT,
    vote_count INT
);

CREATE TABLE IF NOT EXISTS Genres (
    genre_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS MovieGenres (
    movie_id INT,
    genre_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id),
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE IF NOT EXISTS People (
    person_id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS cast (
    cast_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    actor_name VARCHAR(255),
    character_name VARCHAR(800)
    -- Remplacer par d'autres colonnes si nécessaire --
);

CREATE TABLE IF NOT EXISTS crew (
    crew_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    person_name VARCHAR(255),
    role VARCHAR(255)
    -- Remplacer par d'autres colonnes si nécessaire --
);
"""

# Exécuter le script de création des tables
for result in cursor.execute(create_tables_script, multi=True):
  pass  # Nécessaire pour exécuter multi-statements

combined_df = pd.read_csv('csv/combined_movies_data.csv')

# Insérer des données dans la table Movies
for _, row in combined_df.iterrows():
    cursor.execute("""
    INSERT INTO Movies (movie_id, title, overview, release_date, budget, revenue, runtime, vote_average, vote_count)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        row['id'],
        row['original_title'],
        row['overview'],
        row['release_date'],
        row['budget'],
        row['revenue'],
        row['runtime'],
        row['vote_average'],
        row['vote_count']
    ))

    genres = json.loads(row['genres'].replace("'", "\""))
    for genre in genres:
        cursor.execute("""
            INSERT INTO Genres (genre_id, name) 
            VALUES (%s, %s) AS new_genre
            ON DUPLICATE KEY UPDATE name = new_genre.name
        """, (genre['id'], genre['name']))
        cursor.execute("""
            INSERT INTO MovieGenres (movie_id, genre_id) 
            VALUES (%s, %s) AS new_movie_genre
            ON DUPLICATE KEY UPDATE movie_id = new_movie_genre.movie_id, genre_id = new_movie_genre.genre_id
        """, (row['id'], genre['id']))

for index, row in combined_df.iterrows():
    # Extraction et transformation de la colonne 'cast'
    if not pd.isna(row['cast']):
        cast_list = json.loads(row['cast'])
        for cast_member in cast_list:
            insert_cast_query = "INSERT INTO cast (movie_id, actor_name, character_name) VALUES (%s, %s, %s)"
            cursor.execute(insert_cast_query, (row['id'], cast_member['name'], cast_member['character']))

    # Extraction et transformation de la colonne 'crew'
    if not pd.isna(row['crew']):
        crew_list = json.loads(row['crew'])
        for crew_member in crew_list:
            insert_crew_query = "INSERT INTO crew (movie_id, person_name, role) VALUES (%s, %s, %s)"
            cursor.execute(insert_crew_query, (row['id'], crew_member['name'], crew_member['job']))

# Commit les opérations
cnx.commit()

# Fermer la connexion
cursor.close()
cnx.close()
