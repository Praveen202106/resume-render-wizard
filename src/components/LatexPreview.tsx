
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface LatexPreviewProps {
  latexCode: string;
}

const LatexPreview: React.FC<LatexPreviewProps> = ({ latexCode }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      toast({
        title: "Success",
        description: "LaTeX code copied to clipboard!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadLatex = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "LaTeX file downloaded!",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">LaTeX Preview</CardTitle>
        <div className="flex space-x-2">
          <Button size="sm" onClick={copyToClipboard}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button size="sm" onClick={downloadLatex}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto h-[calc(100vh-200px)] whitespace-pre-wrap font-mono">
          {latexCode}
        </pre>
      </CardContent>
    </Card>
  );
};

export default LatexPreview;
