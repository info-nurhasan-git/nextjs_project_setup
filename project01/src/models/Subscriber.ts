import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
  },
  { timestamps: true }
);

export type SubscriberDoc = InferSchemaType<typeof SubscriberSchema> & {
  _id: unknown;
};

const Subscriber: Model<SubscriberDoc> =
  (models.Subscriber as Model<SubscriberDoc>) ||
  model<SubscriberDoc>("Subscriber", SubscriberSchema);

export default Subscriber;
