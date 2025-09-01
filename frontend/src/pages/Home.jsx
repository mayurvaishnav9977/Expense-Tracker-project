import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess ,APIUrl } from "./util";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpenseTable";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseTrackerForm from "./ExpenseTrackerForm";



function Home(){
    const [loggedInUser,setLoggedInUser]=useState('');
    const [expenses , setExpenses]= useState([]);

    const [ expenseAmt, setExpenseAmt ] = useState(0);
    const [ incomeAmt, setIncomeAmt ] = useState(0);

    const navigate =useNavigate();
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

useEffect(()=>{
    const amounts = expenses.map((item)=> item.amount);
    console.log(amounts);

    const income = amounts.filter( item => item>0 )
    .reduce((acc, item)=>(acc += item),0)
    console.log('income : ',income)

    const exp = amounts.filter( item => item<0 )
    .reduce((acc, item)=>(acc += item),0) * -1;
    console.log('expense',exp);

    setIncomeAmt(income);
    setExpenseAmt(exp)
},[expenses])

    const handleLogout= (e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess(`${loggedInUser} Loggedout Successfully`)
        setTimeout(()=>{
            navigate('/login');
        },1000)

    }

    const fetchExpenses = async()=>{
        try{
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers : {
                   'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            }
            const response = await fetch(url,headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
             setExpenses(result.data);

        }catch(err){
            handleError(err);
        }
    }
     const addExpenses = async(data)=>{
        try{
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type' : 'application/json'
                },
                method : "POST",
                body : JSON.stringify(data)
            }
            const response = await fetch(url,headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
             setExpenses(result.data);
             handleSuccess(result.message);

        }catch(err){
            handleError(err);
        }
    }



    useEffect(()=>{
        fetchExpenses()
    },[]);

    const handleDeleteExpense =async (expenseId)=>{
        try{
            const url = `${APIUrl}/expenses/${expenseId}`;
            const headers = {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type' : 'application/json'
                },
                method : "DELETE",
              
            }
            const response = await fetch(url,headers);
            if(response.status === 403){
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
             setExpenses(result.data);
             handleSuccess(result.message);

        }catch(err){
            handleError(err);
        } 
    }
    return(
        <div>
            

            <div className="user-section">

            <h1>Hello {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
            </div>
         
         <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
         <ExpenseTrackerForm addExpenses={addExpenses}/>
         <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>
        <ToastContainer/>
        </div>
    )
}
export default Home;