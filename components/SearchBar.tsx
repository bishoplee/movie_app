import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View
      className='flex-row bg-white rounded-[8px] items-center px-1 py-1 pl-4 mb-2 mx-[-8px]'
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
        className='flex-1 ml-4 text-dark-300 bg-light-100 rounded-[4px] px-2 py-2 text-base'
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchBar