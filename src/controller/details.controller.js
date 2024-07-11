import { details } from "../model/details.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";

//Generates random number
const generateRandomNum = async () => {
  const min = 100000;
  const max = 999999;

  const rand1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const rand2 = Math.floor(Math.random() * (max - min + 1)) + min;

  const str1 = rand1.toString();
  const str2 = rand2.toString();

  const concatenatedStr = str1 + str2;

  const concatenatedNumber = parseInt(concatenatedStr, 10);

  const existingNumber = await details.findOne({ concatenatedNumber });

  if (existingNumber) {
    /* return res.status(409).json({ error: "Number already exist" }); */
    generateRandomNum();
  } else {
    return concatenatedNumber;
  }
};

//Stores Details in database
const storeDetails = async (req, res) => {
  console.log("Details Received");

  const { name, email, dob, gender, address, phone_no } = req.body;

  console.log(name, email, dob, gender, address, phone_no);

  if (
    [name, email, dob, gender, address, phone_no].every(
      (field) => field && field.trim() === ""
    )
  ) {
    return res.status(400).json({ error: "All fields reuqired" });
  }

  try {
    const existingUser = await details.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const unique_no = await generateRandomNum();

    const photolocalpath = req.files?.photo[0]?.path;

    console.log(photolocalpath);

    if (!photolocalpath) {
      return res.status(400).json({ error: "Photo not found" });
    }

    const photo = await uploadOncloudinary(photolocalpath);

    if (!photo) {
      return res
        .status(400)
        .json({ error: "Error uploading photo to cloudinary" });
    }

    const newDetail = await details.create({
      name,
      email,
      dob,
      gender,
      address,
      phone_no,
      unique_no,
      photo: photo.url,
    });

    return res.status(200).json({
      status: true,
      data: newDetail,
      message: "Details Submitted",
    });
  } catch (error) {
    console.error("Error submitting details : ", error);
    return res.status(500).json({
      error: "Error submitting details",
    });
  }
};

//Retrieve details from database
const getDetails = async (req, res) => {
  console.log("All details");
  try {
    const details_get = await details.find({});
    //console.log(details_get);
    return res.status(200).json({
      status: true,
      data: details_get,
      message: "All data sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export { storeDetails, getDetails };
