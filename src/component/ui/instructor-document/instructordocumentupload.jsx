"use client"

import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { X, FileText, Upload, AlertCircle } from "lucide-react"

import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils';
import axios from "axios"
import { useState } from "react"

import { useToast } from "@/hooks/use-toast";

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";

import { useRef } from "react"

export default function InstructorDocumentUpload() {

  const { toast } = useToast()

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      tenthCertificate: [],
      twelfthCertificate: [],
      workExperience: [],
      certificates: [],
    },
  })

  const tenthCertificate = watch("tenthCertificate")
  const twelfthCertificate = watch("twelfthCertificate")
  // const workExperience = watch("workExperience")
  // const certificates = watch("certificates")


  const [workExperienceFiles, setWorkExperienceFiles] = useState([]);
  const [certificateFiles, setCertificateFiles] = useState([]);

  // Handle file drop dynamically
  const handleDrop = (id, acceptedFiles) => {
    if (id === "workExperience") {
      setWorkExperienceFiles([...workExperienceFiles, ...acceptedFiles]);
      setValue("workExperience", [...workExperienceFiles, ...acceptedFiles], {
        shouldValidate: true,
      });
    } else if (id === "certificates") {
      setCertificateFiles([...certificateFiles, ...acceptedFiles]);
      setValue("certificates", [...certificateFiles, ...acceptedFiles], {
        shouldValidate: true,
      });
    }
  };

  // Handle file removal dynamically
  const handleRemove = (id, fileIndex) => {
    if (id === "workExperience") {
      const updatedFiles = workExperienceFiles.filter((_, i) => i !== fileIndex);
      setWorkExperienceFiles(updatedFiles);
      setValue("workExperience", updatedFiles, { shouldValidate: true });
    } else if (id === "certificates") {
      const updatedFiles = certificateFiles.filter((_, i) => i !== fileIndex);
      setCertificateFiles(updatedFiles);
      setValue("certificates", updatedFiles, { shouldValidate: true });
    }
  };



  const onSubmit = async (data) => {
    try {


      const tenthCertificateUrls = data.tenthCertificate
        ? await uploadFileAndGetUrl(data.tenthCertificate[0])
        : null

      const twelfthCertificateUrls = data.twelfthCertificate
        ? await uploadFileAndGetUrl(data.twelfthCertificate[0])
        : null

      const workExperienceUrls = await Promise.all(
        data.workExperience.map((file) => uploadFileAndGetUrl(file))
      )
      const certificatesUrls = await Promise.all(
        data.certificates.map((file) => uploadFileAndGetUrl(file))
      )

      // Send URLs to backend



      const response = await axios.post(`/api/add-document/${id}`, {
        tenthCertificate: tenthCertificateUrls,
        twelfthCertificate: twelfthCertificateUrls,
        workExperience: workExperienceUrls,
        certificates: certificatesUrls,
      })


      if (response.data.pending) {
        router.push("/pendingpage");
      }
      else {
        toast({
          title: "Your Are Register Successfully",
          description: "Now Login !!",
        })
        router.push("/login");

      }

    } catch (error) {

      toast({
        variant: "destructive",
        title: "something went wronge",
        description: "plase wait!!",
      })
    }
  }


  const fileValidator = (files) => {
    if (files.length === 0) return "This field is required"

    for (const file of files) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type)) {
        return "Only PDF and DOC files are allowed"
      }
      if (file.size > 5 * 1024 * 1024) {
        return "File size should be less than 5MB"
      }
    }
    return true
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Instructor Document Upload</CardTitle>
          <CardDescription>Please upload all required documents to complete your profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* 10th Certificate Upload */}
              <div className="space-y-2">
                <Label htmlFor="tenthCertificate">
                  10th Certificate <span className="text-red-500">*</span>
                </Label>
                <FileUpload
                  id="tenthCertificate"
                  accept=".pdf,.doc,.docx"
                  maxFiles={1}
                  files={tenthCertificate}
                  onDrop={(acceptedFiles) => {
                    setValue("tenthCertificate", acceptedFiles, {
                      shouldValidate: true,
                    })
                  }}
                  onRemove={() => {
                    setValue("tenthCertificate", [], {
                      shouldValidate: true,
                    })
                  }}
                  error={errors.tenthCertificate?.message}
                  register={register("tenthCertificate", {
                    validate: fileValidator,
                  })}
                />
              </div>

              {/* 12th Certificate Upload */}
              <div className="space-y-2">
                <Label htmlFor="twelfthCertificate">
                  12th Certificate <span className="text-red-500">*</span>
                </Label>
                <FileUpload
                  id="twelfthCertificate"
                  accept=".pdf,.doc,.docx"
                  maxFiles={1}
                  files={twelfthCertificate}
                  onDrop={(acceptedFiles) => {
                    setValue("twelfthCertificate", acceptedFiles, {
                      shouldValidate: true,
                    })
                  }}
                  onRemove={() => {
                    setValue("twelfthCertificate", [], {
                      shouldValidate: true,
                    })
                  }}
                  error={errors.twelfthCertificate?.message}
                  register={register("twelfthCertificate", {
                    validate: fileValidator,
                  })}
                />
              </div>
            </div>

            {/* Work Experience Documents */}
            <div className="space-y-2">
              <Label htmlFor="workExperience">
                Work Experience Documents <span className="text-red-500">*</span>
              </Label>
              <FileUpload
                id="workExperience"
                accept=".pdf,.doc,.docx"
                maxFiles={5}
                multiple
                // files={workExperience}
                // onDrop={(acceptedFiles) => {
                //   setValue("workExperience", acceptedFiles, {
                //     shouldValidate: true,
                //   })
                // }}
                // onRemove={(fileIndex) => {
                //   setValue(
                //     "workExperience",
                //     workExperience.filter((_, i) => i !== fileIndex),
                //     { shouldValidate: true }
                //   )
                // }}

                files={workExperienceFiles} // ✅ Correct value
                onDrop={(acceptedFiles) => handleDrop("workExperience", acceptedFiles)}
                onRemove={(fileIndex) => handleRemove("workExperience", fileIndex)}
                error={errors.workExperience?.message}
                register={register("workExperience", {
                  validate: fileValidator,
                })}
              />
            </div>

            {/* Certificates */}
            <div className="space-y-2">
              <Label htmlFor="certificates">
                Certificates <span className="text-red-500">*</span>
              </Label>
              <FileUpload
                id="certificates"
                accept=".pdf,.doc,.docx"
                maxFiles={10}
                multiple
                // files={certificates}
                // onDrop={(acceptedFiles) => {
                //   setValue("certificates", acceptedFiles, {
                //     shouldValidate: true,
                //   })
                // }}
                // onRemove={(fileIndex) => {
                //   setValue(
                //     "certificates",
                //     certificates.filter((_, i) => i !== fileIndex),
                //     { shouldValidate: true }
                //   )
                // }}

                files={certificateFiles} // ✅ Correct value
                onDrop={(acceptedFiles) => handleDrop("certificates", acceptedFiles)}
                onRemove={(fileIndex) => handleRemove("certificates", fileIndex)}

                error={errors.certificates?.message}
                register={register("certificates", {
                  validate: fileValidator,
                })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Submit Documents"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// FileUpload Component (Props without TypeScript)
// function FileUpload({
//   id,
//   accept,
//   maxFiles,
//   multiple = true,
//   files,
//   onDrop,
//   onRemove,
//   error,
//   register,
// }) {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "application/pdf": [".pdf"],
//       "application/msword": [".doc"],
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
//     },
//     maxFiles,
//     multiple,
//     onDrop,
//     noClick: true,
//   })

//   const handleManualUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files)
//     if (selectedFiles.length > 0) {
//       onDrop(selectedFiles) // ✅ Manually handle selected files
//     }
//   }


//   return (
//     <div className="space-y-2">
//       {/* <div
//         {...getRootProps()}
//         className={(
//           "border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors",
//           isDragActive
//             ? "border-primary bg-primary/5"
//             : error
//               ? "border-red-500 bg-red-50 dark:bg-red-950/10"
//               : "border-gray-300 hover:border-primary dark:border-gray-700"
//         )}

//       > */}

//       <div
//         {...getRootProps({
//           onClick: (event) => event.preventDefault(), // ✅ Prevents default to avoid opening a wrong URL
//         })}
//         className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${isDragActive
//             ? "border-primary bg-primary/5"
//             : error
//               ? "border-red-500 bg-red-50 dark:bg-red-950/10"
//               : "border-gray-300 hover:border-primary dark:border-gray-700"
//           }`}
//       >
//         <input {...getInputProps()} id={id} {...register} />
//         <div className="flex flex-col items-center justify-center gap-1 text-sm">
//           <Upload className="h-6 w-6 text-gray-500 mb-1" />
//           <p className="font-medium">
//             {isDragActive ? "Drop the files here" : "Drag & drop files here"}
//           </p>
//           <p className="text-xs text-gray-500">
//             or <span className="text-primary font-medium">browse</span> to upload
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             {multiple ? `Up to ${maxFiles} files` : "Only 1 file"} (PDF or DOC, max 5MB)
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div className="flex items-center text-red-500 text-xs gap-1 mt-1">
//           <AlertCircle className="h-3 w-3" />
//           <span>{error}</span>
//         </div>
//       )}

//       {files.length > 0 && (
//         <div className="mt-2 space-y-2">
//           {files.map((file, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
//             >
//               <div className="flex items-center gap-2 truncate">
//                 <FileText className="h-4 w-4 text-primary flex-shrink-0" />
//                 <span className="text-sm truncate">{file.name}</span>
//                 <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(0)} KB)</span>
//               </div>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="h-6 w-6"
//                 onClick={() => onRemove(multiple ? index : undefined)}
//               >
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Remove file</span>
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }




// new 

// Merge refs helper
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
}

 function FileUpload({
  id,
  accept,
  maxFiles,
  multiple = true,
  files,
  onDrop,
  onRemove,
  error,
  registerField, // May be undefined if not passed
}) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles,
    multiple,
    onDrop,
    noClick: true,
  });

  // Provide a fallback if registerField is undefined
  const { ref: rhfRef = null, ...restField } = registerField || {};

  const dropzoneInputProps = getInputProps();

  return (
    <div className="space-y-2">
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : error
              ? "border-red-500 bg-red-50 dark:bg-red-950/10"
              : "border-gray-300 hover:border-primary dark:border-gray-700"
          }`,
        })}
      >
        <input
          {...dropzoneInputProps}
          id={id}
          {...restField}
          ref={mergeRefs(dropzoneInputProps.ref, rhfRef)}
        />
        <div
          className="flex flex-col items-center justify-center gap-1 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          <Upload className="h-6 w-6 text-gray-500 mb-1" />
          <p className="font-medium">
            {isDragActive ? "Drop the files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-gray-500">
            or{" "}
            <span
              className="text-primary font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              browse
            </span>{" "}
            to upload
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {multiple ? `Up to ${maxFiles} files` : "Only 1 file"} (PDF or DOC, max 5MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center text-red-500 text-xs gap-1 mt-1">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
