import mongoose from 'mongoose';

interface CustomerAttrs {
  document: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

interface CustomerDoc extends mongoose.Document {
  document: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  avatar: string;
}

const customerSchema = new mongoose.Schema(
  {
    document: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    avatar: String
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

customerSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
});

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  'Customer',
  customerSchema
);

export { Customer };
