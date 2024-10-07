"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const submissions = [
  {
    id: "1",
    studentName: "Alice Johnson",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    answerFileUrl: "#alice-answer",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    answerFileUrl: "#bob-answer",
  },
  {
    id: "3",
    studentName: "Charlie Brown",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    answerFileUrl: "#charlie-answer",
  },
  {
    id: "4",
    studentName: "Diana Ross",
    profilePhoto: "/placeholder.svg?height=40&width=40",
    answerFileUrl: "#diana-answer",
  },
]

export default function Answercard({awnserfile}) {
    console.log("ass",awnserfile)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Submitted Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awnserfile.map((submission) => (
          <Card key={submission._id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={submission?.studentid?.avtar} alt={submission?.studentid?.name} />
                <AvatarFallback>{submission?.studentid?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{submission?.studentid?.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <a href={submission?.awnserfileurl} target="_blank" rel="noopener noreferrer">
                  Open Answer File
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}