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
  res.setHeader("Cache-Control", "max-age=0, s-maxage=3600");

  let page = Number(req.query.page);
  let perPage = Number(req.query.perPage);
  let sortBy = String(req.query.sortBy);

  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(perPage)) {
    perPage = 24;
  }

  const result = await getAll(page, perPage, sortBy);
  res.json(result);
}

async function getAll(page: number, perPage: number, sortBy: string) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  }).catch((err: unknown) => {
    console.log(err);
  });
  page = page - 1;
  const skip = page * perPage;
  try {
    const db = client.db(dbName);
    let data;
    if (sortBy === "latest") {
      data = await db
        .collection(collectionName)
        .find()
        .sort({ dateYearMonthDay: -1 })
        .skip(skip)
        .limit(perPage)
        .toArray();
    } else {
      data = await db
        .collection(collectionName)
        .find()
        .sort({ counter: -1 })
        .skip(skip)
        .limit(perPage)
        .toArray();
    }

    const counter = await db.collection(collectionName).countDocuments();

    console.log("all return data");
    return { data, counter };
  } catch (error) {
    console.log(error, "all error");
    return error;
  } finally {
    console.log("all close connection");
    client.close();
  }
}
