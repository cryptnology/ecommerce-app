type MetadataType = {
  features: string;
};

type ProductType = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  currency: string;
  metadata: MetadataType;
};

export default ProductType;
