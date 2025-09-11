import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  onPress?: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: Props) => {
  return (
    <View
      className='flex-row bg-dark-200 rounded-full items-center px-5 py-4 mb-2'
    >
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor={'#ab8bff'}
      />  
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#a8b5db'}
        className='flex-1 ml-2 text-white'
        value=''
        onPress={onPress}
        onChangeText={() => { }}
      />
    </View>
  )
}

export default SearchBar