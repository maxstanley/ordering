import { Document } from 'mongoose';

interface Product extends Document {
  ID: string;
  name: string;
  Category: string;
  measures: {
    [measure: string]: string;
  };
};

export default Product;