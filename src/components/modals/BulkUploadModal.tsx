import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState, useRef } from "react";

interface BulkUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File) => void;
}

export const BulkUploadModal = ({ open, onOpenChange, onUpload }: BulkUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleDownloadTemplate = () => {
    // In a real app, this would download an actual Excel template
    console.log("Downloading sample template...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-auto bg-white border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Bulk Upload Referrals
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-gray-600 mb-3">
                  Drop your Excel file here or click to browse
                </p>
                <Button 
                  onClick={handleChooseFile}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Choose File
                </Button>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* File Format Requirements */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">File Format Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Column A: Referee Name</li>
              <li>• Column B: Phone Number (10 digits)</li>
              <li>• Column C: Model (TrueFlex/Kirana)</li>
              <li>• Column D: PAN Number</li>
              <li>• Column E: Aadhaar Number</li>
              <li>• Column F: Referrer Profile ID</li>
            </ul>
            <button
              onClick={handleDownloadTemplate}
              className="text-blue-600 hover:text-blue-700 text-sm underline mt-2"
            >
              Download Sample Template
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            disabled={!selectedFile}
          >
            Upload & Process
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
};