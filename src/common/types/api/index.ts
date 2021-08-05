export type ApiResponse<T> = {
  data: T;
};

export type User = {
  id: string;
  title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '';
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  gender?: 'male' | 'female' | 'other' | '';
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  location?: Location;
};

export type Location = {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
};

export type Post = {
  id: string;
  appId?: string;
  text?: string;
  image?: string;
  likes: number;
  link?: string | null;
  tags: string[];
  publishDate: string;
  updatedAt?: string;
  owner: User;
};

export type Comment = {
  id: string;
  message: string;
  owner: User;
  publishDate: string;
};

export type Tag = {
  title: string;
};
