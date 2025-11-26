import { MongoClient, ObjectId, type Collection } from "mongodb";

export type CustomerLead = {
  _id?: ObjectId;
  customerName: string;
  phoneNumber: string;
  product?: string | null;
  createdAt: Date;
};

const uri = process.env.MONGODB_URI;
const collectionName = "customerLeads";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

const clientPromise =
  process.env.NODE_ENV === "development"
    ? (global._mongoClientPromise ??= client.connect())
    : client.connect();

export async function getCustomerLeadCollection(): Promise<Collection<CustomerLead>> {
  const connectedClient = await clientPromise;
  return connectedClient.db().collection<CustomerLead>(collectionName);
}

