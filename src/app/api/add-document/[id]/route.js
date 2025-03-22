import { NextResponse } from "next/server"
import { connect } from "@/lib/mongo"
import Instructor from "@/model/instructor-model"

// Connect to MongoDB
connect()

// 📥 Handle POST request to add/update documents
export async function POST(req, { params }) {
  try {
    const { id } = params

    // Parse the request body
    const body = await req.json()

    // Extract document URLs from request body
    const {
      tenthCertificate,
      twelfthCertificate,
      workExperience,
      certificates,
    } = body

    // ✅ Check if instructor exists
    const instructor = await Instructor.findById(id)
    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      )
    }

    // 📝 Update documents
    instructor.documents.tenth =
      tenthCertificate || instructor.documents.tenth
    instructor.documents.twelfth =
      twelfthCertificate || instructor.documents.twelfth
    instructor.documents.workExperience =
      workExperience.length > 0
        ? workExperience
        : instructor.documents.workExperience
    instructor.documents.certificates =
      certificates.length > 0
        ? certificates
        : instructor.documents.certificates

    // 🔄 Save the updated instructor
    await instructor.save()

    // 📤 Return success response
    return NextResponse.json({
      message: "Documents added successfully!",
      pending:true,
      instructor,
    })
  } catch (error) {
    //console.error("Error adding documents:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
