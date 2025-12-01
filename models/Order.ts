import mongoose, { Schema, model, models } from 'mongoose';

const PartySchema = new Schema({
  name: String,
  email: String,
  address: String,
});

const HistorySchema = new Schema({
  locationName: String,
  locationStatus: String,
  updatedAt: Date,
});

const ParcelSchema = new Schema({
  deliveryMode: String,
  packageDescription: String,
  totalWeight: String,
  origin: String,
  destination: String,
  expectedPickupDate: Date,
});

const OrderSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, index: true }, // e.g. 1090 or ATV... whichever you want
    status: { type: String, default: 'CREATED' },
    sender: PartySchema,
    receiver: PartySchema,
    parcel: ParcelSchema,
    history: [HistorySchema],
    additionalInfo: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default models.Order || model('Order', OrderSchema);
