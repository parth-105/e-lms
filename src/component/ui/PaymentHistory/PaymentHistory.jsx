"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, CreditCard, Download, FileText, Search } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PaymentHistory() {
    const [searchQuery, setSearchQuery] = useState("")
    const [paymentHistory, setPaymentHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalSpent, setTotalSpent] = useState(0)
    const [timePeriod, setTimePeriod] = useState("all-time")

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/payment-history')

                if (!response.ok) {
                    throw new Error('Failed to fetch payment history')
                }

                const data = await response.json()

                if (data.success) {
                    setPaymentHistory(data.data)
                    setTotalSpent(data.totalSpent)
                } else {
                    throw new Error(data.message || 'Failed to fetch payment history')
                }
            } catch (err) {
                //console.error('Error fetching payment history:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPaymentHistory()
    }, [])

    // Remove duplicates based on courseName and sum the amounts
    const getUniquePayments = (payments) => {
        const seenCourses = new Set()
        return payments.filter(payment => {
            if (!seenCourses.has(payment.courseName)) {
                seenCourses.add(payment.courseName)
                return true
            }
            return false
        })
    }

    const filterPayments = () => {
        let filtered = paymentHistory.filter(
            (payment) =>
                payment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.invoice.toLowerCase().includes(searchQuery.toLowerCase())
        )

        // Apply time period filter
        if (timePeriod !== "all-time") {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

            if (timePeriod === "this-month") {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
                filtered = filtered.filter(payment => {
                    const paymentDate = new Date(payment.purchaseDate)
                    return paymentDate >= startOfMonth && paymentDate <= now
                })
            } else if (timePeriod === "last-month") {
                const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
                filtered = filtered.filter(payment => {
                    const paymentDate = new Date(payment.purchaseDate)
                    return paymentDate >= startOfLastMonth && paymentDate <= endOfLastMonth
                })
            } else if (timePeriod === "this-year") {
                const startOfYear = new Date(now.getFullYear(), 0, 1)
                filtered = filtered.filter(payment => {
                    const paymentDate = new Date(payment.purchaseDate)
                    return paymentDate >= startOfYear && paymentDate <= now
                })
            }
        }

        return filtered
    }

    const filteredPayments = filterPayments()

    // Get unique payments
    const uniquePayments = getUniquePayments(filteredPayments)

    // Calculate total spent on unique payments
    const filteredTotalSpent = uniquePayments.reduce((sum, payment) => sum + payment.amount, 0)

    // Format date to be more readable
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    }

    // Handle export function
    const handleExport = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Invoice,Course,Purchase Date,Amount,Status\n";

        uniquePayments.forEach(payment => {
            csvContent += `${payment.invoice},${payment.courseName},${formatDate(payment.purchaseDate)},${payment.amount},${payment.status}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "payment_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
                    <p className="text-muted-foreground">View all your course purchases and payment details.</p>
                </div>
                {/* <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
                    <Download className="h-4 w-4" />
                    Export History
                </Button> */}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <CardTitle>Purchase Records</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search courses or invoices..."
                                    className="pl-8 w-full sm:w-[250px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={timePeriod} onValueChange={setTimePeriod}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-time">All Time</SelectItem>
                                    <SelectItem value="this-month">This Month</SelectItem>
                                    <SelectItem value="last-month">Last Month</SelectItem>
                                    <SelectItem value="this-year">This Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                            <p className="mt-2 text-muted-foreground">Loading payment history...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">
                            <p>Error: {error}</p>
                        </div>
                    ) : (
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Course</TableHead>
                                        <TableHead className="hidden md:table-cell">Purchase Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className="hidden md:table-cell">Status</TableHead>
                                        <TableHead className="text-right">Invoice</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {uniquePayments.length > 0 ? (
                                        uniquePayments.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={payment?.courseImage}
                                                            alt={payment?.courseName}
                                                            width={40}
                                                            height={40}
                                                            className="w-[40px] h-[40px] object-cover rounded-md"
                                                        />
                                                        <span className="font-medium">{payment?.courseName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                        {formatDate(payment?.purchaseDate)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                                                    >
                                                        {payment?.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                                                        <FileText className="h-3.5 w-3.5" />
                                                        <span className="hidden sm:inline">{payment?.invoice}</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                                No payment records found matching your search.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>Payment method: Credit Card</span>
                    </div>
                    <div className="font-medium text-lg mt-2 sm:mt-0">
                        Total Spent: <span className="text-primary">${filteredTotalSpent?.toFixed(2)}</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
