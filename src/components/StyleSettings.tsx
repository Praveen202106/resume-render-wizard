
import React from 'react';
import { StyleSettings as StyleSettingsType } from '../types/cv';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface StyleSettingsProps {
  styleSettings: StyleSettingsType;
  onChange: (styleSettings: StyleSettingsType) => void;
}

const StyleSettings: React.FC<StyleSettingsProps> = ({ styleSettings, onChange }) => {
  const handleChange = (field: keyof StyleSettingsType, value: any) => {
    if (field === 'pageMargins') {
      onChange({
        ...styleSettings,
        pageMargins: {
          ...styleSettings.pageMargins,
          ...value
        }
      });
    } else {
      onChange({
        ...styleSettings,
        [field]: value
      });
    }
  };

  const handleMarginChange = (margin: keyof StyleSettingsType['pageMargins'], value: string) => {
    const numValue = parseFloat(value) || 0;
    handleChange('pageMargins', { [margin]: numValue });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Style Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Page Margins (cm)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="marginTop">Top</Label>
              <Input
                id="marginTop"
                type="number"
                step="0.1"
                value={styleSettings.pageMargins.top}
                onChange={(e) => handleMarginChange('top', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="marginBottom">Bottom</Label>
              <Input
                id="marginBottom"
                type="number"
                step="0.1"
                value={styleSettings.pageMargins.bottom}
                onChange={(e) => handleMarginChange('bottom', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="marginLeft">Left</Label>
              <Input
                id="marginLeft"
                type="number"
                step="0.1"
                value={styleSettings.pageMargins.left}
                onChange={(e) => handleMarginChange('left', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="marginRight">Right</Label>
              <Input
                id="marginRight"
                type="number"
                step="0.1"
                value={styleSettings.pageMargins.right}
                onChange={(e) => handleMarginChange('right', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="columnSpacing">Column Spacing (cm)</Label>
            <Input
              id="columnSpacing"
              type="number"
              step="0.1"
              value={styleSettings.columnSpacing}
              onChange={(e) => handleChange('columnSpacing', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="bulletLeftMargin">Bullet Left Margin (cm)</Label>
            <Input
              id="bulletLeftMargin"
              type="number"
              step="0.1"
              value={styleSettings.bulletLeftMargin}
              onChange={(e) => handleChange('bulletLeftMargin', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fontSize">Font Size</Label>
            <Input
              id="fontSize"
              value={styleSettings.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              placeholder="10pt"
            />
          </div>
          <div>
            <Label htmlFor="themeColor">Theme Color</Label>
            <Input
              id="themeColor"
              value={styleSettings.themeColor}
              onChange={(e) => handleChange('themeColor', e.target.value)}
              placeholder="#004F90"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="footerText">Footer Text</Label>
          <Input
            id="footerText"
            value={styleSettings.footerText}
            onChange={(e) => handleChange('footerText', e.target.value)}
            placeholder="Your Name"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              checked={styleSettings.sectionTitleLine}
              onCheckedChange={(checked) => handleChange('sectionTitleLine', checked)}
            />
            <Label>Show line under section titles</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={styleSettings.showPageNumber}
              onCheckedChange={(checked) => handleChange('showPageNumber', checked)}
            />
            <Label>Show page numbers</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleSettings;
