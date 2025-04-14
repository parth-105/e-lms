"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function InstructorRequests() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await axios.get(`/api/pending-instructors?_=${Date.now()}`);
      setInstructors(response.data.pendingInstructors);
    };
    fetchInstructors();
  }, []);

  const handleApprove = async (id) => {
    await axios.post(`/api/approve-instructor/${id}`);
    setInstructors(instructors.filter((instructor) => instructor._id !== id));
    toast({
      title: "Request Approved",
      description: "The instructor registration request has been approved.",
    });
  };

  const handleDecline = (id) => {
    setInstructors(instructors.filter((instructor) => instructor._id !== id));
    toast({
      title: "Request Declined",
      description: "The instructor registration request has been declined.",
      variant: "destructive",
    });
  };

  const onPreview = (instructor) => {
    setSelectedInstructor(instructor);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Instructor Requests</h1>
      {instructors.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <Card key={instructor._id} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={instructor.photoURL || "/default.png"}
                    alt="Instructor"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">{instructor.name}</p>
                    <p className="text-sm text-gray-500">
                      {instructor.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-semibold">Documents:</p>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={() => onPreview(instructor)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Documents
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    onClick={() => handleApprove(instructor._id)}
                    variant="success"
                    className="text-white bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleDecline(instructor._id)}
                    variant="destructive"
                    className="text-white bg-red-500 hover:bg-red-600"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Drawer for Document Tabs */}
      <Drawer
        open={!!selectedInstructor}
        onOpenChange={(open) => {
          if (!open) setSelectedInstructor(null);
        }}
      >
        <DrawerContent className="w-full md:max-w-3xl mx-auto rounded-t-lg h-[85vh] md:h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Document Preview</DrawerTitle>
            <DrawerDescription>
              Review the documents before making a decision.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 h-[70vh] overflow-y-auto">
            {selectedInstructor && (
              <Tabs defaultValue="tenth" className="w-full">
                <ScrollArea className="overflow-x-auto">
                  <TabsList className="flex justify-start space-x-2 overflow-x-auto w-full">
                    {selectedInstructor.documents?.tenth && (
                      <TabsTrigger value="tenth">10th Certificate</TabsTrigger>
                    )}
                    {selectedInstructor.documents?.twelfth && (
                      <TabsTrigger value="twelfth">
                        12th Certificate
                      </TabsTrigger>
                    )}
                    {selectedInstructor.documents?.certificates?.length > 0 &&
                      selectedInstructor.documents.certificates.map(
                        (cert, index) => (
                          <TabsTrigger
                            key={`cert-${index}`}
                            value={`cert-${index}`}
                          >
                            Certificate {index + 1}
                          </TabsTrigger>
                        )
                      )}
                    {selectedInstructor.documents?.workExperience?.length > 0 &&
                      selectedInstructor.documents.workExperience.map(
                        (exp, index) => (
                          <TabsTrigger
                            key={`exp-${index}`}
                            value={`exp-${index}`}
                          >
                            Work Exp {index + 1}
                          </TabsTrigger>
                        )
                      )}
                  </TabsList>
                </ScrollArea>

                {/* Tabs Content */}
                <div className="mt-4 h-[60vh]">
                  {selectedInstructor.documents?.tenth && (
                    <TabsContent value="tenth">
                      <iframe
                        src={selectedInstructor.documents.tenth}
                        className="w-full h-[60vh] border rounded-lg"
                        title="10th Certificate"
                      />
                    </TabsContent>
                  )}
                  {selectedInstructor.documents?.twelfth && (
                    <TabsContent value="twelfth">
                      <iframe
                        src={selectedInstructor.documents.twelfth}
                        className="w-full h-[60vh] border rounded-lg"
                        title="12th Certificate"
                      />
                    </TabsContent>
                  )}
                  {selectedInstructor.documents?.certificates?.length > 0 &&
                    selectedInstructor.documents.certificates.map(
                      (cert, index) => (
                        <TabsContent
                          key={`cert-${index}`}
                          value={`cert-${index}`}
                        >
                          <iframe
                            src={cert}
                            className="w-full h-[60vh] border rounded-lg"
                            title={`Certificate ${index + 1}`}
                          />
                        </TabsContent>
                      )
                    )}
                  {selectedInstructor.documents?.workExperience?.length > 0 &&
                    selectedInstructor.documents.workExperience.map(
                      (exp, index) => (
                        <TabsContent
                          key={`exp-${index}`}
                          value={`exp-${index}`}
                        >
                          <iframe
                            src={exp}
                            className="w-full h-[60vh] border rounded-lg"
                            title={`Work Experience ${index + 1}`}
                          />
                        </TabsContent>
                      )
                    )}
                </div>
              </Tabs>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
