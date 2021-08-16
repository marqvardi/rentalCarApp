import { CLOUDINARY_SECRET } from "../keys";

const cloudinary = require("cloudinary").v2;

// export default async (_req, res) => {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const signature = await cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp,
//     },
//     CLOUDINARY_SECRET
//   );

//   res.statusCode = 200;
//   res.json({ signature, timestamp });
// };

export const sign = async () => {
  const timestamp = Math.round(new Date() / 1000);
  const params = {
    timestamp: timestamp,
  };
  const signature = await cloudinary.utils.api_sign_request(
    params,
    CLOUDINARY_SECRET
  );
  console.log(signature);
  return { timestamp, signature };
};
