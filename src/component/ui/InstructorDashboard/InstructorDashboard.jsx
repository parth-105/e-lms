"use client"

import { useState, useEffect } from "react"
import { BarChart3, BookOpen, Calendar, ChevronDown, DollarSign, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function InstructorDashboard() {
  const [timePeriod, setTimePeriod] = useState("30days")
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalRevenue: 0,
      totalCourses: 0,
      totalStudents: 0,
      avgCompletion: 0,
      newEnrollments: 0,
      newCourses: 0
    },
    revenueData: [],
    coursePerformanceData: [],
    recentSalesData: []
  })
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null);
  //  const [instructorId , setinstructorId] = useState('');

  // More vibrant color palette
  const COLORS = {
    primary: "#4F46E5",
    secondary: "#10B981",
    accent1: "#F59E0B",
    accent2: "#EC4899",
    accent3: "#8B5CF6",
    accent4: "#06B6D4",
  }

  // useEffect(() => {
  //   // This code will only run on the client side
  //   const storedData = localStorage.getItem('e-learning-user');


  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);

  //     setUserData(parsedData);
  //     // setinstructorId(parsedData._id)
  //     // console.log("id",instructorId)
  //   }

  // }, []);

  // console.log('uid',userData?._id)
  // const instructorId = userData?._id


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Get instructor ID from localStorage or context
        // This would come from your authentication system
        //const instructorId = localStorage.getItem('instructorId') || '6715ea8922a843b90ea772b4'; // Fallback ID for demo

        // Get user data from localStorage
        const userDataString = localStorage.getItem('e-learning-user');
        let instructorId;

        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);

            // Check if user is instructor and get their ID
            if (userData._id) {
              instructorId = userData?._id;
            } else {
              console.error("User ID not found in localStorage");
              // Fallback ID for demo
             // instructorId = '66c9748dd9d4c04a339fe837';
            }
          } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
           // instructorId = '66c9748dd9d4c04a339fe837'; // Fallback ID
          }
        } else {
          console.error("User data not found in localStorage");
         // instructorId = '66c9748dd9d4c04a339fe837'; // Fallback ID
        }




        const response = await fetch('/api/instructor/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instructorId,
            timePeriod
          }),
        })

        const result = await response.json()

        if (result.success) {
          setDashboardData(result.data)
        } else {
          console.error("Failed to fetch dashboard data:", result.error)
          // Use fallback data when API fails
          setDashboardData({
            metrics: {
              totalRevenue: 12450,
              totalCourses: 8,
              totalStudents: 315,
              avgCompletion: 73.5,
              newEnrollments: 24,
              newCourses: 2
            },
            revenueData: generateFallbackRevenueData(timePeriod),
            coursePerformanceData: [
              { name: "Web Development", students: 120, revenue: 3600, completion: 78 },
              { name: "Data Science", students: 85, revenue: 2550, completion: 65 },
              { name: "UI/UX Design", students: 65, revenue: 1950, completion: 82 },
              { name: "Mobile App Dev", students: 45, revenue: 1350, completion: 70 },
            ],
            recentSalesData: [
              { id: "ORD-7352", course: "Web Development Bootcamp", date: "2023-06-20", amount: 99.99, student: "John Smith" },
              { id: "ORD-7353", course: "Data Science Fundamentals", date: "2023-06-19", amount: 89.99, student: "Emily Johnson" },
              { id: "ORD-7354", course: "UI/UX Design Masterclass", date: "2023-06-18", amount: 79.99, student: "Michael Brown" },
              { id: "ORD-7355", course: "Mobile App Development", date: "2023-06-17", amount: 94.99, student: "Sarah Davis" },
              { id: "ORD-7356", course: "Web Development Bootcamp", date: "2023-06-16", amount: 99.99, student: "David Wilson" },
            ]
          })
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Use fallback data on error
        setDashboardData({
          metrics: {
            totalRevenue: 12450,
            totalCourses: 8,
            totalStudents: 315,
            avgCompletion: 73.5,
            newEnrollments: 24,
            newCourses: 2
          },
          revenueData: generateFallbackRevenueData(timePeriod),
          coursePerformanceData: [
            { name: "Web Development", students: 120, revenue: 3600, completion: 78 },
            { name: "Data Science", students: 85, revenue: 2550, completion: 65 },
            { name: "UI/UX Design", students: 65, revenue: 1950, completion: 82 },
            { name: "Mobile App Dev", students: 45, revenue: 1350, completion: 70 },
          ],
          recentSalesData: [
            { id: "ORD-7352", course: "Web Development Bootcamp", date: "2023-06-20", amount: 99.99, student: "John Smith" },
            { id: "ORD-7353", course: "Data Science Fundamentals", date: "2023-06-19", amount: 89.99, student: "Emily Johnson" },
            { id: "ORD-7354", course: "UI/UX Design Masterclass", date: "2023-06-18", amount: 79.99, student: "Michael Brown" },
            { id: "ORD-7355", course: "Mobile App Development", date: "2023-06-17", amount: 94.99, student: "Sarah Davis" },
            { id: "ORD-7356", course: "Web Development Bootcamp", date: "2023-06-16", amount: 99.99, student: "David Wilson" },
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [timePeriod])

  // Fallback revenue data generator
  const generateFallbackRevenueData = (period) => {
    if (period === "7days") {
      return [
        { month: "Mon", revenue: 400 },
        { month: "Tue", revenue: 600 },
        { month: "Wed", revenue: 800 },
        { month: "Thu", revenue: 700 },
        { month: "Fri", revenue: 900 },
        { month: "Sat", revenue: 1100 },
        { month: "Sun", revenue: 950 },
      ]
    } else if (period === "30days") {
      return [
        { month: "Jan", revenue: 1200 },
        { month: "Feb", revenue: 1800 },
        { month: "Mar", revenue: 2400 },
        { month: "Apr", revenue: 2000 },
        { month: "May", revenue: 2800 },
        { month: "Jun", revenue: 3600 },
      ]
    } else if (period === "90days") {
      return [
        { month: "Jan", revenue: 1200 },
        { month: "Feb", revenue: 1800 },
        { month: "Mar", revenue: 2400 },
        { month: "Apr", revenue: 2000 },
        { month: "May", revenue: 2800 },
        { month: "Jun", revenue: 3600 },
        { month: "Jul", revenue: 3200 },
        { month: "Aug", revenue: 3800 },
        { month: "Sep", revenue: 4200 },
      ]
    }
    return []
  }

  // Handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period)
  }

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-lg font-semibold">EduLearn LMS</span>
        </div>
        <div className="flex-1"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="relative h-8 flex items-center gap-2">
              Instructor Profile
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header> */}
      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {timePeriod === "7days"
                    ? "Last 7 Days"
                    : timePeriod === "30days"
                      ? "Last 30 Days"
                      : timePeriod === "90days"
                        ? "Last 90 Days"
                        : timePeriod === "year"
                          ? "This Year"
                          : "All Time"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleTimePeriodChange("7days")}>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimePeriodChange("30days")}>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimePeriodChange("90days")}>Last 90 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimePeriodChange("year")}>This Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimePeriodChange("all")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardData.metrics.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.metrics.totalCourses}</div>
                <p className="text-xs text-muted-foreground">+{dashboardData.metrics.newCourses} new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.metrics.totalStudents}</div>
                <p className="text-xs text-muted-foreground">+{dashboardData.metrics.newEnrollments} new enrollments</p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.metrics.avgCompletion}%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card> */}
          </div>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    {timePeriod === "7days"
                      ? "Daily revenue for the past week"
                      : "Monthly revenue for the selected period"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {loading ? (
                      <div className="flex h-full items-center justify-center">Loading chart data...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip contentStyle={{ borderRadius: "8px" }} formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={COLORS.primary}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Revenue by course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {loading ? (
                        <div className="flex h-full items-center justify-center">Loading chart data...</div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dashboardData.coursePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value, name) => [name === 'revenue' ? `$${value}` : value, name === 'revenue' ? 'Revenue' : 'Students']} />
                            <Bar dataKey="revenue" fill={COLORS.primary} name="Revenue ($)" />
                            <Bar dataKey="students" fill={COLORS.secondary} name="Students" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>Latest course purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="flex h-[200px] items-center justify-center">Loading recent sales...</div>
                    ) : (
                      <div className="space-y-8">
                        {dashboardData.recentSalesData.slice(0, 3).map((sale) => (
                          <div key={sale.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{sale.student}</p>
                              <p className="text-sm text-muted-foreground">{sale.course}</p>
                            </div>
                            <div className="ml-auto font-medium">${sale.amount.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sales" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Latest course purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex h-[300px] items-center justify-center">Loading sales data...</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.recentSalesData.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.id}</TableCell>
                            <TableCell>{sale.course}</TableCell>
                            <TableCell>{sale.student}</TableCell>
                            <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}