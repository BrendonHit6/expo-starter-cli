export interface IAppConfigInterface {
  apiUrl: string;
  appVersion: string;
  environment: 'development' | 'staging' | 'production';
}
