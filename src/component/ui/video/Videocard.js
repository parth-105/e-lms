"use client"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
import Link from "next/link";
   
  export function Videocard({video}) {
    return (
      <Link href={`/videoplay/${video._id}`} >
      <Card className="w-72 h-72 cursor-pointer">
        <CardHeader floated={false} className="h-[100%]">
          <img className="h-full" src={video?.videourl} alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Natalie Paisley
          </Typography>
        </CardBody>
      </Card>
      </Link>
    );
  }