#! /usr/bin/env node
import inquirer from "inquirer";
// Main function
let main = async () => {
    let userID = "dx2y";
    let userPin = "0000";
    let currentBalance = 10000;
    //Withdraw balance update
    let balanceWithdraw = (currentBalance, amount) => {
        currentBalance -= amount;
        console.log(`You have withdrawn $${amount} \n (Your remaining balance is $${currentBalance})`);
    };
    // Welcome Message
    console.log("\n >>>> Welcome to ATM <<<<\n");
    let userData = await inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter your ID",
        },
        {
            name: "pin",
            type: "password",
            mask: "*",
            message: "Please enter your pin number",
        },
    ]);
    let { id, pin } = userData;
    if (id === userID && pin === userPin) {
        func(currentBalance, balanceWithdraw);
    }
    else {
        console.log("\n Invalid ID or PIN");
    }
};
// ATM functionality
let func = async (currentBalance, balanceWithdraw) => {
    // condition for continuing transactions
    //   let programRestart: boolean = false;
    // Login Message
    console.log("\n Login Successful\n");
    let atmFunctionality = await inquirer.prompt({
        name: "choice",
        type: "list",
        message: "Please select the operation to perform ",
        choices: ["Balance Inquiry", "Cash Withdrawal", "Fast Cash", "Exit"],
    });
    let { choice } = atmFunctionality;
    //  functionality checks
    if (choice === "Balance Inquiry") {
        console.log(`Your current Balacne is $${currentBalance}\n`);
    }
    else if (choice === "Cash Withdrawal") {
        let withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Please enter the amount to withdraw: $",
        });
        let { amount } = withdrawAmount;
        if (amount <= currentBalance) {
            balanceWithdraw(currentBalance, amount);
        }
        else {
            console.log("\n Insufficient Balance\n");
        }
    }
    else if (choice === "Fast Cash") {
        fastCash(currentBalance, balanceWithdraw);
    }
    else {
        console.log("Thank you for using ATM\n");
    }
};
// Fast Cash FUnctionality
let fastCash = async (currentBalance, balanceWithdraw) => {
    console.log("\n Fast Cash Service\n");
    let fastCashAmount = await inquirer.prompt({
        name: "fastAmount",
        type: "list",
        message: "Please select the amount to withdraw: ",
        choices: ["$20", "$50", "$100", "$200", "$500"],
    });
    let { fastAmount } = fastCashAmount;
    if (fastAmount === "$20") {
        balanceWithdraw(currentBalance, 20);
    }
    else if (fastAmount === "$50") {
        balanceWithdraw(currentBalance, 50);
    }
    else if (fastAmount === "$100") {
        balanceWithdraw(currentBalance, 100);
    }
    else if (fastAmount === "$200") {
        balanceWithdraw(currentBalance, 200);
    }
    else if (fastAmount === "$500") {
        balanceWithdraw(currentBalance, 500);
    }
};
main();