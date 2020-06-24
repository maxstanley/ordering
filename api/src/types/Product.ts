import { Document } from 'mongoose';

interface Product extends Document {
  ID: string;
  Name: string;
  Category: string;
  Measures: {
    [measure: string]: string;
  };
};

export default Product;