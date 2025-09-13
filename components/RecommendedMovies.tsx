import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import MovieCard from './MovieCard';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';

interface RecommendedMoviesProps {
  searchQuery: string;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ searchQuery }) => {
  const {
    data: recommendedMovies,
    loading: recommendedLoading,
    error: recommendedError
  } = useFetch(() => fetchMovies({ query: '' })); // Fetch trending movies

  if (recommendedLoading) {
    return (
      <View className="mt-8 px-5">
        <ActivityIndicator
          size="large"
          color="#e5e5e7ff"
          className="self-center"
        />
      </View>
    );
  }

  if (recommendedError) {
    return (
      <View className="mt-8 px-5">
        <Text className="text-center text-red-500">
          Failed to load recommended movies
        </Text>
      </View>
    );
  }

  const title = searchQuery.trim() ? 'No movies found' : 'Discover Movies';
  const subtitle = searchQuery.trim() 
    ? 'Try searching for something else or check out these recommendations:'
    : 'Here are some trending movies to get you started:';

  return (
    <View className="mt-8 px-5">
      <Text className="text-center text-white text-xl font-bold mb-2">
        {title}
      </Text>
      <Text className="text-center text-light-200 text-base mb-6">
        {subtitle}
      </Text>
      
      <FlatList
        data={recommendedMovies?.results?.slice(0, 6)} // Show only first 6 movies
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => `recommended-${item.id}`}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 8,
          marginBottom: 16
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default RecommendedMovies;