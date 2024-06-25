const express = require("express");
const jwt = require("jsonwebtoken");
const { signupSchema, signinSchema, updateSchema } = require("../Zod/zod");
const { User, Account } = require("../DB/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../Middlewares/middleware");
const router = express.Router();

//SignUp

router.post("/signup", async (req, res) => {
  const createPayLoad = req.body;
  const response = signupSchema.safeParse(createPayLoad);
  if (!response.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const check = User.find({ username: createPayLoad.username });
  if (check._id) {
    res.status(411).json({
      message: "Email already taken",
    });
    return;
  }

  const user = await User.create(createPayLoad);
  const account = await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

//SignIn

router.post("/signin", async (req, res) => {
  const createPayLoad = req.body;

  const { success } = signinSchema.safeParse(createPayLoad);
  if (!success) {
    res.json({
      message: "Invalid Inputs",
    });
    return;
  }

  try {
    const check = await User.findOne(createPayLoad);

    if (check) {
      const tokenjwt = jwt.sign({ userId: check._id }, JWT_SECRET);
      res.status(200).json({
        token: tokenjwt,
      });
      return;
    }
  } catch (e) {
    res.status(411).json({
      message: "Some Error Occurred while logging",
    });
  }

  res.status(411).json({
    message: "User Not Found!",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { password, firstName, lastName } = req.body;
  const userId = req.userId;

  const updateData = {};
  if (password) updateData.password = password;
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;

  const response = updateSchema.safeParse(updateData);

  if (!response.success) {
    res.status(411).json({
      message: "Invalid Update Inputs",
    });
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "No data found to be Updated",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User Updated Successfully",
    });
  } catch (e) {
    res.status(411).json({
      message: "Error occurred while updating",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  //To find names with substrings also
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  const userId = req.userId;
  const filteredUsers = users.filter((user) => user._id != userId);

  res.json({
    user: filteredUsers.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
