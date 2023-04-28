import type ProductType from './ProductType';

type Params = {
  id: string;
};

type SearchParams = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  currency: string;
  features: string;
};

type QueryType = {
  params: Params;
  searchParams: SearchParams;
};

export default QueryType;
