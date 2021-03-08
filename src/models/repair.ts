import mongoose from 'mongoose';

interface RepairAttrs {
  type: string;
  description: string;
}

interface RepairModel extends mongoose.Model<RepairDoc> {
  build(attrs: RepairAttrs): RepairDoc;
}

interface RepairDoc extends mongoose.Document {
  type: string;
  description: string;
  status: string;
}

const repairSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    totalAmount: Number,
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

repairSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
});

repairSchema.statics.build = (attrs: RepairAttrs) => {
  return new Repair(attrs);
};

const Repair = mongoose.model<RepairDoc, RepairModel>('Repair', repairSchema);

export { Repair };
