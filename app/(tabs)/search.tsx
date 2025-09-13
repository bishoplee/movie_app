import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '@/services/useFetch';
import useDebounce from '@/services/useDebounce';
import { fetchMovies } from '@/services/api';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import RecommendedMovies from '@/components/RecommendedMovies';

const Search = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce delay

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: debouncedSearchQuery
  }), false);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      loadMovies();
    } else {
      reset();
    }
  }, [debouncedSearchQuery])
  
  return (
    <View className='flex-1 bg-primary'>
      <Image 
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode='cover'
      />
      
      <FlatList
        data={movies?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-4'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 8,
          marginBottom: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20 mb-6'>
              <Image
                source={icons.logo}
                className="w-12 h-10 justify-center mb-6"
              />
            </View>

            <View className='px-1'>
              <SearchBar
                placeholder='Search movies, TV shows...'
                value={searchQuery}
                onChangeText={(text: string) => setsearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#e5e5e7ff"
                className="mt-4 self-center"
              />
            )}

            {error && (
              <Text
                className="text-red-500 text-lg text-center mt-8"
              >Error: {error?.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.results?.length > 0 && (
              <Text className="text-xl text-white mb-4 mt-8 font-bold">
                Search Results for: {' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <RecommendedMovies searchQuery={searchQuery} />
          ) : null
        }
      />
    </View>
  )
}

export default Search