import { NextApiRequest, NextApiResponse } from "next";

const MongoClient = require("mongodb").MongoClient;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
  const result = await getOneFilm(String(req.query.link), res);
  res.json(result);
}

async function getOneFilm(link: string, res: NextApiResponse) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  }).catch((err: unknown) => {
    console.log(err);
  });
  try {
    const db = client.db(dbName);
    const data = await db
      .collection(collectionName)
      .find({ link: link })
      .toArray();
    console.log("get one film return data");
    return data[0];
  } catch (error) {
    console.log(error, "get one film error");
    return error;
  } finally {
    console.log("get one film close connn");
    client.close();
  }
}
