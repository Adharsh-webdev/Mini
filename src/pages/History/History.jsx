import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import "./History.css";



const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const savedTx =
      JSON.parse(localStorage.getItem(`tx_${user.id}`)) || [];
    setTransactions(savedTx);
  }, []);

  return (
    <Box className="history-container">
      <Typography variant="h4" fontWeight="bold">
        Account History
      </Typography>

      <Typography className="history-subtitle">
        A complete record of all your inbound and outbound transactions.
      </Typography>

      <Card className="history-card">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="history-head">
                <TableCell>REFERENCE</TableCell>
                <TableCell>TYPE</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell align="right">AMOUNT</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.reference}</TableCell>

                    {/* 🔴 Withdraw = Red | 🟢 Deposit = Green */}
                    <TableCell>
                      <Chip
                        label={tx.type.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor:
                            tx.type === "withdraw"
                              ? "#ffebee"
                              : "#e8f5e9",
                          color:
                            tx.type === "withdraw"
                              ? "#c62828"
                              : "#2e7d32",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>

                    <TableCell>{tx.date}</TableCell>

                    <TableCell
                      align="right"
                      className={
                        tx.type === "deposit"
                          ? "amount positive"
                          : "amount negative"
                      }
                    >
                      {tx.type === "deposit" ? "+" : "-"}₹{tx.amount}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default History;
