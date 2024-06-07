// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if you wan to use different HTTP methods in the same route use this method
  // if (req.method === "POST") {
  //   // Process a POST request
  // } else if (req.method === "PUT") {
  //   // Process a DELETE request
  // } else {
  //   // Handle any other HTTP method
  // }

  res.status(200).json({ name: "John Doe" });
}
