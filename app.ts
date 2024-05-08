import { faker } from "@faker-js/faker";
import inquirer from "inquirer";

class Customer{
      fName:string; lName:string; age:number;
      gender:string; mobNum:string; acctNum:number
      constructor(fName:string, lName:string, age:number,
        gender:string, mobNum:string, acctNum:number){
       this.fName=fName; this.lName=lName; this.age=age;
       this.gender=gender; this.mobNum=mobNum; this.acctNum=acctNum
      }     
}
interface BankAccount{
    acctNum: number
    balance:number
}
class Bank{
      customers:Customer[]=[]
      account:BankAccount[]=[]

      addCustomers(obj:Customer){
        this.customers.push(obj)
      }
      addAccount(obj:BankAccount){
        this.account.push(obj)
      }
      transiction(obj:BankAccount){
        let newAcnt= this.account.filter(val=>val.acctNum !==  obj.acctNum)
        this.account= [...newAcnt, obj]  
      }
    
      }


let myBank= new Bank;


for(let i=1; i<6; i++){
    let fName= faker.person.firstName("male")
    let lName=faker.person.lastName()
    let age= Math.floor(Math.random()* 60 + 18)
    let gender="Male"
    let mobNum= faker.phone.number()

    let cusTomer= new Customer(fName,lName,age,gender,mobNum,1000 + i)
    myBank.addCustomers(cusTomer)

    let accounT:BankAccount= {acctNum:cusTomer.acctNum,balance: 100 * i}
     myBank.addAccount(accounT)
}


async function BankService(myBank:Bank) {
  while(true) {
    let user= await inquirer.prompt({
      name:"option", message: "Which action you want to perfom",
      type:"list", choices:["Veiw Balance","Cash Deposit","Cash WithDraw","Exit"]
    })
    if(user.option == "Veiw Balance"){
      let choice= await inquirer.prompt({
        name:"pin", message: "Kindly Enter Your Account Number :",
      type:"number"
      })
      let cust= myBank.customers.find(val=> val.acctNum == choice.pin)
      let acct= myBank.account.find(val=>val.acctNum == cust?.acctNum)
      if(cust){
        console.log(`${cust.fName} ${cust.lName} your balance is ${acct?.balance}`)
      }
      else{
        console.log("Customer Does not exist")
      }
    }

    if(user.option == "Cash Deposit"){
      let choice= await inquirer.prompt({
        name:"pin", message: "Kindly Enter Your Account :",
      type:"number"
      })
      let accOunt=myBank.account.find(val=> val.acctNum == choice.pin)
      if(accOunt)  {
        let money= await inquirer.prompt({
          name:"select", message: "Kindly enter the amount to be Deposited :",
        type:"number"
        })
          let cusTomer= myBank.customers.find(val=>val.acctNum == accOunt.acctNum)
          let newBalance = accOunt.balance + money.select

          myBank.transiction({acctNum:accOunt.acctNum,balance:newBalance})
          console.log(`${cusTomer?.fName} ${cusTomer?.lName} your balnce is ${newBalance}`) 
      }
      
      else
      {
        console.log("Customer Does not exist")
      }
    }

    if(user.option == "Cash WithDraw"){
      let choice= await inquirer.prompt({
        name:"pin", message: "Kindly Enter Your Account :",
      type:"number"
      })
        let accOunt= myBank.account.find(val=>val.acctNum == choice.pin)
      
      if(accOunt){
        let money= await inquirer.prompt({
          name:"select", message: "Kindly enter the amount to be Withdrawn :",
        type:"number"
        })
        let cust= myBank.customers.find(val=> val.acctNum == accOunt.acctNum)
        if(accOunt.balance> money.select) {
        let newBalance= accOunt.balance - money.select
           
        myBank.transiction({acctNum:accOunt.acctNum,balance:newBalance})
        console.log(`${cust?.fName} ${cust?.lName} your balnce is ${newBalance}`) }
        else {console.log("Insufficent Balance")}
      
      }
      else{
        console.log("Customer Does not exist")
      }
    }


    if(user.option == "Exit"){
          break;
    }
  }

}

BankService(myBank)
