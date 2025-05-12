export interface Logo {
  name: string;
  slug: string;
  hex: string;
  svgFilePath: string;
  pngFilePath: string;
  id?: string;
  description?: string;
  category?: string;
  tags?: string[];
  license?: string;
  created?: string;
  updated?: string;
}

export interface Category {
  id: string
  name: string
}
