"use client"

import { useState, useEffect } from "react"
import { BookOpen, DollarSign, Users, Settings, UserCheck, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import InstructorRequests from "../pendingrequest/InstructorRequests"

export default function AdminDashboard() {
    // State for dashboard data
    const [loading, setLoading] = useState({
        overview: true,
        courses: true,
        instructors: true,
        students: true,
        pendinginstructure: false
    })

    // Overview state
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalSales: 0,
        totalStudents: 0,
        totalInstructors: 0,
        revenueGrowth: 0,
        newCoursesThisMonth: 0,
    })
    const [revenueData, setRevenueData] = useState([])

    // Courses state
    const [courseData, setCourseData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [topCourses, setTopCourses] = useState([])

    // Instructors state
    const [instructors, setInstructors] = useState([])

    // Students state
    const [students, setStudents] = useState([])

    // State for confirmation dialog
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        instructorId: null,
        instructorName: "",
    })

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`/api/admin/dashboard?_=${Date.now()}`);
                const data = await response.json();

                if (data.success) {
                    setStats(data.stats);
                    setRevenueData(data.revenueData);

                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(prev => ({ ...prev, overview: false }));
            }
        };

        fetchDashboardData();
    }, []);

    // Fetch courses data
    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await fetch(`/api/admin/courses?_=${Date.now()}`);
                const data = await response.json();

                if (data.success) {
                    setCourseData(data.courses);
                    setCategoryData(data.categoryData);
                    setTopCourses(data.topCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses data:", error);
            } finally {
                setLoading(prev => ({ ...prev, courses: false }));
            }
        };

        fetchCoursesData();
    }, []);

    // Fetch instructors data
    useEffect(() => {
        const fetchInstructorsData = async () => {
            try {
                const response = await fetch(`/api/admin/instructors?_=${Date.now()}`);
                const data = await response.json();

                if (data.success) {
                    setInstructors(data.instructors);
                }
            } catch (error) {
                console.error("Failed to fetch instructors data:", error);
            } finally {
                setLoading(prev => ({ ...prev, instructors: false }));
            }
        };

        fetchInstructorsData();
    }, []);

    // Fetch students data
    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const response = await fetch(`/api/admin/students?_=${Date.now()}`);
                const data = await response.json();

                if (data.success) {
                    setStudents(data.students);
                }
            } catch (error) {
                console.error("Failed to fetch students data:", error);
            } finally {
                setLoading(prev => ({ ...prev, students: false }));
            }
        };

        fetchStudentsData();
    }, []);

    // Function to open confirmation dialog
    const openConfirmDialog = (id, name) => {
        setConfirmDialog({
            isOpen: true,
            instructorId: id,
            instructorName: name,
        })
    }

    // Function to revoke instructor permission
    const revokeInstructorPermission = async () => {
        try {
            const response = await fetch(`/api/admin/instructors?_=${Date.now()}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instructorId: confirmDialog.instructorId,
                    isInstructor: false
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update instructors list
                setInstructors(
                    instructors.map((instructor) =>
                        instructor.id === confirmDialog.instructorId ? { ...instructor, isInstructor: false } : instructor,
                    ),
                );
            }
        } catch (error) {
            console.error("Failed to revoke instructor permission:", error);
        }

        setConfirmDialog({ isOpen: false, instructorId: null, instructorName: "" });
    }

    // Function to restore instructor permission
    const restoreInstructorPermission = async (instructorId) => {
        try {
            const response = await fetch(`/api/admin/instructors?_=${Date.now()}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instructorId: instructorId,
                    isInstructor: true
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update instructors list
                setInstructors(
                    instructors.map((instructor) =>
                        instructor.id === instructorId ? { ...instructor, isInstructor: true } : instructor,
                    ),
                );
            }
        } catch (error) {
            console.error("Failed to restore instructor permission:", error);
        }
    }

    // Loading component
    const LoadingSkeleton = () => (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-20 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <Skeleton className="h-5 w-36 mb-2" />
                        <Skeleton className="h-3 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <Skeleton className="h-5 w-36 mb-2" />
                        <Skeleton className="h-3 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                    <h1 className="text-xl font-semibold">LMS Admin Dashboard</h1>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        {/* <Button variant="ghost" className="text-muted-foreground" size="sm">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button> */}
                        {/* <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Admin</span>
            </Button> */}
                    </nav>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <Tabs defaultValue="overview" className="space-y-4">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="instructors">Instructors</TabsTrigger>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="students">Students</TabsTrigger>
                                <TabsTrigger value="pendinginstructure">pendinginstructure</TabsTrigger>
                            </TabsList>
                            {/* <div className="ml-auto flex items-center gap-2">
                <Button>Export Data</Button>
              </div> */}
                        </div>

                        <TabsContent value="overview" className="space-y-4">
                            {loading.overview ? (
                                <LoadingSkeleton />
                            ) : (
                                <>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                                                <p className="text-xs text-muted-foreground">+{stats.newCoursesThisMonth} this month</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</div>
                                                <p className="text-xs text-muted-foreground">+{stats.revenueGrowth}% from last month</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                                                <p className="text-xs text-muted-foreground">Active learners on platform</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Instructors</CardTitle>
                                                <UserCheck className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{stats.totalInstructors}</div>
                                                <p className="text-xs text-muted-foreground">Active content creators</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                        {/* <Card className="col-span-4">
                                            <CardHeader>
                                                <CardTitle>Revenue Overview</CardTitle>
                                                
                                                <CardDescription>Monthly revenue for the current year</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={revenueData}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="month" />
                                                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                                            <Tooltip
                                                                formatter={(value, name) => {
                                                                    if (name === "revenue") return `$${value.toLocaleString()}`
                                                                    return value
                                                                }}
                                                            />
                                                            <Legend />
                                                            <Line
                                                                yAxisId="left"
                                                                type="monotone"
                                                                dataKey="revenue"
                                                                stroke="#8884d8"
                                                                activeDot={{ r: 8 }}
                                                                strokeWidth={2}
                                                                name="Revenue"
                                                            />
                                                            <Line
                                                                yAxisId="right"
                                                                type="monotone"
                                                                dataKey="students"
                                                                stroke="#82ca9d"
                                                                strokeWidth={2}
                                                                name="Students"
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card> */}
                                        <Card className="col-span-4">
                                            <CardHeader>
                                                <CardTitle>Revenue Overview</CardTitle>
                                                <CardDescription>Monthly revenue and student join trends</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={revenueData}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="month" />
                                                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                                            <Tooltip
                                                                formatter={(value, name) => {
                                                                    if (name === "Revenue") return `$${value.toLocaleString()}`;
                                                                    if (name === "Students") return `${value} students`;
                                                                    return value;
                                                                }}
                                                            />
                                                            <Legend />
                                                            <Line
                                                                yAxisId="left"
                                                                type="monotone"
                                                                dataKey="revenue"
                                                                stroke="#8884d8"
                                                                activeDot={{ r: 8 }}
                                                                strokeWidth={2}
                                                                name="Revenue"
                                                            />
                                                            <Line
                                                                yAxisId="right"
                                                                type="monotone"
                                                                dataKey="students"
                                                                stroke="#82ca9d"
                                                                strokeWidth={2}
                                                                name="Students"
                                                            />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="col-span-3">
                                            <CardHeader>
                                                <CardTitle>Course Categories</CardTitle>
                                                <CardDescription>Distribution by subject area</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    {!loading.courses && categoryData.length > 0 ? (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={categoryData}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    labelLine={false}
                                                                    outerRadius={80}
                                                                    fill="#8884d8"
                                                                    dataKey="value"
                                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                                >
                                                                    {categoryData.map((entry, index) => (
                                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip />
                                                                <Legend />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <p className="text-muted-foreground">Loading category data...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                        <Card className="col-span-4">
                                            <CardHeader>
                                                <CardTitle>Course Enrollments</CardTitle>
                                                <CardDescription>Top courses by student enrollment</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    {!loading.courses && topCourses.length > 0 ? (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart data={topCourses}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis dataKey="name" />
                                                                <YAxis />
                                                                <Tooltip />
                                                                <Legend />
                                                                <Bar dataKey="students" fill="#82ca9d" name="Students" />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <p className="text-muted-foreground">Loading enrollment data...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="col-span-3">
                                            <CardHeader>
                                                <CardTitle>Student Growth</CardTitle>
                                                <CardDescription>Monthly student acquisition</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={revenueData}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="month" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Area
                                                                type="monotone"
                                                                dataKey="students"
                                                                stroke="#8884d8"
                                                                fill="#8884d8"
                                                                fillOpacity={0.3}
                                                                name="Students"
                                                            />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        {/* <Card className="col-span-3">
                                            <CardHeader>
                                                <CardTitle>Student Growthg</CardTitle>
                                                <CardDescription>Monthly student acquisition</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={revenueData}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="month" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Area
                                                                type="monotone"
                                                                dataKey="students"
                                                                stroke="#8884d8"
                                                                fill="#8884d8"
                                                                fillOpacity={0.3}
                                                                name="Student Acquisition"
                                                            />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card> */}
                                    </div>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="instructors" className="space-y-4">
                            {loading.instructors ? (
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-5 w-36 mb-2" />
                                        <Skeleton className="h-3 w-48" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-64 w-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Instructor Management</CardTitle>
                                            <CardDescription>Manage instructor permissions and view performance metrics</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Instructor</TableHead>
                                                        <TableHead>Courses</TableHead>
                                                        <TableHead>Students</TableHead>
                                                        <TableHead>Revenue</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {instructors.map((instructor) => (
                                                        <TableRow key={instructor.id}>
                                                            <TableCell className="font-medium">
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage src={instructor.avatar} alt={instructor.name} />
                                                                        <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div>{instructor.name}</div>
                                                                        <div className="text-xs text-muted-foreground">{instructor.email}</div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{instructor.courses}</TableCell>
                                                            <TableCell>{instructor.students}</TableCell>
                                                            <TableCell>₹{instructor.revenue.toLocaleString()}</TableCell>
                                                            <TableCell>
                                                                {instructor.isInstructor ? (
                                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                        Active
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                                        Revoked
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {instructor.isInstructor ? (
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        onClick={() => openConfirmDialog(instructor.id, instructor.name)}
                                                                    >
                                                                        <ShieldAlert className="h-4 w-4 mr-1" />
                                                                        Revoke Permission
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => restoreInstructorPermission(instructor.id)}
                                                                    >
                                                                        Restore Permission
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Instructor Revenue Contribution</CardTitle>
                                                <CardDescription>Top instructors by revenue</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={instructors.slice(0, 5)}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip
                                                                formatter={(value, name) => {
                                                                    if (name === "revenue") return `$${value.toLocaleString()}`
                                                                    return value
                                                                }}
                                                            />
                                                            <Legend />
                                                            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Instructor Course Count</CardTitle>
                                                <CardDescription>Number of courses per instructor</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={instructors.slice(0, 5)}>
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar dataKey="courses" fill="#82ca9d" name="Courses" />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="courses" className="space-y-4">
                            {loading.courses ? (
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-5 w-36 mb-2" />
                                        <Skeleton className="h-3 w-48" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-[400px] w-full" />
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Performance</CardTitle>
                                        <CardDescription>Revenue and enrollment metrics by course</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[400px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={topCourses} layout="vertical">
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis type="number" />
                                                    <YAxis dataKey="name" type="category" width={150} />
                                                    <Tooltip formatter={(value) => value.toLocaleString()} />
                                                    <Legend />
                                                    <Bar dataKey="students" fill="#82ca9d" name="Students" />
                                                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="students" className="space-y-4">
                            {loading.students ? (
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-5 w-36 mb-2" />
                                        <Skeleton className="h-3 w-48" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-[400px] w-full" />
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Student Enrollment</CardTitle>
                                            <CardDescription>Students and their course enrollment data</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Student</TableHead>
                                                        <TableHead>Email</TableHead>
                                                        <TableHead>Enrolled Courses</TableHead>
                                                        <TableHead>Join Date</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {students.map((student) => (
                                                        <TableRow key={student.id}>
                                                            <TableCell className="font-medium">
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage src={student.avatar} alt={student.name} />
                                                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>{student.name}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{student.email}</TableCell>
                                                            <TableCell>{student.enrolledCourses}</TableCell>
                                                            <TableCell>
                                                                {student.joinDate
                                                                    ? new Date(student.joinDate).toLocaleDateString()
                                                                    : "Not available"}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Student Growth Trends</CardTitle>
                                            <CardDescription>Monthly student acquisition and retention</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[400px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={revenueData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="month" />
                                                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                                        <Tooltip
                                                            formatter={(value, name) => {
                                                                if (name === "revenue") return `$${value.toLocaleString()}`
                                                                return value
                                                            }}
                                                        />
                                                        <Legend />
                                                        <Area
                                                            yAxisId="left"
                                                            type="monotone"
                                                            dataKey="students"
                                                            stroke="#8884d8"
                                                            fill="#8884d8"
                                                            fillOpacity={0.3}
                                                            name="Students"
                                                        />
                                                        <Area
                                                            yAxisId="right"
                                                            type="monotone"
                                                            dataKey="revenue"
                                                            stroke="#82ca9d"
                                                            fill="#82ca9d"
                                                            fillOpacity={0.3}
                                                            name="Revenue"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="pendinginstructure" className="space-y-4">
                            {loading.pendinginstructure ? (
                                <Card>
                                    <CardHeader>
                                        <Skeleton className="h-5 w-36 mb-2" />
                                        <Skeleton className="h-3 w-48" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-[400px] w-full" />
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <Card>

                                        <CardContent>
                                            <InstructorRequests />
                                        </CardContent>
                                    </Card>


                                </>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>
            </div>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.isOpen}
                onOpenChange={(open) => {
                    if (!open) setConfirmDialog({ isOpen: false, instructorId: null, instructorName: "" })
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Revoke Instructor Permission</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to revoke instructor privileges for{" "}
                            <span className="font-medium">{confirmDialog.instructorName}</span>? This will prevent them from uploading
                            new courses or making changes to existing courses.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setConfirmDialog({ isOpen: false, instructorId: null, instructorName: "" })}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={revokeInstructorPermission}>
                            Revoke Permission
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}