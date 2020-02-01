import DictionaryItemDto from './DictionaryItemDto';

export interface UserCreateDto {
    userDto?: UserDto;
    password?: string;
    birthDate?: string;
  }
  
  export interface UserDto {
    id?: number;
    name?: string;
    displayName?: string;
    birthDate?: string;
    gender?: string;
    avatar?: string;
  }
  
  
  
  export interface UserDetailsDto {
    userId?: number;
    width?: number;
    heigth?: number;
    region?: string;
    city?: string;
    tatoos?: string;
    eyesColor?: number;
    hairColor?: number;
    interests?: number[];
    dictionaryValues?: UserDictionaryValues;
    avatarImage?: string;
    AvatarContentType?: string;
  }
  
  export interface UserDictionaryValues {
    eyesColor?: DictionaryItemDto;
    hairColor?: DictionaryItemDto;
    interest?: DictionaryItemDto[];
  }
  
  export interface UserFullDto {
    basic: UserDto;
    details: UserDetailsDto;
  }
  
  export interface UserAvatarDto {
    userId?: number;
    base64Content?: string;
    contentType: string;
  }