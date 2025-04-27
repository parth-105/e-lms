
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { connect } from "@/lib/mongo";
// import Instructor from "@/model/instructor-model";
// import User from "@/model/user-model";


// connect();


// export async function POST(request) {
//     try {
//       //  await connect();
//         // const { name, email, password } = await req.json();
//         const reqBody = await request.json()
//         const { name, email, password, isInstructor ,photoURL } = reqBody

//          console.log('reqbody',reqBody)

//         if (isInstructor) {
//             const instructor = await Instructor.findOne({ email })

//             if (instructor) {
//                 return NextResponse.json({ error: "User already exists" }, { status: 400 })
//             }

//             //hash password
//             const salt = await bcryptjs.genSalt(10)
//             const hashedPassword = await bcryptjs.hash(password, salt)

//             const newUser = new Instructor({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 status: 'pending', 
//                 photoURL,
//             })

//             const savedUser = await newUser.save()
           


//             return NextResponse.json({
//                 message: "instructor created successfully approved is pending",
//                 success: true,
//                 pending:true,
//                 savedUser
//             })


//         }

//         else {

//             const user = await User.findOne({email})

//             if(user){
//                 return NextResponse.json({error: "User already exists"}, {status: 400})
//             }
    
//                 consol.log('email',email)
//             //hash password
//             const salt = await bcryptjs.genSalt(10)
//             const hashedPassword = await bcryptjs.hash(password, salt)
    
//             const newUser = new User({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 isInstructor:false,
//                 photoURL,
//             })
    
//             const savedUser = await newUser.save()
           
    
//           consol.log('new-user',savedUser)
    
//             return NextResponse.json({
//                 message: "User created successfully",
//                 success: true,
//                 savedUser
//             })

//         }
//     }
//     catch (error) {
//         console.log('err',error.message)
//         return NextResponse.json({ error: error.message })

//     }

// }



import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";
import User from "@/model/user-model";

connect();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password, isInstructor, photoURL } = reqBody;

    console.log("reqBody:", reqBody);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (isInstructor) {
      const instructor = await Instructor.findOne({ email });

      if (instructor) {
        console.log("Instructor already exists with email:", email);
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newInstructor = new Instructor({
        name,
        email,
        password: hashedPassword,
        status: "pending",
        photoURL,
      });

      const savedInstructor = await newInstructor.save();

      return NextResponse.json({
        message: "Instructor created successfully. Approval is pending.",
        success: true,
        pending: true,
        savedUser: savedInstructor,
      });
    } else {
      const user = await User.findOne({ email });

      if (user) {
        console.log("Student already exists with email:", email);
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        isInstructor: false,
        photoURL,
      });

      const savedUser = await newUser.save();

      console.log("New student user:", savedUser);

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser,
      },{
        headers: {
          // This header instructs clients/CDNs to not cache this response.
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
