import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image
        source={images.bg}
        className="absolute w-full h-full"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10
        }}
      >
        <Image 
          source={icons.logo}
          className="w-12 h-10 justify-center mt-20 mb-5 mx-auto"
        />

        {moviesLoading ? (
          // <Text className="text-white text-lg text-center">Loading...</Text>
          <ActivityIndicator
            size="large"
            color="#e5e5e7ff"
            className="mt-16 self-center"
          />
        ) : moviesError ? (
          <Text
            className="text-red-500 text-lg text-center"
          >Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search movies, TV shows..."
            />
                
            <>
              <Text className="text-white text-2xl font-bold mb-8 mt-16">Trending Movies</Text>
            </>
            
            <FlatList
              data={movies?.results}
              renderItem={({ item }) => (
                <MovieCard
                  { ...item } />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 4,
                // paddingRight: 4,
                marginBottom: 16
              }}
              className="mt-4 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
        
      </ScrollView>
    </View>
  );
}
