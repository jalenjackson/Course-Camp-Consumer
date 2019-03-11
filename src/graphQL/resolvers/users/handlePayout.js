"use strict";
const paypal = require('paypal-rest-sdk');
const User = require('../../../models/user');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AUrNeHL0ufYL56Ymq1Bcuun1KzKRA1HfE6HOZ-3ID-bVxMoofQ4-y0Yg9G-lY8shrtCVCuSM9smWIGxs',
  'client_secret': 'EMS_iHv_wuO5mt83bIEiCG76bntoszaUZWIyMD72S5WG5sWzDdhRnMyQhf47zMBCfVoe7N8ZZt8MnbPp'
});

exports.handlePayout = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    if (+args.amount <= +user.moneyMade) {
  
      let sender_batch_id = Math.random().toString(36).substring(9);
  
      let create_payout_json = {
        "sender_batch_header": {
          "sender_batch_id": sender_batch_id,
          "email_subject": "Your Course Camp funds were transferred successfully"
        },
        "items": [
          {
            "recipient_type": "EMAIL",
            "amount": {
              "value": args.amount,
              "currency": "USD"
            },
            "receiver": args.receiver,
            "note": `You requested $${args.amount} to be transferred from your Course Camp account to this PayPal account.`,
          }
        ]
      };
  
      let sync_mode = 'false';
  
      return paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
        if (error) {
          throw error;
        } else {
          const payoutHistory = {
            payoutBatchId: payout.batch_header.payout_batch_id,
            amount: args.amount,
            emailAddressReceiver: args.receiver
          };
      
          const user = await User.findById(req.userId);
          const tmpPayoutHistory = user.payoutHistory;
          tmpPayoutHistory.push(payoutHistory);
      
          const newMoneyMadeAmount = +user.moneyMade - +args.amount;
      
          user.payoutHistory = tmpPayoutHistory;
          user.moneyMade = newMoneyMadeAmount;
          await user.save();
      
          return {};
        }
      });
    } else {
      throw 'Error'
    }
  } catch (e) {
    throw e;
  }
};
