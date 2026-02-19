import React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './userDashboard.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';



import logoo from "../../assets/Logo/Goldcoin.png";
import { useState, useEffect } from 'react';

const UserDashBoard = () => {
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState("");
    const [reference, setReference] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState({ amount: "", balance: "" });

    /* Load user + transactions */
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setUser(currentUser);

            const savedTx =
                JSON.parse(localStorage.getItem(`tx_${currentUser.id}`)) || [];
            setTransactions(savedTx);
        }
    }, []);

    /* Save transaction */
    const addTransaction = (type, amt, ref) => {
        if (!user) return;

        const newTx = {
            id: Date.now(),
            type,
            amount: Number(amt),
            reference: ref || type.toUpperCase(),
            date: new Date().toLocaleDateString("en-IN"),
        };

        const updatedTx = [newTx, ...transactions];
        setTransactions(updatedTx);
        localStorage.setItem(`tx_${user.id}`, JSON.stringify(updatedTx));
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setError({ amount: "", balance: "" });
    };

    const handleReferenceChange = (e) => {
        setReference(e.target.value);
    };

    const handleDeposit = (e) => {
        e.preventDefault();
        if (!user) return;

        if (!amount || Number(amount) <= 0) {
            setError({ amount: "Enter valid amount", balance: "" });
            return;
        }

        const updatedUser = {
            ...user,
            amount: Number(user.amount) + Number(amount),
        };

        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const updatedAccounts = accounts.map(acc =>
            acc.id === user.id ? updatedUser : acc
        );

        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setUser(updatedUser);
        addTransaction("deposit", amount, reference);
        setAmount("");
        setReference("");
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        if (!user) return;

        if (!amount || Number(amount) <= 0) {
            setError({ amount: "Enter valid amount", balance: "" });
            return;
        }

        if (Number(amount) > Number(user.amount)) {
            setError({ amount: "", balance: "Insufficient balance" });
            return;
        }

        const updatedUser = {
            ...user,
            amount: Number(user.amount) - Number(amount),
        };

        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const updatedAccounts = accounts.map(acc =>
            acc.id === user.id ? updatedUser : acc
        );

        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setUser(updatedUser);
        addTransaction("withdraw", amount, reference);
        setAmount("");
        setReference("");
    };

    return (
        <>
            <div className="userdash-container">
                <div className="user-content">
                    <p className='userdash-name'>welcome,{user ? user?.fullname : "User"}</p>
                    <p>Your Finance are loooking healthy today</p>
                </div>
                <div className="userdash-card">
                    <div className="userdash-card1">

                        <div className="userdash-first">
                            <p className='user-p'>TOTAL AVAILABLE BALANCE :</p>
                            <h3 className='userdash-h3'> <CurrencyRupeeIcon sx={{ fontSize: "24px" }} /> {user ? user?.amount : "0"} </h3>
                        </div>
                        <div className="userdash-box">
                            <div className="user-accno">
                                <p className='user-acc'>ACCOUNT NUMBER</p>
                                <p className='user-accno'>{user?.accountNumber ? user.accountNumber.match(/.{1,4}/g).join("-") : ""}</p>
                            </div>


                            <div className="userdash-image">
                                <img src={logoo} alt="gold" />
                            </div>
                        </div>

                    </div>
                    <div className="userdash-card2">
                        <h3>Transfer Funds</h3>
                        <form action="">
                            <div className="userdash-input1">
                                <CurrencyRupeeIcon className='rupeeicon' sx={{ fontSize: "15px" }} />
                                <input type="number" placeholder='0.00' required onChange={handleAmountChange} value={amount} />
                            </div>
                            <div className="userdash-input2">
                                <input type="text" name="" id="" placeholder='Ref (e.g. Salary, Rent)' onChange={handleReferenceChange} value={reference} />
                            </div>
                            {(error.amount || error.balance) && (
                                <p className="error-text">
                                    {error.amount || error.balance}
                                </p>
                            )}
                            <div className="userdash-button">
                                <button type='button' onClick={handleDeposit} className='deposit-btn'><AddIcon sx={{ fontSize: "15px" }} /> Deposit</button>
                                <button type='button' onClick={handleWithdraw} className='withdraw-btn'><RemoveIcon sx={{ fontSize: "15px" }} /> Withdraw</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="activity-card">
                    <div className="activity-header">
                        <h3>Recent Activity</h3>
                        <span className="live">LIVE</span>
                    </div>

                    <div className="activity-table">
                        <div className="table-head">
                            <span>TRANSACTION</span>
                            <span>DATE</span>
                            <span>AMOUNT</span>
                        </div>

                        {transactions.length === 0 ? (
                            <p className="no-activity">No recent activity</p>
                        ) : (
                            transactions.map(tx => (
                                <div className="table-row" key={tx.id}>
                                    <div className="transaction">
                                        <div className={`icon-circle ${tx.type === "withdraw" ? "withdraw" : "deposit"}`}>
                                            <ArrowUpwardIcon
                                                className="arrow-i"
                                                style={{
                                                    transform: tx.type === "withdraw" ? "rotate(180deg)" : "none",
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <p>{tx.reference}</p>
                                            <small>{tx.type.toUpperCase()}</small>
                                        </div>
                                    </div>

                                    <span>{tx.date}</span>

                                    <span
                                        className={
                                            tx.type === "deposit"
                                                ? "amount positive"
                                                : "amount negative"
                                        }
                                    >
                                        {tx.type === "deposit" ? "+" : "-"}₹
                                        {tx.amount}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserDashBoard
