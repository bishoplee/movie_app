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
          className="w-12 h-10 justify-center mt-20 mb-12 mx-auto"
        />

        <SearchBar
          onPress={() => router.push('/search')}
          placeholder="Search movies, TV shows..." value={""} onChangeText={function (text: string): void {
            throw new Error("Function not implemented.");
          }}
        />
    
        <View className="flex-row justify-between align-items-center mb-1 mt-8">
          <Text className="text-white text-2xl font-bold">Latest Movies</Text>
          <Link href="/search" asChild>
            <Text className="text-white text-lg font-sm">view all</Text>
          </Link>
        </View>
                
        {moviesLoading ? (
          // <Text className="text-white text-lg text-center">Loading...</Text>
          <ActivityIndicator
            size="large"
            color="#e5e5e7ff"
            className="mt-8 self-center"
          />
        ) : moviesError ? (
          <Text
            className="text-red-500 text-lg text-center"
          >Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-8">
            <FlatList
              data={movies?.results}
              renderItem={({ item }) => (
                <MovieCard
                  { ...item } />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'center',
                gap: 8,
                // paddingRight: 4,
                marginBottom: 16
              }}
              className="mt-1 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
        
      </ScrollView>
    </View>
  );
}
