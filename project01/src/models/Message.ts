import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type MessageDoc = InferSchemaType<typeof MessageSchema> & {
  _id: unknown;
  createdAt: Date;
  updatedAt: Date;
};

const Message: Model<MessageDoc> =
  (models.Message as Model<MessageDoc>) ||
  model<MessageDoc>("Message", MessageSchema);

export default Message;
