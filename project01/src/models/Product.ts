import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, default: 0, min: 0 },
    discountPrice: { type: Number, default: null, min: 0 },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    category: { type: String, default: "General", index: true },
    categorySlug: { type: String, default: "general", index: true },
    brand: { type: String, default: "ShopZone" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isNew: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export type ProductDoc = InferSchemaType<typeof ProductSchema> & {
  _id: unknown;
  createdAt: Date;
  updatedAt: Date;
};

const Product: Model<ProductDoc> =
  (models.Product as Model<ProductDoc>) ||
  model<ProductDoc>("Product", ProductSchema);

export default Product;
