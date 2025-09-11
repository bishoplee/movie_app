import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({
  id,
  title,
  adult,
  backdrop_path,
  genre_ids,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  video,
  vote_average,
  vote_count
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[32.5%] p-1'>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />

        <Text
          className='text-white font-bold text-sm mt-2'
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard