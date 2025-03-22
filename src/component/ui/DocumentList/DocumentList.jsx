// DocumentList.js
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function DocumentList({ documents, onPreview }) {
  return (
    <div className="space-y-2">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <img
                src={doc.url}
                alt={doc.name}
                className="w-10 h-10 object-cover rounded-md"
              />
            </div>
            <div>
              <p className="font-medium">{doc.name}</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 underline"
              >
                View Document
              </a>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => onPreview(doc)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>
      ))}
    </div>
  )
}
