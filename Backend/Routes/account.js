const express = require("express");
const { authMiddleware } = require("../Middlewares/middleware");
const { Account } = require("../DB/db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const userBalance = await Account.findOne({ userId: userId });
  res.json({
    Balance: userBalance.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // implement transfer logic here

  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;

  const fromUser = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!fromUser || fromUser.balance < amount) {
    await session.abortTransaction();
    return res.status(411).json({
      message: "Insufficient Balance",
    });
  }

  const toUser = await Account.findOne({ userId: to }).session(session);

  if (!toUser) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "User Does not Exist",
    });
  }

  //Performed the Transaction
  await Account.findOneAndUpdate(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.findOneAndUpdate(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //Commit the Transaction
  await session.commitTransaction();
  session.endSession();

  res.json({
    message: "Transfer Successfull",
  });
});

module.exports = router;
