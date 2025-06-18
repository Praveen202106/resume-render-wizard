
import React from 'react';
import { SectionSettings } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  settings: SectionSettings;
  onUpdateSettings: (settings: SectionSettings) => void;
  onDelete: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  settings,
  onUpdateSettings,
  onDelete,
  isExpanded,
  onToggleExpand
}) => {
  const handleSettingChange = (field: keyof SectionSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Input
              value={settings.title}
              onChange={(e) => handleSettingChange('title', e.target.value)}
              className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
              placeholder="Section Title"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.showLine}
                onCheckedChange={(checked) => handleSettingChange('showLine', checked)}
              />
              <Label className="text-sm">Show Line</Label>
            </div>
            
            <div>
              <Label className="text-sm">Top Margin</Label>
              <Input
                type="number"
                step="0.1"
                value={settings.topMargin}
                onChange={(e) => handleSettingChange('topMargin', parseFloat(e.target.value) || 0)}
                className="h-8"
              />
            </div>
            
            <div>
              <Label className="text-sm">Bottom Margin</Label>
              <Input
                type="number"
                step="0.1"
                value={settings.bottomMargin}
                onChange={(e) => handleSettingChange('bottomMargin', parseFloat(e.target.value) || 0)}
                className="h-8"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.visible}
                onCheckedChange={(checked) => handleSettingChange('visible', checked)}
              />
              <Label className="text-sm">Visible</Label>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SectionHeader;
