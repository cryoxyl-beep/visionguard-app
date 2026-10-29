import React from 'react';
import { GameSettings } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { X, Volume2, Sliders, Eye, RefreshCw, Download, Upload } from 'lucide-react';

interface Props {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onClose: () => void;
  onResetProgress: () => void;
  onExportSave: () => void;
  onImportSave: (json: string) => void;
}

export const SettingsModal: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onClose,
  onResetProgress,
  onExportSave,
  onImportSave
}) => {
  const handleVolumeChange = (field: 'masterVolume' | 'musicVolume' | 'sfxVolume', value: number) => {
    const updated = { ...settings, [field]: value };
    onUpdateSettings(updated);
    audioEngine.setVolumes(updated.masterVolume, updated.musicVolume, updated.sfxVolume);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onImportSave(text);
          audioEngine.playEvidenceDiscovered();
          onClose();
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-noir-900 border border-brass/50 rounded-2xl shadow-noir-card p-6 flex flex-col space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-brass/30">
          <h2 className="text-base font-bold text-ivory tracking-wide uppercase font-cinzel flex items-center gap-2">
            <Sliders className="w-5 h-5 text-brass" />
            <span>Detective Settings & Archive</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-noir-400 hover:text-ivory hover:bg-noir-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Sliders */}
        <div className="space-y-4 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brass font-cinzel">
            Audio Levels
          </h3>

          <div>
            <div className="flex justify-between text-noir-300 mb-1">
              <span>Master Volume</span>
              <span className="font-mono-code">{settings.masterVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.masterVolume}
              onChange={(e) => handleVolumeChange('masterVolume', Number(e.target.value))}
              className="w-full accent-brass bg-noir-950 h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-noir-300 mb-1">
              <span>Music & Noir Ambience</span>
              <span className="font-mono-code">{settings.musicVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.musicVolume}
              onChange={(e) => handleVolumeChange('musicVolume', Number(e.target.value))}
              className="w-full accent-brass bg-noir-950 h-2 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-noir-300 mb-1">
              <span>Sound Effects</span>
              <span className="font-mono-code">{settings.sfxVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.sfxVolume}
              onChange={(e) => handleVolumeChange('sfxVolume', Number(e.target.value))}
              className="w-full accent-brass bg-noir-950 h-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Accessibility Toggles */}
        <div className="space-y-3 pt-3 border-t border-noir-800 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brass font-cinzel">
            Visual & Accessibility
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-noir-200">High-Contrast Hotspots</span>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => onUpdateSettings({ ...settings, highContrast: e.target.checked })}
              className="w-4 h-4 accent-brass rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-noir-200">Screen Shake Effects</span>
            <input
              type="checkbox"
              checked={settings.screenShake}
              onChange={(e) => onUpdateSettings({ ...settings, screenShake: e.target.checked })}
              className="w-4 h-4 accent-brass rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Save State Management */}
        <div className="space-y-3 pt-3 border-t border-noir-800 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brass font-cinzel">
            Save File & Campaign
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={onExportSave}
              className="flex-1 py-2 px-3 rounded-lg bg-noir-800 hover:bg-noir-700 text-ivory border border-noir-700 flex items-center justify-center gap-2 transition"
            >
              <Download className="w-3.5 h-3.5 text-brass" />
              <span>Export Save JSON</span>
            </button>

            <label className="flex-1 py-2 px-3 rounded-lg bg-noir-800 hover:bg-noir-700 text-ivory border border-noir-700 flex items-center justify-center gap-2 cursor-pointer transition text-center">
              <Upload className="w-3.5 h-3.5 text-brass" />
              <span>Import Save</span>
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all progress and start completely fresh?')) {
                onResetProgress();
                onClose();
              }
            }}
            className="w-full py-2 rounded-lg bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs font-semibold uppercase tracking-wider transition"
          >
            Reset Campaign Progress
          </button>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-noir-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-brass hover:bg-brass-light text-noir-950 font-bold text-xs uppercase tracking-wider transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
