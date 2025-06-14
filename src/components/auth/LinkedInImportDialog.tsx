
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

interface LinkedInImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
  isLoading: boolean;
  selectedRole: "jobseeker" | "employer";
}

const LinkedInImportDialog: React.FC<LinkedInImportDialogProps> = ({
  open,
  onOpenChange,
  onConnect,
  isLoading,
  selectedRole,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import LinkedIn Profile</DialogTitle>
          <DialogDescription>
            We'll import your LinkedIn profile data and photo.
            {selectedRole === "jobseeker" && " You'll still need to add your phone number to complete registration."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {selectedRole === "jobseeker" && (
            <>
              <p className="text-sm text-gray-600">
                After importing from LinkedIn, you will need to:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Add your phone number</li>
              </ul>
            </>
          )}
          <Button 
            className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90 transition-colors"
            onClick={onConnect}
            disabled={isLoading}
          >
            <Linkedin className="mr-2 h-4 w-4" /> 
            {isLoading ? "Connecting..." : "Connect with LinkedIn"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full transition-colors" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInImportDialog;
