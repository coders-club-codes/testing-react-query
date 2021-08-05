export const ENV = process.env;

export const IS_DEV = ENV.NODE_ENV === 'development';

export const IS_PROD = ENV.NODE_ENV === 'production';
