export interface VideoConfig {
  sourceType: 'url' | 'file';
  url: string;
  file?: File | null;
}