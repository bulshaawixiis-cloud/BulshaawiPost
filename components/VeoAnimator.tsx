
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GenerationStatus, VideoResult } from '../types';

const REASSURING_MESSAGES = [
  "Capturing the essence of your image...",
  "Analyzing textures and layers for fluid motion...",
  "Our AI is weaving the fabric of time and space...",
  "Generating realistic movement patterns...",
  "Polishing the frames for a professional finish...",
  "Almost there! Humanizing the digital motion...",
  "Adding the final touches of life to your photo..."
];

const VeoAnimator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [status, setStatus] = useState<GenerationStatus>({ isGenerating: false, message: "", progress: 0 });
  const [result, setResult] = useState<VideoResult | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (status.isGenerating) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % REASSURING_MESSAGES.length;
        setStatus(prev => ({ ...prev, message: REASSURING_MESSAGES[index] }));
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [status.isGenerating]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenKeyDialog = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setNeedsApiKey(false);
    }
  };

  const generateVideo = async () => {
    if (!image) return;

    const hasKey = await window.aistudio?.hasSelectedApiKey?.();
    if (!hasKey) {
      setNeedsApiKey(true);
      return;
    }

    setStatus({ isGenerating: true, message: REASSURING_MESSAGES[0], progress: 10 });
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || "Smooth cinematic animation adding life to the character in the photo",
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        setStatus(prev => ({ ...prev, progress: Math.min(prev.progress + 5, 95) }));
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        setResult({ url: videoUrl, aspectRatio });
      }
    } catch (error: any) {
      console.error("Generation failed:", error);
      if (error?.message?.includes("Requested entity was not found")) {
        setNeedsApiKey(true);
      }
      alert("Something went wrong during generation. Please try again.");
    } finally {
      setStatus({ isGenerating: false, message: "", progress: 0 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-blue-50 my-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-lg">
          <i className="fa-solid fa-clapperboard-play text-2xl text-blue-700"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Animate Your Heroines</h2>
          <p className="text-blue-600">Transform static photos of social workers into powerful cinematic moments using Veo.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-64 overflow-hidden
              ${image ? 'border-blue-400 bg-blue-50/20' : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'}
            `}
          >
            {image ? (
              <>
                <img src={image} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Change Photo</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <i className="fa-solid fa-cloud-arrow-up text-4xl text-blue-300 mb-2"></i>
                <p className="text-blue-500 font-medium">Click to upload photo</p>
                <p className="text-blue-300 text-xs mt-1">PNG, JPG or WebP</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">Animation Prompt (Optional)</label>
              <textarea 
                placeholder="e.g. A social worker smiling warmly as she helps a family in a sunlit room..."
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-24"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-blue-900 mb-1">Aspect Ratio</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                >
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                </select>
              </div>
            </div>

            {needsApiKey ? (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 space-y-3">
                <p className="text-sm text-amber-800">
                  <i className="fa-solid fa-key mr-2"></i>
                  Veo requires a paid Google AI Studio API key. Please select one to continue.
                </p>
                <button 
                  onClick={handleOpenKeyDialog}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Select API Key
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-xs text-amber-600 underline text-center"
                >
                  Billing Documentation
                </a>
              </div>
            ) : (
              <button 
                onClick={generateVideo}
                disabled={!image || status.isGenerating}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2
                  ${!image || status.isGenerating 
                    ? 'bg-blue-200 text-blue-400 cursor-not-allowed' 
                    : 'bg-blue-700 hover:bg-blue-800 text-white hover:shadow-blue-200'
                  }
                `}
              >
                {status.isGenerating ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                    <span>Generate Video</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 relative min-h-[400px]">
          {status.isGenerating ? (
            <div className="text-center p-8 space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '1.5s' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-700">{status.progress}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-blue-900 font-semibold animate-pulse">{status.message}</p>
                <p className="text-slate-400 text-xs italic">Video generation usually takes 1-3 minutes</p>
              </div>
            </div>
          ) : result ? (
            <div className="w-full h-full p-2 flex flex-col">
              <div className={`relative w-full rounded-lg overflow-hidden bg-black flex items-center justify-center ${result.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <video 
                  src={result.url} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <a 
                  href={result.url} 
                  download="social-worker-animation.mp4"
                  className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-800"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>Download Video</span>
                </a>
                <button 
                  onClick={() => setResult(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-400">
              <i className="fa-solid fa-video-slash text-5xl mb-4 opacity-20"></i>
              <p>Your generated animation will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeoAnimator;
