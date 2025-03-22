import dynamic from "next/dynamic";

const InstructorDocumentUpload = dynamic(
  () => import("@/component/ui/instructor-document/instructordocumentupload"),
  { ssr: false }
);

export default function Page() {
  return <InstructorDocumentUpload />;
}