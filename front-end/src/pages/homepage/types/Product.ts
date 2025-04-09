export interface Product {
	id: string;
	name: string;
	price: number;
	discountPrice?: number;
	imageUrl: string;
	rating: number;
	category: string;
	isNew?: boolean;
  }