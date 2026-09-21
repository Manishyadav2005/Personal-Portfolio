import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import {
  X,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Check,
  Crop as CropIcon,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCroppedImg } from "@/utils/cropImage";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (result: { file: File; blob: Blob; dataUrl: string }) => Promise<void> | void;
}

const ASPECT_RATIOS = [
  { label: "4:5 (Portrait Card)", value: 4 / 5, desc: "Best for Gallery & Mobile" },
  { label: "3:4 (Portrait)", value: 3 / 4, desc: "Classic portrait" },
  { label: "1:1 (Square)", value: 1 / 1, desc: "Instagram style" },
  { label: "16:9 (Landscape)", value: 16 / 9, desc: "Wide display" },
  { label: "Free Form", value: undefined, desc: "No fixed ratio" },
];

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(4 / 5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    setIsProcessing(true);
    try {
      const result = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      await onCropComplete(result);
      onClose();
    } catch (err) {
      console.error("Failed to crop image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(4 / 5);
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0f1118] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-primary/20 text-primary">
              <CropIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Crop & Fix Photo
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                  Live Framing
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Drag to frame photo, zoom, or rotate so the face and details stay perfectly centered
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Viewport & Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 min-h-[380px] sm:min-h-[440px] overflow-hidden">
          {/* Main Cropper Box */}
          <div className="relative lg:col-span-2 bg-black/90 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={handleCropComplete}
              showGrid={true}
              objectFit="contain"
            />
          </div>

          {/* Right Sidebar Controls */}
          <div className="p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#12141d] overflow-y-auto space-y-5">
            {/* Aspect Ratio Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Aspect Ratio Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ASPECT_RATIOS.map((item) => {
                  const isSelected = aspect === item.value;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setAspect(item.value)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "bg-primary/20 border-primary text-white shadow-glow"
                          : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-primary" /> Zoom
                </span>
                <span className="text-slate-400">{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-slate-400" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <ZoomIn className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Rotate & Reset Controls */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200">
                Rotate & Orientation
              </label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRotateLeft}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs py-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-primary" /> -90°
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRotateRight}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs py-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 mr-1.5 text-primary" /> +90°
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white text-xs px-2"
                  title="Reset to default"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-[11px] text-slate-300 leading-relaxed">
              💡 <span className="font-semibold text-white">Pro-tip:</span> For personal moments, choose{" "}
              <span className="text-primary font-bold">4:5 (Portrait)</span> and drag the face near the upper third so it looks sensational on all devices!
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-300 hover:text-white text-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleApplyCrop}
            disabled={isProcessing}
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-glow flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Applying Crop...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Apply & Save Crop
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
